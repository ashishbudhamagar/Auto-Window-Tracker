import { onExtensionInstalled, extensionData, saveExtensionDataToLocal } from "./data-manager"












async function main() {
try {




  await onExtensionInstalled()




  console.log("================Start=================")
  console.log(extensionData)
  console.log("================Start=================")












  handMessagesSent()
  setupWindowListeners()




  chrome.windows.onRemoved.addListener((windowId)=>{


   for (let [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
      
       console.log(trackedWindow.isOpen === true, trackedWindow.windowId === windowId)


       if (trackedWindow.isOpen === true && trackedWindow.windowId === windowId) {


           console.log(extensionData.trackedWindows[`${name}`])
           extensionData.trackedWindows[`${name}`].isOpen = false
           console.log(extensionData.trackedWindows[`${name}`])


       }
   }






   saveExtensionDataToLocal()
   updateOptionsPage()
  })
















 } catch (error) {
  console.warn(error)
}
}




main()












function handMessagesSent() {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {




  if (message.signal === 'trackButtonClicked') {




    if (message.trackWindow === true) {




      chrome.tabs.query({windowId: message.currentWindowId}, (allTabs)=>{




        const usefulTabsData = allTabs.map((ele)=>{
          return {
            'id': ele.id,
            'groupId': ele.groupId,
            'url': ele.url
          }
        })




        extensionData.allWindowNames.push(message.windowName)
        extensionData.trackedWindows[message.windowName] =
        {
          windowId: message.currentWindowId,
          color: 'white',
          isOpen: true,
          tabs: usefulTabsData,
          windowName: message.windowName
        }




        sendResponse(true)
        updateOptionsPage()


        console.log("============ Window Tracked: True ==============")
        console.log(extensionData.trackedWindows)
        console.log(extensionData.allWindowNames)
      })


      return true
    }
    else {




      for (let [key, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
        if (trackedWindow.windowId === message.currentWindowId && trackedWindow.isOpen) {
          extensionData.allWindowNames = extensionData.allWindowNames.filter(ele=>ele !== trackedWindow.windowName)
          delete extensionData.trackedWindows[key]
          break
        }
      }


      sendResponse(false)
      updateOptionsPage()
    
      console.log("============ Window Tracked: False ==============")
      console.log(extensionData.trackedWindows)
      console.log(extensionData.allWindowNames)
    }
  }
  else if (message.signal === 'windowNameDataForPopup') {
    console.log(extensionData.allWindowNames)
    sendResponse(extensionData.allWindowNames)
  }
  else if ( message.signal === 'getDataForOptions' || message.signal === 'dataForPopup') {
    sendResponse(extensionData.trackedWindows)
  }
  else if (message.signal === 'untrackWindow') {
    delete extensionData.trackedWindows[`${message.windowName}`]
  }
})
}








function setupWindowListeners() {




  chrome.tabs.onRemoved.addListener((tabId, removeInfo)=> {


       if (removeInfo.isWindowClosing === false) {
           reQueryAllTabsToSave(removeInfo.windowId)
       }
  })




  chrome.tabs.onMoved.addListener((tabId, moveInfo)=>{
    reQueryAllTabsToSave(moveInfo.windowId)
  })




  chrome.tabs.onUpdated.addListener((tabId,updateInfo,tab)=>{
      if (updateInfo.url) {
        reQueryAllTabsToSave(tab.windowId)
      }
  })








  function reQueryAllTabsToSave(windowId) {




    for (let [name,trackedWindow] of Object.entries(extensionData.trackedWindows)) {




      if (trackedWindow.windowId === windowId && trackedWindow.isOpen === true) {
      
        chrome.tabs.query({windowId: windowId}, (allTabs)=>{
          extensionData.trackedWindows[name].tabs = allTabs.map((ele)=>{
            return {
              'id': ele.id,
              'groupId': ele.groupId,
              'url': ele.url
            }
          })
        })




        console.log("============ Tab Re-queried ==============")
        console.log(extensionData.trackedWindows)
        break
      }
    }
  }
}




function updateOptionsPage() {
   chrome.tabs.query({url: "chrome-extension://dmfagjhkmiadcampfieimmbalddlaglc/options.html"},(tab)=>{
       if (tab.length !== 0) {
           chrome.runtime.sendMessage({signal: "changeOptions", trackedWindows: extensionData.trackedWindows})
       }
   })
}