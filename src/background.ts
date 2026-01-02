import {ExtensionData, OptionsPageLayout, OptionsPageSort, Theme, TrackedWindow, Tab} from "./types"
// @ts-ignore
import { debounce, saveExtensionData } from "./data-manager"

const savedUrls = [
  // Search & Browsers
  "https://google.com",
  "https://bing.com",
  "https://duckduckgo.com",
  "https://yahoo.com",
  "https://baidu.com",

  // Social & Media
  "https://twitter.com",
  "https://facebook.com",
  "https://instagram.com",
  "https://reddit.com",
  "https://tiktok.com",

  // News & Info
  "https://cnn.com",
  "https://bbc.com",
  "https://nytimes.com",
  "https://theguardian.com",
  "https://reuters.com",

  // Tech & Dev
  "https://github.com",
  "https://gitlab.com",
  "https://stackoverflow.com",
  "https://developer.chrome.com",
  "https://codepen.io",

  // Learning
  "https://w3schools.com",
  "https://freecodecamp.org",
  "https://coursera.org",
  "https://udemy.com",
  "https://khanacademy.org",

  // AI & Research
  "https://openai.com",
  "https://huggingface.co",
  "https://deepmind.com",
  "https://arxiv.org",
  "https://paperswithcode.com",

  // Entertainment
  "https://youtube.com",
  "https://netflix.com",
  "https://spotify.com",
  "https://twitch.tv",
  "https://disneyplus.com",

  // Shopping & Tools
  "https://amazon.com",
  "https://ebay.com",
  "https://walmart.com",
  "https://bestbuy.com",
  "https://etsy.com",

  // Productivity
  "https://notion.so",
  "https://slack.com",
  "https://discord.com",
  "https://zoom.us",
  "https://trello.com",

  // Tech News & Blogs
  "https://techcrunch.com",
  "https://wired.com",
  "https://arstechnica.com",
  "https://thenextweb.com",
  "https://news.ycombinator.com"
]



let extensionData: ExtensionData | null = null
const debounceSaveData = debounce(saveExtensionData, 25000)


function checkIfDataExistAndRunFunction(forward: any, ...args: any) {
   if (extensionData) {
      forward(...args)
   }
   else {
      chrome.storage.local.get("extensionData", (result) => {
         console.log("========== Data was not found thus now set ===========")
         extensionData = result.extensionData
         forward(...args)
      })
   }
}





chrome.runtime.onInstalled.addListener((details) => {
   
   if (details.reason === "install") {

      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         trackedWindowNames: [],
         trackedWindowIds: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.nameAsc,
         optionsPageLayout: OptionsPageLayout.card
      }
      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "#3CB371" })
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)})
   }
   else if (details.reason === "update") {

      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         trackedWindowNames: [],
         trackedWindowIds: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.nameAsc,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({color: "green"})
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)})


      // chrome.storage.local.get("extensionData", (result) => {
      //    extensionData = result.extensionData
      //    chrome.action.setBadgeTextColor({color: "white"})
      //    chrome.action.setBadgeBackgroundColor({ color: "green" })
      //    chrome.storage.local.set({ extensionData: structuredClone(extensionData)})
      // })
   }
})




// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{

   if (!extensionData) {

      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         processMessages()
      })

      return true
   }

   return processMessages()


   function processMessages() {
      
      if (!extensionData) return null


      if (message.signal === "getExtensionData") {
         sendResponse(extensionData)
         return false
      }


      else if (message.signal === "trackWindowFromPopup") {
         handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
         return true
      }


      else if (message.signal === "untrackWindowFromPopup" || message.signal === "untrackWindowFromOptions") {
         handleWindowUntrack(message.windowName, sendResponse)
         return false
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


      else if (message.signal === "openSavedWindow") {
         handleOpenSavedWindow(message.trackedWindowToOpen);
         return false
      }


      else if (message.signal === "customOptionsPageSort") {
         
         const customOrderArray: TrackedWindow[] = message.customOrderArrayOfTrackedWindows
         
         const fromData = customOrderArray[message.fromIndex]
         const toData = customOrderArray[message.toIndex]
         customOrderArray[message.fromIndex] = toData
         customOrderArray[message.toIndex] = fromData

         for (let i = 0; i < customOrderArray.length; i++) {
            extensionData.trackedWindows[customOrderArray[i].windowName].order = i
         }

         saveExtensionData(extensionData)
         updateOptionsPage()
         return false
      }
   }
})



function handleWindowTrack(currentWindowId: number, windowName: string, sendResponse: (response: any) => void) {
   chrome.tabs.query({windowId: currentWindowId}, (allTabs: any)=>{
      chrome.tabGroups.query({windowId: currentWindowId}, (tabsGroupInfo) => {

         if (!extensionData) return null


         const usefulTabsData: Tab[] = allTabs.map((ele: any)=>{
            return {
               "id": ele.id,
               "active": ele.active,
               "pinned": ele.pinned,
               "groupId": ele.groupId,
               "url": ele.url,
               "favIconUrl": ele.favIconUrl,
               "title": ele.title,
               // "active": false
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
            "order": -1
         }
         

         extensionData.trackedWindows[windowName] = trackedWindow
         extensionData.trackedWindowNames.push(windowName)
         extensionData.trackedWindowIds.push(currentWindowId)

         saveExtensionData(extensionData)
         sendResponse(true)
         handleShowingOfExtensionBadge(currentWindowId)
         updateOptionsPage()
      })
   })
}



function handleWindowUntrack(windowName: string, sendResponse: (response: any) => void) {
   if (!extensionData) return null

   const removedTrackedWindowId = extensionData.trackedWindows[windowName].windowId

   delete extensionData.trackedWindows[windowName]
   extensionData.trackedWindowNames = extensionData.trackedWindowNames.filter(ele=>ele !== windowName)
   extensionData.trackedWindowIds = extensionData.trackedWindowIds.filter(ele=> ele !== removedTrackedWindowId)
   
   saveExtensionData(extensionData)
   sendResponse(false)
   handleShowingOfExtensionBadge(removedTrackedWindowId)
   updateOptionsPage()
}








function getTrackedWindowByWindowId(windowId: number): TrackedWindow | null {
   if (!extensionData) return null
   
   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
      if (trackedWindow.isOpen && trackedWindow.windowId === windowId) {
         return trackedWindow
      }
   }

   return null
}


chrome.tabs.onCreated.addListener((tab) => {

   checkIfDataExistAndRunFunction(onCreate, tab)


   function onCreate(tab: any) {

      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(tab.windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(tab.windowId)
      if (!trackedWindow) return

      const newTab: Tab = {
         "id": tab.id,
         "active": tab.active,
         "pinned": tab.pinned,
         "groupId": tab.groupId,
         "url": tab.url || tab.pendingUrl || "",
         "favIconUrl": tab.favIconUrl || "",
         "title": tab.title || ""
      }

      trackedWindow.tabs.splice(tab.index, 0, newTab)

      debounceSaveData(extensionData)
      updateOptionsPage()
   }
})


// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, updateInfo, tab) => {

   checkIfDataExistAndRunFunction(onUpdate, tab, updateInfo)


   function onUpdate(tab: any, updateInfo: any) {

      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(tab.windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(tab.windowId)
      if (!trackedWindow) return

      const updateTab = trackedWindow.tabs.find(t => t.id === tab.id)

      if (updateTab) {

         if (updateInfo.status === "complete") {
            updateTab.url = tab.url
            updateTab.title = tab.title
            updateTab.favIconUrl = tab.favIconUrl
            updateTab.pinned = tab.pinned
            
            debounceSaveData(extensionData)
            updateOptionsPage()
         }
      }
   }
})


chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {

   if (removeInfo.isWindowClosing) return
   checkIfDataExistAndRunFunction(onRemove, removeInfo.windowId, tabId)


   function onRemove(windowId: number, tabId: number) {
      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(windowId)
      if (!trackedWindow) return

      trackedWindow.tabs = trackedWindow.tabs.filter(t => t.id !== tabId)

      debounceSaveData(extensionData)
      updateOptionsPage()
   }
})



chrome.tabs.onMoved.addListener((tabId, moveInfo) => {

   checkIfDataExistAndRunFunction(onMove, moveInfo.windowId, tabId)


   function onMove(windowId: number, tabId: number) {

      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(windowId)
      if (!trackedWindow) return
      const tabIndex = trackedWindow.tabs.findIndex(t => t.id === tabId)

      if (tabIndex !== -1) {
         const [tabToMove] = trackedWindow.tabs.splice(tabIndex, 1)
         trackedWindow.tabs.splice(moveInfo.toIndex, 0, tabToMove)

         debounceSaveData(extensionData)
         updateOptionsPage()
      }
   }
})




chrome.tabs.onAttached.addListener((tabId, attachInfo) => {

   checkIfDataExistAndRunFunction(onAttach, attachInfo.newWindowId, tabId)


   function onAttach(windowId: number, tabId: number) {

      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(windowId)
      if (!trackedWindow) return


      chrome.tabs.get(tabId, (attachedTab: any) => {

         const tabToAttach: Tab = {
            "id": attachedTab.id,
            "active": attachedTab.active,
            "pinned": attachedTab.pinned,
            "groupId": attachedTab.groupId,
            "url": attachedTab.url || "",
            "favIconUrl": attachedTab.favIconUrl || "",
            "title": attachedTab.title || ""
         }

         trackedWindow.tabs.splice(attachedTab.index, 0, tabToAttach)

         debounceSaveData(extensionData)
         updateOptionsPage()

      })
   }
})





chrome.tabs.onDetached.addListener((tabId, detachInfo) => {

   checkIfDataExistAndRunFunction(onDetached, detachInfo.oldWindowId, tabId)

   function onDetached(windowId: number, tabId: number) {

      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(windowId)) return

      const trackedWindow = getTrackedWindowByWindowId(windowId)
      if (!trackedWindow) return

      trackedWindow.tabs = trackedWindow.tabs.filter(t => t.id !== tabId)

      debounceSaveData(extensionData)
      updateOptionsPage()
   }
})



// chrome.tabs.onActivated.addListener((activeInfo) => {
//   // Fired when the active tab in a window changes
//   console.log(4)

// });




chrome.windows.onRemoved.addListener((windowId: number) => {

   checkIfDataExistAndRunFunction(onWindowRemoved, windowId)

   function onWindowRemoved(windowId: number) {
      
      if (!extensionData) return
      if (!extensionData.trackedWindowIds.includes(windowId)) return
   
      for (let trackedWindow of Object.values(extensionData?.trackedWindows)) {
   
         if (trackedWindow.isOpen && trackedWindow.windowId === windowId) {
   
            trackedWindow.isOpen = false
            extensionData.trackedWindowIds.filter(ele => ele !== windowId)
   
            saveExtensionData(extensionData)
            updateOptionsPage()
            return null
         }
      }
   }
})



chrome.windows.onFocusChanged.addListener((windowId: number) => {
   if (windowId === chrome.windows.WINDOW_ID_NONE) return null
   checkIfDataExistAndRunFunction(handleShowingOfExtensionBadge, windowId)
})


function handleShowingOfExtensionBadge(windowId: number) {
   if (!extensionData) return null

   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {

      if (trackedWindow.windowId === windowId && trackedWindow.isOpen) {
         chrome.action.setBadgeText({ text: " +" });
         return null
      }
   }
   chrome.action.setBadgeText({ text: "" });
}



function updateOptionsPage() {
   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         chrome.runtime.sendMessage({signal: "updateOptions", extensionData: extensionData})
      })
      return null
   }

   chrome.runtime.sendMessage({ signal: "updateOptions", extensionData: extensionData })
}




function handleOpenSavedWindow(trackedWindowToOpen: TrackedWindow) {

   chrome.windows.create({url: trackedWindowToOpen.tabs.map(ele => ele.url)}, async (createdWindow: any)=>{
      
      if (!extensionData) return

      extensionData.trackedWindows[trackedWindowToOpen.windowName].windowId = createdWindow.id
      extensionData.trackedWindowIds.push(createdWindow.id)
      extensionData.trackedWindows[trackedWindowToOpen.windowName].isOpen = true

      const allTabs = await chrome.tabs.query({windowId: createdWindow.id})

      setTimeout(async () => {
         
         let groupedTabsId: [][] = []
         let groupIndex = -1
         let lastGroupId = -1
         
         trackedWindowToOpen.tabs.forEach((ele, index) => {

            if (ele.groupId === -1) return null

            if (ele.groupId !== lastGroupId) {
               groupIndex++
               groupedTabsId[groupIndex] = []
            }

            groupedTabsId[groupIndex].push(allTabs[index].id)
            lastGroupId = ele.groupId
         })


         for (let i = 0; i < groupedTabsId.length; i++) {
            const newGroupId = await chrome.tabs.group({tabIds: groupedTabsId[i]})

            await chrome.tabGroups.update(newGroupId, {
               title: trackedWindowToOpen.groupedTabsInfo[i].title,
               color: trackedWindowToOpen.groupedTabsInfo[i].color,
               collapsed: trackedWindowToOpen.groupedTabsInfo[i].collapsed
            })
         }
         
         const tabGroupedInfo = await chrome.tabGroups.query({windowId: createdWindow.id})
         const usefulTabsData = allTabs.map((ele, index)=>{
            return {
               "id": ele.id,
               "active": ele.active,
               "pinned": trackedWindowToOpen.tabs[index].pinned,
               "groupId": ele.groupId,
               "url": ele.url === "" ? ele.pendingUrl : ele.url,
               "favIconUrl": ele.favIconUrl === undefined ? trackedWindowToOpen.tabs[index].favIconUrl : ele.favIconUrl,
               "title": ele.title === "" ? trackedWindowToOpen.tabs[index].title : ele.title
            }
         })

         extensionData.trackedWindows[trackedWindowToOpen.windowName].tabs = usefulTabsData
         extensionData.trackedWindows[trackedWindowToOpen.windowName].groupedTabsInfo = tabGroupedInfo

         saveExtensionData(extensionData)
         updateOptionsPage()
         handleShowingOfExtensionBadge(createdWindow.id)
      }, 0)

   })
}


