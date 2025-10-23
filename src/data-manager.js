export function saveExtensionData(dataToSave) {
    chrome.storage.local.set({extensionData: dataToSave}, ()=>{
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError)
        }
        else {
            console.log("===========DataSavedToLocal===========")
            console.log("===========DataSavedToLocal===========")
            console.log("===========DataSavedToLocal===========")
            // console.log(dataToSave)
            console.log(dataToSave.trackedWindows)

            console.log("===========DataSavedToLocal===========")
            console.log("===========DataSavedToLocal===========")
            console.log("===========DataSavedToLocal===========")


        }
    })
}


export function debounce(callback, delay) { 
    let timeout = null

    return (...args)=>{

        clearTimeout(timeout)   
        timeout = setTimeout(()=>{
            callback(...args)
        },delay)
    }
}