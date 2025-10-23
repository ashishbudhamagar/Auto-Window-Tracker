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
         optionsPageSort: OptionsPageSort.custom1,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "green" });
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
   if (details.reason === "update") {

      const windows = 
{
    "1": {
        "windowId": "134350397",
        "windowName": "1",
        "color": "1",
        "isOpen": true,
        "tabs": [
            {
                "id": 134351483,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://www.youtube.com/watch?v=4NY7S2YguXk",
                "favIconUrl": "https://www.youtube.com/s/desktop/a192c735/img/favicon_32x32.png",
                "title": "Kelly Clarkson - since u been gone (slowed reverb) - YouTube"
            },
            {
                "id": 134352916,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://www.amctheatres.com/showtimes/137012206/seats",
                "favIconUrl": "https://www.amctheatres.com/favicon.ico",
                "title": "Select Seats"
            },
            {
                "id": 134351804,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://chromewebstore.google.com/detail/icloud-passwords/pejdijmoenmkgeppbflobdenhhabjlaj",
                "favIconUrl": "https://ssl.gstatic.com/chrome/webstore/images/icon_48px.png",
                "title": "iCloud Passwords - Chrome Web Store"
            },
            {
                "id": 134352364,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://outlook.office.com/mail/inbox/id/AAQkADQ5ZmE3YjU5LTUzNTUtNDBhNC1iYmU2LWI0ZTliMTNjZDYxNAAQANONZs2VXvlMjevkeq%2FCM8w%3D",
                "favIconUrl": "https://res.public.onecdn.static.microsoft/owamail/20251010001.20/resources/images/favicons/mail-unseen.ico",
                "title": "Mail - Ashish Budha - Outlook"
            },
            {
                "id": 134352684,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://northeastern.instructure.com/courses/225911",
                "favIconUrl": "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico",
                "title": "CS4700 Network Fundamentals MERGED Fall 2025 [BOS-1-TR]"
            },
            {
                "id": 134352681,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://github.khoury.northeastern.edu/cs3700/transport-starter-code",
                "favIconUrl": "https://assets.github.khoury.northeastern.edu/favicons/favicon-ent-dark.svg",
                "title": "cs3700/transport-starter-code: Starter code and scripts for the CS 3700 Transport (TCP) project."
            },
            {
                "id": 134352524,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://docs.google.com/document/d/1ZbCxzVDZEVvQ0M2bWZ3CF_Q72QpafKZ-hTxZnNURUS0/edit?tab=t.0",
                "favIconUrl": "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
                "title": "Untitled document - Google Docs"
            },
            {
                "id": 134352530,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://gemini.google.com/app/6c840ee18f949abd",
                "favIconUrl": "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg",
                "title": "Google Gemini"
            },
            {
                "id": 134352541,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://docs.google.com/document/d/1SW0tyMEvlE5pt1uvodGCNHYh731get85naJ4wIEMQp4/edit?tab=t.0",
                "favIconUrl": "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
                "title": "Untitled document - Google Docs"
            },
            {
                "id": 134352952,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://docs.google.com/document/d/1I9Oq7YjrprpGXyHbicxEvlRsXBD9UAblMGBay00wakg/edit?tab=t.0",
                "favIconUrl": "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
                "title": "Assignment Four (Presentation) - Google Docs"
            },
            {
                "id": 134352599,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://docs.google.com/presentation/d/1Dr_C2mDax5tsbibBZIPp5xNcP1-53z60QKSVghlcQVA/edit?slide=id.g2ef931fea1c_1_148#slide=id.g2ef931fea1c_1_148",
                "favIconUrl": "https://ssl.gstatic.com/docs/presentations/images/favicon-2023q4.ico",
                "title": "D3M prezz - Google Slides"
            },
            {
                "id": 134352622,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://docs.google.com/document/d/1IZl6n26fTK3xQ7dg1xKnz4NXZhJ_wNSDrt3HNW_uyPs/edit?tab=t.0",
                "favIconUrl": "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
                "title": "Untitled document - Google Docs"
            },
            {
                "id": 134352967,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://chatgpt.com/c/68f9a4c9-8334-8329-9a74-9faf8960e8f7",
                "favIconUrl": "https://cdn.oaistatic.com/assets/favicon-l4nq08hd.svg",
                "title": "JavaScript sort behavior"
            },
            {
                "id": 134352738,
                "active": true,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://extensions/",
                "favIconUrl": "",
                "title": "Extensions"
            },
            {
                "id": 134353006,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://gemini.google.com/app/522d9c3e7997b27d",
                "favIconUrl": "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg",
                "title": "Google Gemini"
            },
            {
                "id": 134353009,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "https://claude.ai/chat/55971a4e-ac4c-4103-b3ff-73be31be38cc",
                "favIconUrl": "https://claude.ai/favicon.ico",
                "title": "JavaScript array swap debugging - Claude"
            }
        ],
        "groupedTabsInfo": [],
        "dateAdded": 1761193579267,
        "order": -1
    },
    "2": {
        "windowId": "134352832",
        "windowName": "2",
        "color": "2",
        "isOpen": true,
        "tabs": [
            {
                "id": 134352833,
                "active": true,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://newtab/",
                "favIconUrl": "",
                "title": "New Tab"
            }
        ],
        "groupedTabsInfo": [],
        "dateAdded": 1761193581518,
        "order": -1
    },
    "3": {
        "windowId": "134352933",
        "windowName": "3",
        "color": "3",
        "isOpen": true,
        "tabs": [
            {
                "id": 134352934,
                "active": true,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://newtab/",
                "favIconUrl": "",
                "title": "New Tab"
            }
        ],
        "groupedTabsInfo": [],
        "dateAdded": 1761193584216,
        "order": -1
    },
    "4": {
        "windowId": "134352935",
        "windowName": "4",
        "color": "4",
        "isOpen": true,
        "tabs": [
            {
                "id": 134352936,
                "active": true,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://newtab/",
                "favIconUrl": "",
                "title": "New Tab"
            }
        ],
        "groupedTabsInfo": [],
        "dateAdded": 1761193597560,
        "order": -1
    }
}


      const initialExtensionData: ExtensionData = {
         trackedWindows: windows,
         trackedWindowNames: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.custom1,
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

      else if (message.signal === "changeOptionsPageSort") {
         extensionData.optionsPageSort = message.newSort
         saveExtensionData(extensionData)
         sendResponse(extensionData.optionsPageSort)
         return null

      }

      else if (message.signal === "customOptionsPageSort") {

         const customOrderArrayOfTrackedWindows: TrackedWindow = message.customOrderArrayOfTrackedWindows


         for (let i = 0; i < customOrderArrayOfTrackedWindows.length; i++) {
            extensionData.trackedWindows[customOrderArrayOfTrackedWindows[i].windowName].order = i
         }


         saveExtensionData(extensionData)
         updateOptionsPage()
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
            "groupedTabsInfo": groups,
            "dateAdded": Date.now(),
            "order": -1
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
   chrome.runtime.sendMessage({signal: "updateOptions", extensionData: extensionData})
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
//       updateOptionsPage()();
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
//       updateOptionsPage()();
//       return false;

//       }
//       else if (message.signal === 'optionsPageLayout') {
//       extensionData.optionsPageLayout = message.optionsPageLayout;
//       saveExtensionData(extensionData);
//       updateOptionsPage()();
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
//       updateOptionsPage()()
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

//                   updateOptionsPage()()
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
//          updateOptionsPage()()

//       },500)
//    })
// }




} catch (error) {
   console.warn("========= background.js ERROR =======")  
   console.log(error)
   console.warn("========= background.js ERROR =======")  

}