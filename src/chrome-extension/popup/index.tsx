// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import "../global.css";
import { IconWindows, IconBookmark } from "../icons/icons";


export const Popup = () => {

  const [windowTracked, setWindowTracked] = useState(false)
  const [windowName, setWindowName] = useState('')
  const [error, setError] = useState('')

  const [showSavedWindowButtonTooltip, setShowSavedWindowButtonTooltip] = useState(false)
  const tooltipRef = useRef(null)


  document.documentElement.classList.add('dark');






  useEffect(()=>{
    // chrome.windows.getCurrent((window)=>{
    //   chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData)=>{


    //     if (responseExtensionData.themeMode === 'light') {
    //       document.documentElement.classList.remove('dark');
    //     }
    //     if (responseExtensionData.themeMode === 'dark') {
    //       document.documentElement.classList.add('dark');
    //     }



    //     for (let trackedWindow of Object.values(responseExtensionData.trackedWindows)) {
    //       // @ts-ignore
    //       if (trackedWindow.windowId === window.id && trackedWindow.isOpen === true) {
    //         setWindowTracked(true)
    //         // @ts-ignore
    //         setWindowName(trackedWindow.windowName)
    //         return
    //       }
    //     }
    //   })
    // })
    },[])


  async function onTrackButtonClick() {
    // chrome.runtime.sendMessage({signal: 'dataForPopup'}, async (responseExtensionData)=>{

    //   if (windowTracked === false) {
    //     if (windowName.trim() === '') {
    //       setError('Name the window')
    //       return
    //     }
    //     // @ts-ignore
    //     if (responseExtensionData.allWindowNames.includes(windowName.trim()) === true) {
    //       setError('Window with the name already exists')
    //       return
    //     }
    //   }
      
    //   setError('')
    //   const windowId = (await chrome.windows.getCurrent()).id
  
    //   chrome.runtime.sendMessage({
  
    //     signal: "trackButtonClicked",
    //     trackWindow: !windowTracked,
    //     currentWindowId: windowId,
    //     windowName: windowName.trim()
      
    //       }, (resposne)=>{
    //     setWindowTracked(resposne)
    //   })
    // })
  }

  function onShowTrackedWindowMouseEnter() {
    tooltipRef.current = setTimeout(()=>{
      setShowSavedWindowButtonTooltip(true)
    },500)
  }

  function onShowTrackedWindowMouseLeave() {
    clearTimeout(tooltipRef.current)
    setShowSavedWindowButtonTooltip(false)
  }


  function onShowTrackedWindowClick() {
    // const optionsUrl = chrome.runtime.getURL('options.html')
    // chrome.tabs.create({url:optionsUrl})
    // chrome.runtime.sendMessage({signal: "savedWindowPage"})
  }

  return (
    <div className="h-auto w-[320px] flex flex-col">


      <div className="p-5 bg-gray-100 dark:bg-black">

        <div className="flex flex-row justify-between items-center">
            <h1 className="text-[17px] font-medium text-gray-800 dark:text-gray-400">Auto Window Tracker</h1>

            <button className=" text-gray-600  dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md py-[2px] px-[5px] relative"
              onClick={onShowTrackedWindowClick}
              onMouseEnter={onShowTrackedWindowMouseEnter}
              onMouseLeave={onShowTrackedWindowMouseLeave}
            >
              <IconWindows className="h-5 w-5"/>

              { showSavedWindowButtonTooltip && <p className="bg-gray-200 rounded-md absolute top-[35px] -left-[40px] font-medium text-[10px] p-1 
                 after:-top-4 after:left-[45px] after:absolute after:bg-transparent w-20 
                after:border-8 after:border-l-transparent after:border-r-transparent after:border-t-transparent
                after:border-gray-200 after:w-0 after:h-0 text-gray-500 after:skew-x-[-60deg]

                
                dark:bg-gray-700 dark:after:border-b-gray-700 dark:text-gray-400

              ">Show Tracked Windows</p>}
              
            </button>
        </div>
        
      </div>




      <div className="dark:bg-gray-900">
        <div className="h-[0.7px] w-full bg-gray-300 dark:bg-gray-700"></div>

        <div className="p-5">

          <h1 className="text-[14px] font-medium mb-1 text-gray-600 dark:text-gray-400">Window Name</h1>

          <input type="text" className={`
            border-2 rounded-md w-full placeholder:text-[12px] px-4 py-2 my-1
            transition-colors duration-200 ${error === '' ? 'focus:border-gray-700 dark:border-gray-100': 'border-red-400'}
            ${windowTracked ? 'text-gray-400 hover:cursor-not-allowed' : ''}

            border-gray-400
            focus:outline-none focus:ring-0
            
            dark:bg-gray-700 dark:border-gray-800 dark:focus:border-gray-400 dark:text-gray-300

            `} placeholder="Enter window name..."
            disabled={windowTracked}
            value={windowName}
            onChange={(e)=>setWindowName(e.target.value)}
          
          ></input>
          <p className="text-red-400 text-sm">{error}</p>

          <button className={`font-medium  text-white text-[12px] px-10 w-full py-2 rounded-md mt-3
              flex items-center justify-center
              dark:bg-blue-700 dark:text-gray-200

              ${windowTracked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
            `}
            onClick={onTrackButtonClick}
            >
            <IconBookmark className="w-4 h-4 mr-2"/>
            <p>{windowTracked ? "Untrack Window" : "Track Window"}</p>
          </button>
          
        </div>

      </div>



      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700"></div>
        <p className="font-medium text-[11px] text-gray-400 text-center px-3 py-5 dark:text-gray-500  flex-1">{windowTracked ? "Window is being automatically tracked" : "Window is not tracked"}</p>
      </div>


    </div>
  );
};