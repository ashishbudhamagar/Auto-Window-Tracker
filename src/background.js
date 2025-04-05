import { onExtensionInstalled, extensionData, saveExtensionDataToLocal } from "./data-manager"


async function main() {
    try {
        
        await onExtensionInstalled()

        console.log("================ Start =================")

        handleMessageReceived()
        setupTabListeners()
        handleWindowClosed()
    }
    catch (error) {
        console.warn(error)
    }
}

main()







function handleMessageReceived() {
        
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

        if (message.signal === 'trackButtonClicked') {

            if (message.trackWindow === true) {
                handleWindowTrack(message.currentWindowId, message.windowName, sendResponse)
                return true
            }
            else {
                handleWIndowUntracked(message.currentWindowId, sendResponse)
            }
        }
        else if ( message.signal === 'getDataForOptions' || message.signal === 'dataForPopup') {
            sendResponse(extensionData)
        }
        else if (message.signal === 'untrackWindow') {
            delete extensionData.trackedWindows[`${message.windowName}`]
        }
        else if (message.signal === 'openSavedWindow') {
            handleSavedWindowOpen(message.openedWindowDetails)
        }
    })
}








function setupTabListeners() {

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


    function reQueryAllTabsToSave(windowId) {
        console.log("Whe n tab opened:", extensionData.allWindowNames)
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
                    
                    console.log("============ Tab Re-queried ==============")
                    console.log(extensionData.trackedWindows[name].tabs)
                })
                break
            }
        }
    }
}




function updateOptionsPage() {
    chrome.tabs.query({url: "chrome-extension://nfhnplnmgoblehoadbjmkiadacjafcgj/options.html"},(tab)=>{
        if (tab.length !== 0) {
            chrome.runtime.sendMessage({signal: "changeOptions", trackedWindows: extensionData.trackedWindows})
        }
    })
}


function handleWindowClosed() {
    chrome.windows.onRemoved.addListener((windowId)=>{

        for (let [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {

            if (trackedWindow.isOpen === true && trackedWindow.windowId === windowId) {

                extensionData.trackedWindows[`${name}`].isOpen = false

                saveExtensionDataToLocal()
                updateOptionsPage() 
            }
        }
    })
}

function handleSavedWindowOpen(openedWindowDetails) {

    console.log("================== Working ===============")
    console.log("================== Working ===============")
    console.log("================== Working ===============")
    console.log(extensionData.trackedWindows['1'])

    const windowDetails = openedWindowDetails

    chrome.windows.create({url: windowDetails.tabs.map(ele=>ele.url)},(newWindow)=>{
        setTimeout(()=>{

            let groupedTabsId = []
            let groupIndex = -1
            let lastGroupId = -1

            windowDetails.tabs.forEach((ele, index)=>{
            
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
                        title: windowDetails.groupedTabsInfo[i].title,
                        color: windowDetails.groupedTabsInfo[i].color,
                        collapsed: windowDetails.groupedTabsInfo[i].collapsed
                    })
                })
            }

            extensionData.trackedWindows[windowDetails.windowName].isOpen = true
            extensionData.trackedWindows[windowDetails.windowName].windowId = newWindow.id

            console.log("end")
            console.log(extensionData.trackedWindows['1'])

        },1000)
    })
}


function handleWindowTrack(currentWindowId, windowName, sendResponse) {
    chrome.tabs.query({windowId: currentWindowId}, (allTabs)=>{
        chrome.tabGroups.query({windowId: currentWindowId}, (groups) => {

            const usefulTabsData = allTabs.map((ele)=>{
                return {
                    'id': ele.id,
                    'groupId': ele.groupId,
                    'url': ele.url
                }
            })

            extensionData.allWindowNames.push(windowName)

            extensionData.trackedWindows[windowName] =
            {
                windowId: currentWindowId,
                color: 'white',
                isOpen: true,
                tabs: usefulTabsData,
                windowName: windowName,
                groupedTabsInfo: groups
            }
            
            sendResponse(true)
            updateOptionsPage()
            

            console.log("============ Window Tracked: True ==============")
            // console.log(extensionData.trackedWindows)
            console.log(extensionData.allWindowNames)

        })
        
    })
}


function handleWIndowUntracked(currentWindowId, sendResponse) {

    for (let [key, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
        if (trackedWindow.windowId === currentWindowId && trackedWindow.isOpen) {
            extensionData.allWindowNames = extensionData.allWindowNames.filter(ele=>ele !== trackedWindow.windowName)
            delete extensionData.trackedWindows[key]

            sendResponse(false)
            updateOptionsPage()
            console.log("============ Window Tracked: False ==============")
            // console.log(extensionData.trackedWindows)
            console.log(extensionData.allWindowNames)
            break
        }
    }
}