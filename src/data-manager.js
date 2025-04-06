


export function saveExtensionData(dataToSave) {
    chrome.storage.local.set({extensionData: dataToSave}, ()=>{
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError)
        }
        else {
            console.log("=========== Data was saved to local storage ===========")
            console.log(dataToSave)
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