import { useEffect, useState } from "react";
import "../global.css";



const Options = () => {

  const [trackedWindows, setTrackedWindows] = useState<Record<string, Array<any>>>({});

  useEffect(()=>{
    chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{
      setTrackedWindows(responseExtensionData.trackedWindows)
    })

    // @ts-ignore
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.signal !== 'changeOptions') return
      setTrackedWindows(message.trackedWindows)
    })
  },[])



  function onSavedWindowClicked(isOpen: boolean, windowName: string) {
    if (isOpen === true) {
      alert("Cannot open opened window")
      return
    }

    let openedWindowDetails = null
    for (let trackedWindow of Object.values(trackedWindows)) {
      // @ts-ignore
      if (trackedWindow.windowName === windowName) {
        openedWindowDetails = trackedWindow
        break
      }
    }
    if (!openedWindowDetails) {
      alert('Saved window not found')
    }

    chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  }


  return (
    <div className="h-[80%] w-[100%]">

      <div className="h-full w-full bg-gray-500 p-10">


        {
          Object.values(trackedWindows).map((ele:any,index)=>(
            <button
            className= {`
              mb-5 p-5 w-full

              ${ele.isOpen ? "bg-red-400" : "bg-gray-400"}

            `}
            key={index}
            onClick={()=>onSavedWindowClicked(ele.isOpen, ele.windowName)}
          
            >{ele.windowName}</button>
          ))
        }


      </div>
    </div>
  )
};


export default Options;