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
      chrome.action.setBadgeBackgroundColor({ color: "#3CB371" })
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
   if (details.reason === "update") {


      const initialExtensionData: ExtensionData = {
         trackedWindows: {
    "asd": {
        "color": "white",
        "dateAdded": 1761257135370,
        "groupedTabsInfo": [
            {
                "collapsed": false,
                "color": "grey",
                "id": 2092834314,
                "shared": false,
                "title": "gorup 1",
                "windowId": 134353339
            },
            {
                "collapsed": false,
                "color": "blue",
                "id": 324467991,
                "shared": false,
                "title": "goruped 3",
                "windowId": 134353339
            },
            {
                "collapsed": true,
                "color": "red",
                "id": 649247906,
                "shared": false,
                "title": "new one",
                "windowId": 134353339
            }
        ],
        "isOpen": false,
        "order": -1,
        "tabs": [
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": -1,
                "id": 134353382,
                "pinned": false,
                "title": "web 1 - Google Search",
                "url": "https://www.google.com/search?q=web+1&oq=web+1&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTITCAEQLhiDARjHARixAxjRAxiABDITCAIQLhiDARjHARixAxjRAxiABDITCAMQLhiDARjHARixAxjRAxiABDIKCAQQABixAxiABDIHCAUQLhiABDIKCAYQABixAxiABDINCAcQABiDARixAxiABDIKCAgQABixAxiABNIBBzUxNWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 324467991,
                "id": 134353386,
                "pinned": false,
                "title": "web 2 - Google Search",
                "url": "https://www.google.com/search?q=web+2&oq=web+2&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQABhDGLEDGIAEGIoFMgwIAhAAGEMYgAQYigUyDAgDEAAYQxiABBiKBTIHCAQQABiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDIxMDhqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 324467991,
                "id": 134353389,
                "pinned": false,
                "title": "web 3 - Google Search",
                "url": "https://www.google.com/search?q=web+3&oq=web+3&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQABhDGLEDGIAEGIoFMgwIAhAAGEMYgAQYigUyDAgDEAAYQxiABBiKBTIMCAQQABhDGIAEGIoFMgwIBRAAGEMYgAQYigUyDwgGEAAYFBiHAhixAxiABDIMCAcQABhDGIAEGIoFMgkICBAAGAoYgAQyDAgJEAAYQxiABBiKBdIBCDEzNjFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": -1,
                "id": 134353392,
                "pinned": false,
                "title": "web 5 - Google Search",
                "url": "https://www.google.com/search?q=web+5&oq=web+5&gs_lcrp=EgZjaHJvbWUyDggAEEUYORhDGIAEGIoFMgwIARAjGCcYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyMTk4ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 2092834314,
                "id": 134353395,
                "pinned": false,
                "title": "web 6 - Google Search",
                "url": "https://www.google.com/search?q=web+6&oq=web+6&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQLhiABBjlBDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzcxMmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "",
                "groupId": 2092834314,
                "id": 134353398,
                "pinned": false,
                "title": "New Tab",
                "url": "chrome://newtab/"
            },
            {
                "active": false,
                "favIconUrl": "",
                "groupId": -1,
                "id": 134353399,
                "pinned": false,
                "title": "New Tab",
                "url": "chrome://newtab/"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 649247906,
                "id": 134353400,
                "pinned": false,
                "title": "5 - Google Search",
                "url": "https://www.google.com/search?q=5&oq=5&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIQCAEQLhjHARixAxjRAxiABDIQCAIQLhjHARixAxjRAxiABDIHCAMQABiABDINCAQQABiDARixAxiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzE1NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 649247906,
                "id": 134353401,
                "pinned": false,
                "title": "1 - Google Search",
                "url": "https://www.google.com/search?q=1&oq=1&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIWCAEQLhivARjHARiRAhiABBiKBRiOBTINCAIQABiRAhiABBiKBTIQCAMQLhjHARixAxjRAxiABDIHCAQQABiABDINCAUQABiDARixAxiABDIGCAYQRRg8MgYIBxBFGDzSAQcxMzFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 649247906,
                "id": 134353402,
                "pinned": false,
                "title": "2 - Google Search",
                "url": "https://www.google.com/search?q=2&oq=2&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQLhixAxiABDINCAIQLhiDARixAxiABDINCAMQLhiDARixAxiABDINCAQQABiDARixAxiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzUxMGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 649247906,
                "id": 134353403,
                "pinned": false,
                "title": "3 - Google Search",
                "url": "https://www.google.com/search?q=3&oq=3&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQABiDARixAxiABDINCAIQABiDARixAxiABDINCAMQABiDARixAxiABDINCAQQABiDARixAxiABDIHCAUQABiABDIGCAYQRRg8MgYIBxBFGDzSAQcxODdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": 649247906,
                "id": 134353404,
                "pinned": false,
                "title": "4 - Google Search",
                "url": "https://www.google.com/search?q=4&oq=4&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQLhixAxiABDINCAIQABiDARixAxiABDIHCAMQABiABDINCAQQLhjHARjRAxiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzI1MGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": -1,
                "id": 134353416,
                "pinned": false,
                "title": "1 - Google Search",
                "url": "https://www.google.com/search?q=1&oq=1&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgwIARAAGEMYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDAgFEAAYQxiABBiKBTIGCAYQRRg8MgYIBxBFGDzSAQcxMDBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
                "groupId": -1,
                "id": 134353420,
                "pinned": false,
                "title": "2 - Google Search",
                "url": "https://www.google.com/search?q=2&oq=2&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgoIARAuGLEDGIAEMg0IAhAuGIMBGLEDGIAEMg0IAxAuGIMBGLEDGIAEMg0IBBAAGIMBGLEDGIAEMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEHMTM5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
            },
            {
                "active": false,
                "favIconUrl": "",
                "groupId": -1,
                "id": 134353423,
                "pinned": false,
                "title": "New Tab",
                "url": "chrome://newtab/"
            },
            {
                "active": false,
                "favIconUrl": "",
                "groupId": -1,
                "id": 134353340,
                "pinned": false,
                "title": "Extensions",
                "url": "chrome://extensions/"
            },
            {
                "active": true,
                "favIconUrl": "",
                "groupId": -1,
                "id": 134353452,
                "pinned": false,
                "title": "Options",
                "url": "chrome-extension://ahgnjipoiaamhkijphjdmlfpnjhcgmdg/options.html"
            }
        ],
        "windowId": "134353339",
        "windowName": "asd"
    },
    "new": {
        "windowId": "134353455",
        "windowName": "new",
        "color": "white",
        "isOpen": false,
        "tabs": [
            {
                "id": 134353985,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://newtab/",
                "favIconUrl": "",
                "title": "New Tab"
            },
            {
                "id": 134353456,
                "active": false,
                "pinned": false,
                "groupId": -1,
                "url": "chrome://extensions/",
                "favIconUrl": "",
                "title": "Extensions"
            },
            {
                "id": 134355240,
                "active": true,
                "pinned": false,
                "groupId": -1,
                "url": "chrome-extension://ahgnjipoiaamhkijphjdmlfpnjhcgmdg/options.html",
                "favIconUrl": "",
                "title": "Options"
            }
        ],
        "groupedTabsInfo": [],
        "dateAdded": 1761261802641,
        "order": -1
    }
},
         trackedWindowNames: ["asd", "new"],
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
         return false
      }



      else if (message.signal === "trackOrUntrackButtonClicked") {
         if (message.trackWindow) {
            handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
            return true
         }
         else {
            handleWindowUntrack(message.windowName, sendResponse)
            return false
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


      else if (message.signal === "customOptionsPageSort") {
         
         const customOrderArray: TrackedWindow = message.customOrderArrayOfTrackedWindows
         
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


      else if (message.signal === "untrackWindowFromOptionsPage") {

         delete extensionData?.trackedWindows[message.windowName]
         extensionData.trackedWindowNames = extensionData.trackedWindowNames.filter(ele => ele !== message.windowName)

         saveExtensionData(extensionData)
         updateOptionsPage()
         return false
      }

      else if (message.signal === "openSavedWindow") {

         handleOpenSavedWindow(message.trackedWindowToOpen);
         return false

      }




      
   }
})




chrome.windows.onFocusChanged.addListener((windowId)=>{
   if (windowId === chrome.windows.WINDOW_ID_NONE) return null
   console.log("window changed")

   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         handleShowingOfExtensionBadge(String(windowId))
      })
   }
   else {
      handleShowingOfExtensionBadge(String(windowId))
   }
})


function handleShowingOfExtensionBadge(windowId: string) {
   if (!extensionData) return null

   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
      if (!trackedWindow.isOpen) continue

      if (trackedWindow.windowId === windowId) {
         chrome.action.setBadgeText({ text: " +" });
         return null
      }
   }
   chrome.action.setBadgeText({ text: "" });
}

function handleWindowTrack(currentWindowId: string, windowName: string, sendResponse: (response: any) => void) {

   chrome.tabs.query({windowId: Number(currentWindowId)}, (allTabs)=>{
      chrome.tabGroups.query({windowId: Number(currentWindowId)}, (groups) => {

         if (!extensionData) return null

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
         handleShowingOfExtensionBadge(currentWindowId)
         updateOptionsPage()
      })
   })
}


function handleWindowUntrack(windowName: string, sendResponse: (response: any) => void) {
   if (!extensionData) return null

   for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
      if (trackedWindow.windowName === windowName) {

         delete extensionData.trackedWindows[trackedWindow.windowName]
         extensionData.trackedWindowNames = extensionData.trackedWindowNames.filter(ele=>ele !== trackedWindow.windowName)
         
         saveExtensionData(extensionData)
         sendResponse(false)
         handleShowingOfExtensionBadge(trackedWindow.windowId)
         updateOptionsPage()
         return null
      }
   }
}



function updateOptionsPage() {
   if (!extensionData) return null
   chrome.runtime.sendMessage({signal: "updateOptions", extensionData: extensionData})
}








const debounceContainer = {};

function debounceRequeryOfAllTabs(windowId) {

   if (!windowId) return;

   clearTimeout(debounceContainer[windowId]);

   debounceContainer[windowId] = setTimeout(() => {

      reQueryAllTabsToSave(windowId);
      delete debounceContainer[windowId];
   }, 700);

}

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=> {
   if (removeInfo.isWindowClosing === false) {
      debounceRequeryOfAllTabs(removeInfo.windowId)
   }
})

chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
   debounceRequeryOfAllTabs(moveInfo.windowId)
})

chrome.tabs.onUpdated.addListener((tabId,updateInfo,tab)=>{
   if (updateInfo.url || updateInfo.status === 'complete' || updateInfo.groupId || updateInfo.title || updateInfo.favIconUrl) {
      debounceRequeryOfAllTabs(tab.windowId)
   }
})

chrome.tabs.onDetached.addListener((tabId,detachInfo)=>{
   if (detachInfo.oldPosition) {
      debounceRequeryOfAllTabs(detachInfo.oldWindowId)
   }
})



function checkAndGetData(forward, ...args) {

   if (extensionData) {
      forward(...args)
   }
   else {
      chrome.storage.local.get('extensionData', (result) => {
         console.log("Data was not found thus now set")
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
      updateOptionsPage()
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
               })
               return
         }
      }
   }
}


async function handleOpenSavedWindow(trackedWindowToOpen: TrackedWindow) {

   const createdWindow = await chrome.windows.create({url: trackedWindowToOpen.tabs.map(ele => ele.url)})
   // wait half a second before doing more operation to let the window to be populated with tabs
   setTimeout(async ()=>{

      const allTabs = await chrome.tabs.query({windowId: createdWindow.id})
      let groupedTabsId: [][] = []
      let groupIndex = -1
      let lastGroupId = -1
      
      trackedWindowToOpen.tabs.forEach((ele, index)=>{

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
      

      const usefulTabsData = allTabs.map((ele)=>{
         return {
            "id": ele.id,
            "active": ele.active,
            "pinned": ele.pinned,
            "groupId": ele.groupId,
            "url": ele.url,
            "favIconUrl": ele.favIconUrl,
            "title": ele.title
         }
      })
      const updatedGroups = await chrome.tabGroups.query({windowId: createdWindow.id})   

      extensionData.trackedWindows[trackedWindowToOpen.windowName].groupedTabsInfo = updatedGroups
      extensionData.trackedWindows[trackedWindowToOpen.windowName].isOpen = true
      extensionData.trackedWindows[trackedWindowToOpen.windowName].tabs = usefulTabsData
      extensionData.trackedWindows[trackedWindowToOpen.windowName].windowId = String(createdWindow.id)

      saveExtensionData(extensionData)
      updateOptionsPage()
      handleShowingOfExtensionBadge(String(createdWindow.id))
   },500)
}


} catch (error) {
   console.warn("========= background.js ERROR =======")  
   console.log(error)
   console.warn("========= background.js ERROR =======")  

}