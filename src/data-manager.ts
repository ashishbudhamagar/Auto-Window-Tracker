import {ExtensionData} from "./types"

export function saveExtensionData(dataToSave: ExtensionData) {

    chrome.storage.local.set({extensionData: dataToSave}, ()=>{
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError)
        }
        else {
            // console.log("=========== DataSavedToLocal ===========")
            // console.log("=========== DataSavedToLocal ===========")
            // console.log(dataToSave.trackedWindows)
            // console.log("=========== DataSavedToLocal ===========")
            // console.log("=========== DataSavedToLocal ===========")
        }
    })
}



export function debounce(callback: any, delay: number) { 
    let timeout: any  = null

    return (...args: any)=>{

        clearTimeout(timeout)   
        timeout = setTimeout(()=>{
            callback(...args)
        },delay)
    }
}