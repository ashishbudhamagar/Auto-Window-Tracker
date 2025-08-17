// @ts-nocheck
import {ExtensionData, OptionsPageLayout, OptionsPageSort, Theme} from "./types"
import { debounce, saveExtensionData, } from "./data-manager"


try {


const starterExtensionDataStructure: ExtensionData = {
   trackedWindows: {},
   allWindowNames: [],
   optionsPageSort: OptionsPageSort.nameAsc,
   theme: Theme.dark,
   optionsPageLayout: OptionsPageLayout.card
}

let extensionData = null
const debounceSaveData = debounce(saveExtensionData, 25000)
const debounceUpdateOptionsPage = debounce(updateOptionsPage, 250)


chrome.runtime.onInstalled.addListener((details) => {

  if (details.reason === 'install') {

    chrome.storage.local.set({ extensionData: starterExtensionDataStructure });
    extensionData = structuredClone(starterExtensionDataStructure);

  }
  else if (details.reason === 'update') {

    chrome.storage.local.get('extensionData', (result) => {

      if (!result.extensionData) {
        chrome.storage.local.set({ extensionData: starterExtensionDataStructure });
        extensionData = structuredClone(starterExtensionDataStructure);
        return;
      }

      const oldExtensionData: ExtensionData = {
        trackedWindows: result.extensionData.trackedWindows || {},
        allWindowNames: Array.isArray(result.extensionData.allWindowNames) ? result.extensionData.allWindowNames : [],
        optionsPageSort: result.extensionData.optionsPageSort || OptionsPageSort.nameAsc,
        theme: result.extensionData.theme === Theme.light ? Theme.light : Theme.dark,
        optionsPageLayout: result.extensionData.optionsPageLayout || OptionsPageLayout.card
      };

      chrome.storage.local.set({ extensionData: oldExtensionData });
      extensionData = structuredClone(oldExtensionData);
    });
  }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   // anytime message is sent to the background, check if the workers are asleep
   // if they are, the extensionData will be null
   // so here, get the data from storage
  if (!extensionData) {
    chrome.storage.local.get('extensionData', (result) => {
      console.log("Data was not found thus now set", result.extensionData)
      extensionData = result.extensionData || structuredClone(starterExtensionDataStructure)
      processMessages(message, sendResponse)
    });
    return true;
  }
 
  return processMessages(message, sendResponse);

  function processMessages(message, sendResponse) {
      
    if (message.signal === 'trackButtonClicked') {
      if (message.trackWindow === true) {
        handleWindowTrack(message.currentWindowId, message.windowName, sendResponse);
      }
      else {
        handleWindowUntrack(message.currentWindowId, sendResponse);
      }
      return true;
    }
    else if (message.signal === 'getDataForOptions' || message.signal === 'dataForPopup') {
      sendResponse(extensionData);
      return false;
    }
    else if (message.signal === 'untrackWindowFromOptions') { 

      delete extensionData.trackedWindows[message.windowName];
      extensionData.allWindowNames = extensionData.allWindowNames.filter(ele => ele !== message.windowName);
      saveExtensionData(extensionData);
      debounceUpdateOptionsPage();
      return false;
    }
    else if (message.signal === 'openSavedWindow') {
      handleSavedWindowOpen(message.openedWindowDetails);

      return false;
    }
    else if (message.signal === 'changeTheme') {

      let theme = null;

      if (extensionData.theme === 'light') {

        extensionData.theme = 'dark';
        theme = 'dark';

      } else if (extensionData.theme === 'dark') {

        extensionData.theme = 'light';
        theme = 'light';
        
      }
      saveExtensionData(extensionData);
      sendResponse(theme);
      return false;
    }
    else if (message.signal === 'setOptionsPageSort') {

      extensionData.optionsPageSort = message.optionsPageSort;
      console.log("Setting options page sort to:", extensionData.optionsPageSort);
      saveExtensionData(extensionData);
      sendResponse(message.optionsPageSort);
      debounceUpdateOptionsPage();
      return false;

    }
    else if (message.signal === 'optionsPageLayout') {
      extensionData.optionsPageLayout = message.optionsPageLayout;
      saveExtensionData(extensionData);
      debounceUpdateOptionsPage();
      return false;

    }

    return false;
  }
});



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

                  debounceUpdateOptionsPage()
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

   chrome.runtime.sendMessage({
      signal: 'changeOptions',
      trackedWindows: extensionData.trackedWindows
   }, () => {
      console.log("============ Options Page Updated ==============")
      if (chrome.runtime.lastError) {
         console.debug('No options page open to receive updateOptionsPage message', chrome.runtime.lastError.message)
      }
   });
   
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
         debounceUpdateOptionsPage()
         

         console.log("============ Window Tracked: True ==============")
         console.log(extensionData.trackedWindows)

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
         debounceUpdateOptionsPage()
         console.log("============ Window Tracked: False ==============")
         console.log(extensionData.trackedWindows)
         console.log(extensionData.allWindowNames)
         return
      }
   }
}







} catch (error) {
 console.warn("========= background.js ERROR =====:", error)  
}