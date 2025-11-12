// @ts-nocheck
import {ExtensionData, OptionsPageLayout, OptionsPageSort, Theme, TrackedWindow} from "./types"
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
];


let extensionData: ExtensionData | null = null
const debounceSaveData = debounce(saveExtensionData, 25000)


function checkAndGetData(forward: any, ...args: any) {

   if (extensionData) {
      forward(...args)
   }
   else {
      chrome.storage.local.get("extensionData", (result) => {
         console.log("Data was not found thus now set")
         extensionData = result.extensionData
         forward(...args)
      })
   }
}


try {


chrome.runtime.onInstalled.addListener((details) => {
   
   if (details.reason === "install") {

      const initialExtensionData: ExtensionData = {
         trackedWindows: {},
         trackedWindowNames: [],
         trackedWindowIds: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.custom1,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "#3CB371" })
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
   if (details.reason === "update") {

      // @ts-nocheck
      const initialExtensionData: ExtensionData = {

         trackedWindows: {},
         trackedWindowNames: [],
         trackedWindowIds: [],
         theme: Theme.light,
         optionsPageSort: OptionsPageSort.custom1,
         optionsPageLayout: OptionsPageLayout.card
      }

      chrome.action.setBadgeTextColor({color: "white"})
      chrome.action.setBadgeBackgroundColor({ color: "green" });
      chrome.storage.local.set({ extensionData: structuredClone(initialExtensionData)});
   }
});


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


      else if (message.signal === "untrackWindowFromOptionsPage") {

         const untrackedWindow = extensionData.trackedWindows[message.windowName]
         delete extensionData.trackedWindows[message.windowName]
         extensionData.trackedWindowNames = extensionData.trackedWindowNames.filter(ele => ele !== message.windowName)

         saveExtensionData(extensionData)
         handleShowingOfExtensionBadge(untrackedWindow.windowId)
         updateOptionsPage()
         return false
      }

      else if (message.signal === "openSavedWindow") {

         handleOpenSavedWindow(message.trackedWindowToOpen);
         return false

      }




      
   }
})




chrome.windows.onFocusChanged.addListener((windowId: number)=>{
   if (windowId === chrome.windows.WINDOW_ID_NONE) return null

   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         handleShowingOfExtensionBadge(windowId)
      })
   }
   else {
      handleShowingOfExtensionBadge(windowId)
   }
})


function handleShowingOfExtensionBadge(windowId: number) {
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

function handleWindowTrack(currentWindowId: number, windowName: string, sendResponse: (response: any) => void) {
   chrome.tabs.query({windowId: currentWindowId}, (allTabs)=>{
      chrome.tabGroups.query({windowId: currentWindowId}, (tabsGroupInfo) => {
         
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

   if (!extensionData) {
      chrome.storage.local.get("extensionData", (result)=>{
         extensionData = result.extensionData
         chrome.runtime.sendMessage({signal: "updateOptions", extensionData: extensionData})
      })
      return null
   }

   // the catch is for supressing the error that says no port open to listen to the message
   // when no options page is open
   chrome.runtime.sendMessage({ signal: "updateOptions", extensionData: extensionData })
   .catch(() => {})
}








const debounceContainer: Record<number, any> = {}

function debounceRequeryOfAllTabs(windowId: number) {

   clearTimeout(debounceContainer[windowId])

   debounceContainer[windowId] = setTimeout(() => {

      reQueryAllTabsToSave(windowId)
      delete debounceContainer[windowId]

   }, 700);
}


chrome.tabs.onUpdated.addListener((tabId,updateInfo,tab)=>{

   function start(tab: any) {
      if (!extensionData) return

      for (let trackedWindow of Object.values(extensionData.trackedWindows)) {
         if (trackedWindow.windowId === tab.windowId) {
            debounceRequeryOfAllTabs(tab.windowId)
         }
      }
   }

   if (tab && tab.windowId) {
      checkAndGetData(start, tab)
   }
})


chrome.tabs.onRemoved.addListener((tabId, removeInfo)=> {
   if (removeInfo.isWindowClosing === false) {
      debounceRequeryOfAllTabs(removeInfo.windowId)
   }
})

chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
   debounceRequeryOfAllTabs(moveInfo.windowId)
})


chrome.tabs.onDetached.addListener((tabId,detachInfo)=>{
   if (detachInfo.oldPosition) {
      debounceRequeryOfAllTabs(detachInfo.oldWindowId)
   }
})




chrome.windows.onRemoved.addListener((windowId: number)=>{


   checkAndGetData(forward, windowId)

   function forward(windowId: number) {
      if (!extensionData) return

      for (let trackedWindow of Object.values(extensionData.trackedWindows)) {

         if (trackedWindow.isOpen === true && trackedWindow.windowId === windowId) {

            extensionData.trackedWindows[trackedWindow.windowName].isOpen = false
            saveExtensionData(extensionData)
            updateOptionsPage()
            return null
         }
      }
   }
})




function reQueryAllTabsToSave(windowId: number) {

   checkAndGetData(forward, windowId)

   function forward(windowId: number) {
      if (!extensionData) return


      for (let [name,trackedWindow] of Object.entries(extensionData.trackedWindows)) {

         if (trackedWindow.windowId === windowId && trackedWindow.isOpen === true) {
         
               chrome.tabs.query({windowId: windowId}, (allTabs)=>{
                  if (!extensionData) return
                  
                  console.log("this is being executed", allTabs)

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


function handleOpenSavedWindow(trackedWindowToOpen: TrackedWindow) {

   chrome.windows.create({url: trackedWindowToOpen.tabs.map(ele => ele.url)}, async (createdWindow)=>{
      
      const allTabs = await chrome.tabs.query({windowId: createdWindow.id})
      // console.log("\n\n\n======= quried tabs ==========")
      // console.log(allTabs)
      // console.log("======= quried tabs ==========\n")

      console.log("\n\n\n======= groups tabs ==========")
      console.log(trackedWindowToOpen.groupedTabsInfo)
      console.log("======= groups tabs ==========\n")

      let groupedTabsId: [][] = []
      let groupIndex = -1
      let lastGroupId = -1
      
      trackedWindowToOpen.tabs.forEach((ele, index)=>{

         console.log(ele.groupId)
         if (ele.groupId === -1) return null

         
         if (ele.groupId !== lastGroupId) {
            groupIndex++
            groupedTabsId[groupIndex] = []
         }

         groupedTabsId[groupIndex].push(allTabs[index].id)
         lastGroupId = ele.groupId
      })

      console.log("====================")
      console.log(groupedTabsId)
      console.log(trackedWindowToOpen.groupedTabsInfo)
      console.log("====================")


      for (let i = 0; i < groupedTabsId.length; i++) {
         const newGroupId = await chrome.tabs.group({tabIds: groupedTabsId[i]})

         await chrome.tabGroups.update(newGroupId, {
            title: trackedWindowToOpen.groupedTabsInfo[i].title,
            color: trackedWindowToOpen.groupedTabsInfo[i].color,
            collapsed: trackedWindowToOpen.groupedTabsInfo[i].collapsed
         })
      }



  
      console.log("//here 1", allTabs)
      const usefulTabsData = allTabs.map((ele, index)=>{
         return {
            "id": ele.id,
            "active": ele.active,
            "pinned": ele.pinned,
            "groupId": ele.groupId,
            "url": ele.url === "" ? ele.pendingUrl : ele.url,
            "favIconUrl": ele.favIconUrl === undefined ? trackedWindowToOpen.tabs[index].favIconUrl : ele.favIconUrl,
            "title": ele.title === "" ? trackedWindowToOpen.tabs[index].title : ele.title
         }
      })

      console.log("//here 2", usefulTabsData)
      const grouped = await chrome.tabGroups.query({windowId: createdWindow.id})
      console.log("// here 3", grouped)
      console.log("// here 3", trackedWindowToOpen.groupedTabsInfo)


      extensionData.trackedWindows[trackedWindowToOpen.windowName].tabs = usefulTabsData
      extensionData.trackedWindows[trackedWindowToOpen.windowName].isOpen = true
      extensionData.trackedWindows[trackedWindowToOpen.windowName].windowId = createdWindow.id


      saveExtensionData(extensionData)
      updateOptionsPage()
      handleShowingOfExtensionBadge(createdWindow.id)
   })
}


} catch (error) {
   console.warn("========= background.js ERROR =======")  
   console.log(error)
   console.warn("========= background.js ERROR =======")  
}