// import trackIcon from '../public/track_icon.png'

// let trackedWindows = {


//   "test 1": {
//     isOpen: false,
//     windowId: "123",
//     tabs: []
//   },
//   "test 2": {
//     isOpen: true,
//     windowId: "312",
//     tabs: []
//   },
//   "test 3": {
//     isOpen: false,
//     windowId: "123",
//     tabs: []
//   },
//   "test 4": {
//     isOpen: true,
//     windowId: "123",
//     tabs: []
//   },
//   }

import { useState, useEffect } from "react";
import "../global.css";


export const Popup = () => {


  const [windowTracked, setWindowTracked] = useState(false)
  const [windowName, setWindowName] = useState('')


  useEffect(()=>{
    chrome.windows.getCurrent((window)=>{
      chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData)=>{

        for (let trackedWindow of Object.values(responseExtensionData.trackedWindows)) {
          // @ts-ignore
          if (trackedWindow.windowId === window.id && trackedWindow.isOpen === true) {
            setWindowTracked(true)
            // @ts-ignore
            setWindowName(trackedWindow.windowName)
            break
          }
        }
      })
    })
  },[])



  async function onTrackButtonClick() {


    chrome.runtime.sendMessage({signal: 'dataForPopup'}, async (responseExtensionData)=>{

      if (windowTracked === false) {
        if (windowName.trim() === '') {
          alert("Name the window")
          return
        }
        // @ts-ignore
        if (responseExtensionData.allWindowNames.includes(windowName.trim()) === true) {
          alert('Window with that name already exists')
          return
        }
      }
  

      const windowId = (await chrome.windows.getCurrent()).id
  
      chrome.runtime.sendMessage({
  
        signal: "trackButtonClicked",
        trackWindow: !windowTracked,
        currentWindowId: windowId,
        windowName: windowName.trim()
      
          }, (resposne)=>{
        setWindowTracked(resposne)
      })
    })
  }




  function onWindowsButtonClick() {
    const optionsUrl = chrome.runtime.getURL('options.html')
    chrome.tabs.create({url:optionsUrl})
    chrome.runtime.sendMessage({signal: "savedWindowPage"})
  }

  return (
    <div className="h-full w-full bg-gray-400 relative p-0">




      <div className="absolute -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] flex flex-col items-center justify-center">




        <img  alt="Track Icon" className="w-10 mb-2" />




        <input type="text" value={windowName} onChange={(e)=>setWindowName(e.target.value)} placeholder="type window name..."/>
        <button className=" bg-[#808081] rounded-md p-1 text-[14px] hover:bg-[#6b6b6c] text-[#2f2f2f]
        "




        onClick={onTrackButtonClick}
      
        >{windowTracked ? "Untrack" : "Track"}</button>
      </div>




      <button id="track-button" className="absolute right-0 bottom-0 bg-[#808081] rounded-br-md rounded-tl-md text-[12px] p-[3px] text-[#2f2f2f]
        hover:bg-[#6b6b6c]
      "
      onClick={onWindowsButtonClick}
      >Windows</button>



    </div>
  );
};