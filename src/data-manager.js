const starterExtensionData = {
    trackedWindows: {},
    allWindowNames: [],
    user: "Ash",
    moreData: 123123,
}


export let extensionData = null
 

export function onExtensionInstalled() {
    return new Promise((resolve, reject)=>{
        chrome.runtime.onInstalled.addListener((details)=>{
            if (chrome.runtime.lastError) {
                reject("Error: On Installed")
            }
            else {
                if (details.reason === 'install') {
                    chrome.storage.local.set( { extensionData: starterExtensionData}, ()=>{
                        extensionData = starterExtensionData
                        resolve(true)
                    })
                }
                else if (details.reason === 'update' || details.reason === 'chrome_update') {


                    chrome.storage.local.clear()
                    chrome.storage.local.set( { extensionData: starterExtensionData}, ()=>{
                        extensionData = starterExtensionData
                        resolve(true)
                    })
                    // chrome.storage.local.get('extensionData', (data)=> {
                    //     extensionData = data
                    //     resolve(true)
                    // })
                }
                else {
                    reject('Error: Checking type of update/install/chromeupdate')
                }               
            }
        })
    })
}

export function saveExtensionDataToLocal() {
    chrome.storage.local.set({extensionData: extensionData}, ()=>{
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError)
        }
        else {
            console.log("=========== Data was saved to local storage ===========")
            console.log(extensionData)
        }
    })
 }
 