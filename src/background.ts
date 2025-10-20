//@ts-nocheck
import {ExtensionData, OptionsPageLayout, OptionsPageSort, Theme, TrackedWindow} from "./types"
import { debounce, saveExtensionData } from "./data-manager"


let extensionData: ExtensionData | null = null
const debounceSaveData = debounce(saveExtensionData, 25000)



try {


chrome.runtime.onInstalled.addListener((details) => {
   
   if (details.reason === "install") {

      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         trackedWindowNames: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.nameAsc,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "green" });
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
   if (details.reason === "update") {

      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         trackedWindowNames: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.nameAsc,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "green" });
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
});


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

      if (message.signal === "getExtensionData") {
         sendResponse(extensionData)
         return null
      }



      else if (message.signal === "trackOrUntrackButtonClicked") {
         if (message.trackWindow) {
            handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
            return true
         }
         else {
            handleWindowUntrack(message.windowName, sendResponse)
            return null
         }
      }


      else if (message.signal === "changeTheme") {

         extensionData.theme = extensionData.theme === Theme.light ? Theme.dark : Theme.light
         saveExtensionData(extensionData)
         sendResponse(extensionData.theme)
         return null
      }


      else if (message.signal === "changeOptionsPageLayout") {
         extensionData.optionsPageLayout = extensionData.optionsPageLayout === OptionsPageLayout.card ? OptionsPageLayout.table : OptionsPageLayout.card
         saveExtensionData(extensionData)
         sendResponse(extensionData.optionsPageLayout)
         return null
      }

      else if (message.signal === 'reorderTrackedWindows') {
         // Expect newOrder: string[] of windowName in desired order
         if (!Array.isArray(message.newOrder)) {
            sendResponse(false)
            return null
         }

         const newOrder: string[] = message.newOrder
         // Rebuild trackedWindows object in same order (trackedWindows is an object keyed by name, but we persist ordering in trackedWindowNames)
         const newTrackedWindowNames: string[] = []
         const newTrackedWindows: Record<string, TrackedWindow> = {}

         for (const name of newOrder) {
            if (extensionData.trackedWindows[name]) {
               newTrackedWindowNames.push(name)
               newTrackedWindows[name] = extensionData.trackedWindows[name]
            }
         }

         // For any windows not included in newOrder, append them at the end to avoid data loss
         for (const [name, tw] of Object.entries(extensionData.trackedWindows)) {
            if (!newTrackedWindows[name]) {
               newTrackedWindowNames.push(name)
               newTrackedWindows[name] = tw
            }
         }

         extensionData.trackedWindowNames = newTrackedWindowNames
         extensionData.trackedWindows = newTrackedWindows
         saveExtensionData(extensionData)
         updateOptionsPage()
         sendResponse(true)
         return null
      }


      
   }
})




chrome.windows.onFocusChanged.addListener((windowId)=>{
   if (windowId === chrome.windows.WINDOW_ID_NONE) return null
   console.log("window changed")

   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         handleExtensionBadge(windowId)
      })
   }
   else {
      handleExtensionBadge(windowId)
   }
})


function handleExtensionBadge(windowId: number) {
   if (!extensionData) return null

   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {

      if (!trackedWindow.isOpen) continue

      if (trackedWindow.windowId === String(windowId)) {
         chrome.action.setBadgeText({ text: "on" });
         return null
      }
   }
   chrome.action.setBadgeText({ text: "" });
}

function handleWindowTrack(currentWindowId: string, windowName: string, sendResponse: (response: any) => void) {

   chrome.tabs.query({windowId: Number(currentWindowId)}, (allTabs)=>{
      chrome.tabGroups.query({windowId: Number(currentWindowId)}, (groups) => {

         if (!extensionData) return null
         console.log("groups:", groups)
         console.log("all tabs:", allTabs)

         const usefulTabsData = allTabs.map((ele)=>{
            return {
               'id': ele.id,
               "active": ele.active,
               "pinned": ele.pinned,
               'groupId': ele.groupId,
               'url': ele.url,
               'favIconUrl': ele.favIconUrl,
               'title': ele.title
            }
         })

         const trackedWindow: TrackedWindow = {
            "windowId": currentWindowId,
            "windowName": windowName,
            "color": "white",
            "isOpen": true,
            "tabs": usefulTabsData,
            "groupedTabsInfo": groups
         }
         
         extensionData.trackedWindows[windowName] = trackedWindow
         extensionData.trackedWindowNames.push(windowName)
         
         saveExtensionData(extensionData)
         sendResponse(true)
         handleExtensionBadge(Number(currentWindowId))
         updateOptionsPage()
      })
   })
}


function handleWindowUntrack(windowName: string, sendResponse: (response: any) => void) {
   if (!extensionData) return null

   for (let [key, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
      if (key === windowName) {

         extensionData.trackedWindowNames = extensionData.trackedWindowNames.filter(ele=>ele !== trackedWindow.windowName)
         delete extensionData.trackedWindows[key]
         
         saveExtensionData(extensionData)
         sendResponse(false)
         handleExtensionBadge(Number(trackedWindow.windowId))
         updateOptionsPage()
         return null
      }
   }
}



function updateOptionsPage() {
   if (!extensionData) return null

   chrome.runtime.sendMessage({signal: 'changeOptions', trackedWindows: extensionData.trackedWindows},
      () => {
         if (chrome.runtime.lastError) {
            console.debug("error was probably the options page not being found when this message is sent which is not an issue", chrome.runtime.lastError.message)
         }
      }
   );
   
}



// function processMessages222(message, sendResponse) {
   
//    if (message.signal === 'trackButtonClicked') {
//       if (message.trackWindow === true) {
//             handleWindowTrack(message.currentWindowId, message.windowName, sendResponse);
//       }
//       else {
//             handleWindowUntrack(message.currentWindowId, sendResponse);
//       }
//       return true;
//    }
//    else if (message.signal === 'dataForOptions' || message.signal === 'dataForPopup') {
//       sendResponse(extensionData);
//       return false;
//    }

//    else if (message.signal === 'untrackWindowFromOptions') {

//       delete extensionData.trackedWindows[message.windowName];
//       extensionData.allWindowNames = extensionData.allWindowNames.filter(ele => ele !== message.windowName);
//       saveExtensionData(extensionData);
//       updateOptionsPage();
//       // send an acknowledgement so callers waiting on a response don't get the channel closed unexpectedly
//       try { sendResponse(true); } catch (e) { /* ignore if channel already closed */ }
//       return false;
//       }
//       else if (message.signal === 'openSavedWindow') {
//       handleSavedWindowOpen(message.openedWindowDetails);
//       // acknowledge request
//       try { sendResponse(true); } catch (e) { /* ignore if channel already closed */ }

//       return false;
//       }
//       else if (message.signal === 'changeTheme') {

//       let theme = null;

//       if (extensionData.theme === 'light') {

//             extensionData.theme = 'dark';
//             theme = 'dark';

//       } else if (extensionData.theme === 'dark') {

//             extensionData.theme = 'light';
//             theme = 'light';
            
//       }
//       saveExtensionData(extensionData);
//       sendResponse(theme);
//       return false;
//       }
//       else if (message.signal === 'setOptionsPageSort') {

//       extensionData.optionsPageSort = message.optionsPageSort;
//       saveExtensionData(extensionData);
//       sendResponse(message.optionsPageSort);
//       updateOptionsPage();
//       return false;

//       }
//       else if (message.signal === 'optionsPageLayout') {
//       extensionData.optionsPageLayout = message.optionsPageLayout;
//       saveExtensionData(extensionData);
//       updateOptionsPage();
//       // acknowledge so callers don't hang when extensionData had to be fetched first
//       try { sendResponse(true); } catch (e) { /* ignore if channel already closed */ }
//       return false;

//    }

//    return false;
// }





// const debounceContainer = {};

// function debounceRequeryOfAllTabs(windowId) {

//    if (!windowId) return;

//    clearTimeout(debounceContainer[windowId]);

//    debounceContainer[windowId] = setTimeout(() => {

//       reQueryAllTabsToSave(windowId);
//       delete debounceContainer[windowId];
//    }, 700);

// }

// chrome.tabs.onRemoved.addListener((tabId, removeInfo)=> {
//    if (removeInfo.isWindowClosing === false) {
//       debounceRequeryOfAllTabs(removeInfo.windowId)
//    }
// })

// chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
//    debounceRequeryOfAllTabs(moveInfo.windowId)
// })

// chrome.tabs.onUpdated.addListener((tabId,updateInfo,tab)=>{
//    if (updateInfo.url || updateInfo.status === 'complete' || updateInfo.groupId || updateInfo.title || updateInfo.favIconUrl) {
//       debounceRequeryOfAllTabs(tab.windowId)
//    }
// })

// chrome.tabs.onDetached.addListener((tabId,detachInfo)=>{
//    if (detachInfo.oldPosition) {
//       debounceRequeryOfAllTabs(detachInfo.oldWindowId)
//    }
// })



// function checkAndGetData(forward, ...args) {

//    if (extensionData) {
//       forward(...args)
//    }
//    else {
//       chrome.storage.local.get('extensionData', (result) => {
//          console.log("Data was not found thus now set")
//          extensionData = result.extensionData
//          forward(...args)
//       })
//    }
// }



// chrome.windows.onRemoved.addListener((windowId)=>{

//    checkAndGetData(forward, windowId)

//    function forward(windowId) {
//       for (let [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
//          if (trackedWindow.isOpen === true && trackedWindow.windowId === windowId) {

//             extensionData.trackedWindows[`${name}`].isOpen = false
//             saveExtensionData(extensionData)
//          }
//       }
//       updateOptionsPage()
//    }
// })




// function reQueryAllTabsToSave(windowId) {

//    checkAndGetData(forward, windowId)

//    function forward(windowId) {

//       for (let [name,trackedWindow] of Object.entries(extensionData.trackedWindows)) {

//          if (trackedWindow.windowId === windowId && trackedWindow.isOpen === true) {
         
//                chrome.tabs.query({windowId: windowId}, (allTabs)=>{
//                   extensionData.trackedWindows[name].tabs = allTabs.map((ele)=>{
//                      return {
//                      'id': ele.id,
//                      'groupId': ele.groupId,
//                      'url': ele.url,
//                      'favIconUrl': ele.favIconUrl,
//                      'title': ele.title
//                      }
//                   })

//                   updateOptionsPage()
//                   debounceSaveData(extensionData)
//                })
//                return
//          }
//       }
//    }
// }



 



// function handleSavedWindowOpen(openedWindowDetails) {

   
//    chrome.windows.create({url: openedWindowDetails.tabs.map(ele=>ele.url)},(newWindow)=>{
//       setTimeout(()=>{

//          let groupedTabsId = []
//          let groupIndex = -1
//          let lastGroupId = -1

//          openedWindowDetails.tabs.forEach((ele, index)=>{
         
//                if (ele.groupId !== -1) {
//                   if (lastGroupId !== ele.groupId) {
//                      groupIndex++
//                      groupedTabsId[groupIndex] = []
//                   }
//                   groupedTabsId[groupIndex].push(newWindow.tabs[index].id)
//                   lastGroupId = ele.groupId
//                }
//          })

//          for (let i = 0; i < groupedTabsId.length; i++) {
//                chrome.tabs.group({tabIds: groupedTabsId[i]}, (groupId)=>{
//                   chrome.tabGroups.update(groupId,{
//                      title: openedWindowDetails.groupedTabsInfo[i].title,
//                      color: openedWindowDetails.groupedTabsInfo[i].color,
//                      collapsed: openedWindowDetails.groupedTabsInfo[i].collapsed
//                   })
//                })
//          }

//          extensionData.trackedWindows[openedWindowDetails.windowName].isOpen = true
//          extensionData.trackedWindows[openedWindowDetails.windowName].windowId = newWindow.id
//          saveExtensionData(extensionData)
//          updateOptionsPage()

//       },500)
//    })
// }




} catch (error) {
   console.warn("========= background.js ERROR =======")  
   console.log(error)
   console.warn("========= background.js ERROR =======")  

}