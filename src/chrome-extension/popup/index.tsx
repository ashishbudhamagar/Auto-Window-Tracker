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
import { IconWindows, IconBookmark } from "../icons/icons";


export const Popup = () => {


  const [windowTracked, setWindowTracked] = useState(false)
  const [windowName, setWindowName] = useState('')


  // useEffect(()=>{
  //   chrome.windows.getCurrent((window)=>{
  //     chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData)=>{

  //       for (let trackedWindow of Object.values(responseExtensionData.trackedWindows)) {
  //         // @ts-ignore
  //         if (trackedWindow.windowId === window.id && trackedWindow.isOpen === true) {
  //           setWindowTracked(true)
  //           // @ts-ignore
  //           setWindowName(trackedWindow.windowName)
  //           return
  //         }
  //       }
  //     })
  //   })
  // },[])



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


    <div className="h-auto w-[320px]">

      <div className="p-5 bg-gray-50">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-md font-medium text-gray-800">Auto Window Tracker</h1>

          <button className="bg-gray-50 text-gray-600">
          <IconWindows className="h-5 w-5"/>
          </button>
        </div>

      </div>

      <div className="h-[1.5px] w-full bg-gray-300"></div>

      <div className="p-5">
        <h1 className="text-[14px] font-medium mb-1 text-gray-600">Window Name</h1>

        <input type="text" className="border-2 rounded-md w-full placeholder:text-[12px] px-4 py-1 my-1 " placeholder="Enter window name..."></input>

        <button className="font-medium bg-blue-500 text-white text-[12px] px-10 w-full py-2 rounded-md mt-3
          hover:bg-blue-600 flex items-center justify-center
        "
        
        
        
        >
          <IconBookmark className="w-4 h-4 mr-2"/>
          <p>Track Window</p></button>



      </div>

      <div className="h-[1.5px] w-full bg-gray-200"></div>
      <p className="font-medium text-[11px] text-gray-400 text-center p-3">Auto track your tabs and windows easily</p>



    </div>
  );
};