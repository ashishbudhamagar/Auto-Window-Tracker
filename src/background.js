import { debounce, saveExtensionData, } from "./data-manager"


try {


const starterExtensionDataStructure = {
   trackedWindows: {},
   allWindowNames: [],
   optionsPageSort: 'Name: ASC',
   themeMode: 'dark'
}

let extensionData = null
const debounceSaveData = debounce(saveExtensionData, 25000)



chrome.runtime.onInstalled.addListener((details)=>{
   if (details.reason === 'install' || details.reason === 'update') {

      chrome.storage.local.clear()
      chrome.storage.local.set({extensionData: starterExtensionDataStructure})
      extensionData = starterExtensionDataStructure      
   }
})



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

   if (extensionData) {
      processMessages(message, sendResponse)
      return true
   }
   else {
      chrome.storage.local.get('extensionData', (result) => {

         console.log("Data was not found thus now set", result.extensionData)
         extensionData = result.extensionData || structuredClone(starterExtensionDataStructure)
         processMessages(message, sendResponse)
      })

      return true
   }
   
   function processMessages(message, sendResponse) {

      if (message.signal === 'trackButtonClicked') {
         
         if (message.trackWindow === true) {
            handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
         }
         else {
            handleWindowUntrack(message.currentWindowId, sendResponse)
         }

      }
      else if (message.signal === 'getDataForOptions' || message.signal === 'dataForPopup') {
         sendResponse(extensionData)
      }
      else if (message.signal === 'untrackWindowFromOptions') {

         checkAndGetData((windowName)=>{


            delete extensionData.trackedWindows[`${windowName}`]
            extensionData.allWindowNames = extensionData.allWindowNames.filter(ele=> ele !== windowName)
            saveExtensionData(extensionData)
            updateOptionsPage()

         }, message.windowName)
      }
      else if (message.signal === 'openSavedWindow') {
         handleSavedWindowOpen(message.openedWindowDetails)
      }
      else if (message.signal === 'changeTheme') {
         if (extensionData.themeMode === 'light') {
            document.documentElement.classList.add('dark');
            extensionData.themeMode = 'dark'
            sendResponse('dark')

         }
         if (extensionData.themeMode === 'dark') {
            document.documentElement.classList.remove('dark');
            extensionData.themeMode = 'light'
            sendResponse('light')
         }

      }
   }
})



chrome.tabs.onRemoved.addListener((tabId, removeInfo)=> {
   if (removeInfo.isWindowClosing === false) {
      reQueryAllTabsToSave(removeInfo.windowId)
   }
})

chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
   reQueryAllTabsToSave(moveInfo.windowId)
})

chrome.tabs.onUpdated.addListener((tabId,updateInfo,tab)=>{
   if (updateInfo.url || updateInfo.groupId) {
      reQueryAllTabsToSave(tab.windowId)
   }
})


chrome.tabs.onDetached.addListener((tabId,detachInfo)=>{
   if (detachInfo.oldPosition) {
      reQueryAllTabsToSave(detachInfo.oldWindowId)
   }
})



function checkAndGetData(forward, ...args) {

   if (extensionData) {
      forward(...args)
   }
   else {
      chrome.storage.local.get('extensionData', (result) => {
         console.log("Data was not found thus now set", result.extensionData)
         extensionData = result.extensionData
         forward(...args)
      })
   }
}



chrome.windows.onRemoved.addListener((windowId)=>{

   checkAndGetData(forward, windowId)

   function forward(windowId) {
      for (let [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
         if (trackedWindow.isOpen === true && trackedWindow.windowId === windowId) {

            extensionData.trackedWindows[`${name}`].isOpen = false
            saveExtensionData(extensionData)
         }
      }
   }
})




function reQueryAllTabsToSave(windowId) {

   checkAndGetData(forward, windowId)

   function forward(windowId) {

      for (let [name,trackedWindow] of Object.entries(extensionData.trackedWindows)) {

         if (trackedWindow.windowId === windowId && trackedWindow.isOpen === true) {
         
               chrome.tabs.query({windowId: windowId}, (allTabs)=>{
                  extensionData.trackedWindows[name].tabs = allTabs.map((ele)=>{
                     return {
                     'id': ele.id,
                     'groupId': ele.groupId,
                     'url': ele.url,
                     'favIconUrl': ele.favIconUrl,
                     'title': ele.title
                     }
                  })

                  updateOptionsPage()                  
                  debounceSaveData(extensionData)
                  console.log("============ Tab Re-queried ==============")
                  console.log(extensionData.trackedWindows[name].tabs)
               })
               return
         }
      }
   }
}





function updateOptionsPage() {
   chrome.tabs.query({url: "chrome-extension://nfhnplnmgoblehoadbjmkiadacjafcgj/options.html"},(tab)=>{
      if (tab.length !== 0) {
            setTimeout(()=>{
               chrome.runtime.sendMessage({signal: "changeOptions", trackedWindows: extensionData.trackedWindows})
            },150)
      }
   })
}



function handleSavedWindowOpen(openedWindowDetails) {

   
   chrome.windows.create({url: openedWindowDetails.tabs.map(ele=>ele.url)},(newWindow)=>{
      setTimeout(()=>{

         let groupedTabsId = []
         let groupIndex = -1
         let lastGroupId = -1

         openedWindowDetails.tabs.forEach((ele, index)=>{
         
               if (ele.groupId !== -1) {
                  if (lastGroupId !== ele.groupId) {
                     groupIndex++
                     groupedTabsId[groupIndex] = []
                  }
                  groupedTabsId[groupIndex].push(newWindow.tabs[index].id)
                  lastGroupId = ele.groupId
               }
         })

         for (let i = 0; i < groupedTabsId.length; i++) {
               chrome.tabs.group({tabIds: groupedTabsId[i]}, (groupId)=>{
                  chrome.tabGroups.update(groupId,{
                     title: openedWindowDetails.groupedTabsInfo[i].title,
                     color: openedWindowDetails.groupedTabsInfo[i].color,
                     collapsed: openedWindowDetails.groupedTabsInfo[i].collapsed
                  })
               })
         }

         extensionData.trackedWindows[openedWindowDetails.windowName].isOpen = true
         extensionData.trackedWindows[openedWindowDetails.windowName].windowId = newWindow.id
         saveExtensionData(extensionData)

      },500)
   })
}


function handleWindowTrack(currentWindowId, windowName, sendResponse) {
   chrome.tabs.query({windowId: currentWindowId}, (allTabs)=>{
      chrome.tabGroups.query({windowId: currentWindowId}, (groups) => {

         const usefulTabsData = allTabs.map((ele)=>{
               return {
                  'id': ele.id,
                  'groupId': ele.groupId,
                  'url': ele.url,
                  'favIconUrl': ele.favIconUrl,
                  'title': ele.title
               }
         })

         extensionData.allWindowNames.push(windowName)

         extensionData.trackedWindows[windowName] =
         {
               'windowId': currentWindowId,
               'color': 'white',
               'isOpen': true,
               'tabs': usefulTabsData,
               'windowName': windowName,
               'groupedTabsInfo': groups
         }
         
         saveExtensionData(extensionData)
         sendResponse(true)
         updateOptionsPage()
         

         console.log("============ Window Tracked: True ==============")
         console.log(extensionData.trackedWindows)
         console.log(extensionData.allWindowNames)

      })
      
   })
}


function handleWindowUntrack(currentWindowId, sendResponse) {

   for (let [key, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
      if (trackedWindow.windowId === currentWindowId && trackedWindow.isOpen === true) {

         extensionData.allWindowNames = extensionData.allWindowNames.filter(ele=>ele !== trackedWindow.windowName)
         delete extensionData.trackedWindows[key]

         saveExtensionData(extensionData)
         sendResponse(false)
         updateOptionsPage()
         console.log("============ Window Tracked: False ==============")
         console.log(extensionData.trackedWindows)
         console.log(extensionData.allWindowNames)
         return
      }
   }
}







} catch (error) {
 console.warn("=========ERROR=====:", error)  
}