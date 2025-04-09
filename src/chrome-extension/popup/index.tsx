import { useState, useEffect } from "react";
import "../global.css";
import { IconWindows, IconBookmark } from "../icons/icons";


export const Popup = () => {

  const [windowTracked, setWindowTracked] = useState(false)
  const [windowName, setWindowName] = useState('')
  const [error, setError] = useState('')


  useEffect(()=>{
    chrome.windows.getCurrent((window)=>{
      chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData)=>{

        for (let trackedWindow of Object.values(responseExtensionData.trackedWindows)) {
          // @ts-ignore
          if (trackedWindow.windowId === window.id && trackedWindow.isOpen === true) {
            setWindowTracked(true)
            // @ts-ignore
            setWindowName(trackedWindow.windowName)
            return
          }
        }
      })
    })
    },[])


  async function onTrackButtonClick() {
    chrome.runtime.sendMessage({signal: 'dataForPopup'}, async (responseExtensionData)=>{


      if (windowTracked === false) {
        if (windowName.trim() === '') {
          setError('Name the window')
          return
        }
        // @ts-ignore
        if (responseExtensionData.allWindowNames.includes(windowName.trim()) === true) {
          setError('Window with the name already exists')
          return
        }
      }
      
      setError('')
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




  function onSavedWindowsClick() {
    const optionsUrl = chrome.runtime.getURL('options.html')
    chrome.tabs.create({url:optionsUrl})
    chrome.runtime.sendMessage({signal: "savedWindowPage"})
  }

  return (
    <div className="h-auto w-[320px]">

      <div className="p-5 bg-gray-50">

        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[17px] font-medium text-gray-800">Auto Window Tracker</h1>

          <button className="bg-gray-50 text-gray-600 hover:bg-gray-200 rounded-md py-[2px] px-[5px]"
            onClick={onSavedWindowsClick}
          >
          <IconWindows className="h-5 w-5"/>
          </button>
        </div>
        
      </div>

      <div className="h-[1.5px] w-full bg-gray-300"></div>

      <div className="p-5">

        <h1 className="text-[14px] font-medium mb-1 text-gray-600">Window Name</h1>

        <input type="text" className={`
          border-2 rounded-md w-full placeholder:text-[12px] px-4 py-2 my-1
          transition-colors duration-300 ${error === '' ? 'focus:outline-blue-500': 'border-red-400 focus:outline-red-400'}
          ${windowTracked ? 'text-gray-400 hover:cursor-not-allowed' : ''}

          `} placeholder="Enter window name..."
          disabled={windowTracked}
          value={windowName}
          onChange={(e)=>setWindowName(e.target.value)}
        
        ></input>
        <p className="text-red-400 text-sm">{error}</p>
        <button className={`font-medium  text-white text-[12px] px-10 w-full py-2 rounded-md mt-3
             flex items-center justify-center 
            ${windowTracked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
          `}
          onClick={onTrackButtonClick}
        
        >
          <IconBookmark className="w-4 h-4 mr-2"/>
          <p>{windowTracked ? "Untrack Window" : "Track Window"}</p></button>
        
      </div>

      <div className="h-[1.5px] w-full bg-gray-200"></div>
      <p className="font-medium text-[11px] text-gray-400 text-center px-3 py-3">{windowTracked ? "Window is being automatically tracked" : "Auto track your tabs and windows easily"}</p>

    </div>
  );
};