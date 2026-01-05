import {debounce, saveExtensionData} from "./data-manager"
import {ExtensionData, OptionsPageLayout, OptionsPageSort, Theme, TrackedWindow, Tab} from "./types"




let extensionData: ExtensionData | null = null
const debounceSaveExtensionData = debounce(saveExtensionData, 10000)

let extensionDataLoadingPromise: Promise<void> | null = null

async function waitForExtensionDataToBeSet(): Promise<void> {
   
   if (extensionData) return
   if (extensionDataLoadingPromise) return extensionDataLoadingPromise
   
   extensionDataLoadingPromise = new Promise((resolve) => {
      chrome.storage.local.get("extensionData", (result) => {
         extensionData = result.extensionData
         extensionDataLoadingPromise = null
         resolve()
      })
   })
   return extensionDataLoadingPromise
}





chrome.runtime.onInstalled.addListener((details) => {
   if (details.reason === "install") {
      
      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         openedTrackedWindowIds: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.dateAsc,
         optionsPageLayout: OptionsPageLayout.card
      }
      
      extensionData = initialExtensionData
      
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)})
      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({color: "green"})
   }
   else if (details.reason === "update") {
      
      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({color: "green"})
      
      chrome.storage.local.get("extensionData", (result) => {
         extensionData = result.extensionData
      })
      
      // const initialExtensionData: ExtensionData = {
      //    trackedWindows: {},
      //    openedTrackedWindowIds: [],
      //    theme: Theme.light,
      //    optionsPageSort: OptionsPageSort.dateAsc,
      //    optionsPageLayout: OptionsPageLayout.card
      // }
      
      // extensionData = initialExtensionData
      
      // chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)})
      // chrome.action.setBadgeTextColor({color: "white"})
      // chrome.action.setBadgeBackgroundColor({color: "green"})
   }
})






chrome.runtime.onMessage.addListener((message, _, sendResponse)=>{
   
   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         processMessage()
      })
      return true
   }
   
   return processMessage()
   
   
   
   
   function processMessage() {
      
      
      if (!extensionData) return false
      
      
      if (message.signal === "getExtensionData") {
         sendResponse(extensionData)
         return false
      }
      
      
      else if (message.signal === "trackWindow") {
         
         handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
         return true
         
         
         async function handleWindowTrack(currentWindowId: number, windowName: string, sendResponse: (response: any) => void) {
            
            if (!extensionData) return null
            
            const allTabs = await chrome.tabs.query({windowId: currentWindowId})
            const tabsGroupInfo = await chrome.tabGroups.query({windowId: currentWindowId})

            console.log("grouped tabs ", tabsGroupInfo)


            
            
            const usefulTabsData: Tab[] = allTabs.map((tab: any)=>{
               return {
                  "id": tab.id!,
                  "title": tab.title || "Loading...",
                  "url": tab.url || tab.pendingUrl,
                  "favIconUrl": tab.favIconUrl ?? null,
                  "groupId": tab.groupId,
                  "pinned": tab.pinned,
                  "muted": tab.mutedInfo?.muted ?? false
               }
            })
            
            
            
            const trackedWindow: TrackedWindow = {
               "windowId": currentWindowId,
               "windowName": windowName,
               "color": "white",
               "isOpen": true,
               "tabs": usefulTabsData,
               "groupedTabsInfo": tabsGroupInfo,
               "dateAdded": Date.now(),
               "draggableOrder1": -1,
               "draggableOrder2": -1,
               "draggableOrder3": -1,
               "activeTabId": allTabs.find((tab: any) => tab.active === true)?.id ?? -1
            }
            
            
            extensionData.trackedWindows[windowName] = trackedWindow
            extensionData.openedTrackedWindowIds.push(currentWindowId)
            
            console.log("======== Window is Tracked =========")
            console.log(extensionData.trackedWindows[windowName])
            
            
            saveExtensionData(extensionData)
            sendResponse(true)
            handleShowingOfExtensionBadge(currentWindowId)
            updateOptionsPage()
         }
      }
      
      
      else if (message.signal === "untrackWindowFromPopup" || message.signal === "untrackWindowFromOptions") {
         
         handleWindowUntrack(message.windowName, sendResponse)
         return false
         
         
         function handleWindowUntrack(windowName: string, sendResponse: (response: any) => void) {
            if (!extensionData) return null
            
            const removedTrackedWindowId = extensionData.trackedWindows[windowName].windowId
            
            delete extensionData.trackedWindows[windowName]
            extensionData.openedTrackedWindowIds = extensionData.openedTrackedWindowIds.filter(ele=> ele !== removedTrackedWindowId)
            
            sendResponse(false)
            saveExtensionData(extensionData)
            handleShowingOfExtensionBadge(removedTrackedWindowId)
            updateOptionsPage()
         }
      }
      
      
      else if (message.signal === "openSavedWindow") {
         handleOpenSavedWindow(message.trackedWindowToOpen)
         return false
         
         
         async function handleOpenSavedWindow(trackedWindowToOpen: TrackedWindow) {
            
            if (!extensionData) return
            
            
            const createdWindow = await chrome.windows.create({url: trackedWindowToOpen.tabs.map((ele:Tab) => ele.url), focused: true})
            const createdWindowId: number = createdWindow.id!
            const createdWindowTabs: any[] = createdWindow.tabs!
            
            
            extensionData.trackedWindows[trackedWindowToOpen.windowName].windowId = createdWindowId
            extensionData.openedTrackedWindowIds.push(createdWindowId)
            extensionData.trackedWindows[trackedWindowToOpen.windowName].isOpen = true
            
            
            
            let groupedTabsId: any[][] = []
            let groupIndex = -1
            let lastGroupId = -1

            let orderedGroupedInfo = []
            
            
            // refused to use forEach as a regualr for loop is slightly quicker
            for (let i = 0; i < trackedWindowToOpen.tabs.length; i++) {
               
               const oldTab = trackedWindowToOpen.tabs[i]
               const newTabId = createdWindowTabs[i].id
               
               
               if (oldTab.pinned) {
                  await chrome.tabs.update(newTabId, {pinned: true})
               }
               if (oldTab.muted) {
                  await chrome.tabs.update(newTabId, {muted: true})
               }
               if (oldTab.id === trackedWindowToOpen.activeTabId) {
                  const tabId = newTabId
                  extensionData.trackedWindows[trackedWindowToOpen.windowName].activeTabId = tabId
                  await chrome.tabs.update(tabId, {active: true})
               }
               
               
               
               
               if (oldTab.groupId !== -1) {
                  if (oldTab.groupId !== lastGroupId) {
                     groupIndex++
                     groupedTabsId[groupIndex] = []
                     orderedGroupedInfo.push(trackedWindowToOpen.groupedTabsInfo.find(ele => ele.id === oldTab.groupId))
                  }
                  
                  groupedTabsId[groupIndex].push(newTabId)
                  lastGroupId = oldTab.groupId
               }
            }
            
            

            for (let i = 0; i < groupedTabsId.length; i++) {
               
               const newGroupId = await chrome.tabs.group({tabIds: groupedTabsId[i]})
               const groupedTabProperties = orderedGroupedInfo[i]
               
               if (groupedTabProperties) {
                  await chrome.tabGroups.update(newGroupId, {
                     title: groupedTabProperties.title,
                     color: groupedTabProperties.color,
                     collapsed: groupedTabProperties.collapsed
                  })
               }
            }
            
            
            const newGroupedTabsInfo = await chrome.tabGroups.query({windowId: createdWindowId})
            const updatedTabs: chrome.tabs.Tab[] = await chrome.tabs.query({windowId: createdWindowId})



            
            const usefulTabsData: Tab[] = updatedTabs.map((tab, index)=>{
               return {
                  "id": tab.id!,
                  "title": trackedWindowToOpen.tabs[index].title || "Loading...",
                  "url": (tab.url || tab.pendingUrl) || trackedWindowToOpen.tabs[index].url,
                  "favIconUrl": tab.favIconUrl ?? trackedWindowToOpen.tabs[index].favIconUrl ?? null,
                  "groupId": tab.groupId,
                  "pinned": trackedWindowToOpen.tabs[index].pinned,
                  "muted": trackedWindowToOpen.tabs[index].muted ?? false
               }
            })
            
            extensionData.trackedWindows[trackedWindowToOpen.windowName].tabs = usefulTabsData
            extensionData.trackedWindows[trackedWindowToOpen.windowName].groupedTabsInfo = newGroupedTabsInfo
            
            console.log("======== Saved Window Opened =========")
            console.log(trackedWindowToOpen)
            
            saveExtensionData(extensionData)
            handleShowingOfExtensionBadge(createdWindowId)
            updateOptionsPage()
         }
      }
      
      
      else if (message.signal === "changeTheme") {
         extensionData.theme = extensionData.theme === Theme.light ? Theme.dark : Theme.light
         saveExtensionData(extensionData)
         sendResponse(extensionData.theme)
         return false
      }
      
      
      else if (message.signal === "changeOptionsPageLayout") {
         extensionData.optionsPageLayout = extensionData.optionsPageLayout === OptionsPageLayout.card ? OptionsPageLayout.table : OptionsPageLayout.card
         saveExtensionData(extensionData)
         sendResponse(extensionData.optionsPageLayout)
         return false
      }
      
      
      else if (message.signal === "changeOptionsPageSort") {
         extensionData.optionsPageSort = message.newSort
         saveExtensionData(extensionData)
         sendResponse(extensionData.optionsPageSort)
         return false
      }
      
      
      else if (message.signal === "handleDraggableOptionsPageSort") {
         
         const customOrder: TrackedWindow[] = message.arrayOfTrackedWindowValues
         
         const [moved] = customOrder.splice(message.fromIndex, 1)
         customOrder.splice(message.toIndex, 0, moved)
         
         
         for (let i = 0; i < customOrder.length; i++) {
            switch (extensionData.optionsPageSort) {
               
               case OptionsPageSort.draggable1:
               extensionData.trackedWindows[customOrder[i].windowName].draggableOrder1 = i
               break
               case OptionsPageSort.draggable2:
               extensionData.trackedWindows[customOrder[i].windowName].draggableOrder2 = i
               break
               case OptionsPageSort.draggable3:
               extensionData.trackedWindows[customOrder[i].windowName].draggableOrder3 = i
               break
               default:
               break
            }
         }
         
         saveExtensionData(extensionData)
         updateOptionsPage()
         return false
      }
   }
})



async function updateOptionsPage() {
   await waitForExtensionDataToBeSet()
   
   try {
      chrome.runtime.sendMessage({ signal: "updateOptions", extensionData: extensionData })
   } catch (error) {
      // options page not open      
   }
}



function handleShowingOfExtensionBadge(windowId: number) {
   if (!extensionData) return null
   
   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
      
      if (trackedWindow.windowId === windowId && trackedWindow.isOpen) {
         chrome.action.setBadgeText({ text: " +" });
         return null
      }
   }
   chrome.action.setBadgeText({ text: "" })
}


chrome.windows.onFocusChanged.addListener(async (windowId: number) => {
   
   if (windowId === chrome.windows.WINDOW_ID_NONE) return null
   
   await waitForExtensionDataToBeSet()
   handleShowingOfExtensionBadge(windowId)   
})





chrome.windows.onRemoved.addListener(async (windowId: number) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(windowId)) return
   
   for (let trackedWindow of Object.values(extensionData?.trackedWindows)) {
      
      if (trackedWindow.isOpen && trackedWindow.windowId === windowId) {
         
         trackedWindow.isOpen = false
         extensionData.openedTrackedWindowIds = extensionData.openedTrackedWindowIds.filter(ele => ele !== windowId)
         
         // console.log("======== Tracked Window Closed  =========")
         // console.log(trackedWindow)
         
         saveExtensionData(extensionData)
         updateOptionsPage()
         return null
      }
   }
})





function getTrackedWindowByWindowId(windowId: number): TrackedWindow | null {
   if (!extensionData) return null
   
   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
      if (trackedWindow.isOpen && trackedWindow.windowId === windowId) {
         return trackedWindow
      }
   }
   
   return null
}




chrome.tabs.onCreated.addListener(async (tab) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(tab.windowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(tab.windowId)
   if (!trackedWindow) return
   console.log("tab created", tab)
   
   const newTab: Tab = {
      "id": tab.id!,
      "title": tab.title || "Loading...",
      "url": (tab.pendingUrl || tab.url)!,
      "favIconUrl": tab.favIconUrl ?? null,
      "groupId": tab.groupId,
      "pinned": tab.pinned,
      "muted": tab.mutedInfo?.muted ?? false
   }
   

   trackedWindow.tabs.splice(tab.index, 0, newTab)
   
   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})




chrome.tabs.onUpdated.addListener(async (_, updateInfo, tab) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (updateInfo.status === "complete" || "pinned" in updateInfo || "groupId" in updateInfo || "mutedInfo" in updateInfo) {
      
      if (!extensionData) return
      if (!extensionData.openedTrackedWindowIds.includes(tab.windowId)) return
      
      const trackedWindow = getTrackedWindowByWindowId(tab.windowId)
      if (!trackedWindow) return
      
      
      const updateTab = trackedWindow.tabs.find(t => t.id === tab.id)
      
      if (updateTab) {
         
         console.log(updateInfo)
         
         
         if (updateInfo.status === "complete") {
            updateTab.url = tab.url!
            updateTab.title = tab.title!
            updateTab.favIconUrl = tab.favIconUrl ?? null
         }
         if ("pinned" in updateInfo) {
            updateTab.pinned = tab.pinned
         }
         if ("mutedInfo" in updateInfo) {
            updateTab.muted = updateInfo.mutedInfo!.muted!
         }
         
         
         if ("groupId" in updateInfo) {
            
            if (updateInfo.groupId === -1) {
               
               try {
                  await chrome.windows.get(tab.windowId)
                  updateTab.groupId = updateInfo.groupId
                  console.log("tab removed from groups")
                  
               } catch (error) {
                  // error means a tracked window with groups is closing
                  // so do nothing
                  console.log("window is closing")
                  return null
               }
            }
            else {
               updateTab.groupId = updateInfo.groupId!
               console.log("group made or tab added to group")
            }
            
         }
         
         debounceSaveExtensionData(extensionData)
         updateOptionsPage()
      }
   }
})



chrome.tabs.onMoved.addListener(async (tabId, moveInfo) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(moveInfo.windowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(moveInfo.windowId)
   if (!trackedWindow) return
   const tabIndex = trackedWindow.tabs.findIndex(t => t.id === tabId)
   
   if (tabIndex !== -1) {
      const [tabToMove] = trackedWindow.tabs.splice(tabIndex, 1)
      trackedWindow.tabs.splice(moveInfo.toIndex, 0, tabToMove)
      
      debounceSaveExtensionData(extensionData)
      updateOptionsPage()
   }
})





chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
   
   if (removeInfo.isWindowClosing) return
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(removeInfo.windowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(removeInfo.windowId)
   if (!trackedWindow) return
   
   trackedWindow.tabs = trackedWindow.tabs.filter(t => t.id !== tabId)
   
   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})





chrome.tabs.onAttached.addListener(async (tabId, attachInfo) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(attachInfo.newWindowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(attachInfo.newWindowId)
   if (!trackedWindow) return
   
   
   const attachedTab = await chrome.tabs.get(tabId)
   const tabToAttach: Tab = {
      "id": attachedTab.id!,
      "title": attachedTab.title || "Loading ...",
      "url": (attachedTab.url || attachedTab.pendingUrl)!,
      "favIconUrl": attachedTab.favIconUrl ?? null,
      "groupId": attachedTab.groupId,
      "pinned": attachedTab.pinned,
      "muted": attachedTab.mutedInfo?.muted ?? false
   }
   
   
   trackedWindow.tabs.splice(attachedTab.index, 0, tabToAttach)
   
   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})




chrome.tabs.onDetached.addListener(async (tabId, detachInfo) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(detachInfo.oldWindowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(detachInfo.oldWindowId)
   if (!trackedWindow) return
   
   trackedWindow.tabs = trackedWindow.tabs.filter(t => t.id !== tabId)
   
   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})


chrome.tabs.onActivated.addListener(async (activeInfo) => {
   
   await waitForExtensionDataToBeSet()
   
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(activeInfo.windowId)) return
   
   const trackedWindow: TrackedWindow | null = getTrackedWindowByWindowId(activeInfo.windowId)
   if (!trackedWindow) return
   
   trackedWindow.activeTabId = activeInfo.tabId
   debounceSaveExtensionData(extensionData)
})



chrome.tabGroups.onUpdated.addListener(async (group) => {
   
   await waitForExtensionDataToBeSet()
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(group.windowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(group.windowId)
   if (!trackedWindow) return

   const replaceIndex = trackedWindow.groupedTabsInfo.findIndex((ele) => ele.id === group.id)

   if (replaceIndex === -1) {
      trackedWindow.groupedTabsInfo.push(group)
   }
   else {
      trackedWindow.groupedTabsInfo[replaceIndex] = group
   }
   
   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})



chrome.tabGroups.onRemoved.addListener(async (group) => {
   
   await waitForExtensionDataToBeSet()
   
   if (!extensionData) return
   if (!extensionData.openedTrackedWindowIds.includes(group.windowId)) return
   
   const trackedWindow = getTrackedWindowByWindowId(group.windowId)
   if (!trackedWindow) return

   try {
      await chrome.windows.get(group.windowId)
   } catch (error) {
      // error means the window is closing
      return
   }

   trackedWindow.groupedTabsInfo = trackedWindow.groupedTabsInfo.filter(groupedTab => groupedTab.id !== group.id)

   debounceSaveExtensionData(extensionData)
   updateOptionsPage()
})


