// @ts-nocheck
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "../global.css";
import { IconWindows, IconBookmark } from "../icons/icons";


export const Popup = () => {

  const [windowTracked, setWindowTracked] = useState(false)
  const [windowName, setWindowName] = useState('')
  const [error, setError] = useState('')

  const [showSavedWindowButtonTooltip, setShowSavedWindowButtonTooltip] = useState(false)
  const tooltipRef = useRef(null)

  const [themeIsSet, setThemeIsSet] = useState(false)



  useEffect(()=>{
    chrome.windows.getCurrent((window)=>{
      chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData)=>{


        
        if (responseExtensionData.themeMode === 'dark') {

          if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
          }

        } else {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
          }
        }

        setThemeIsSet(true)


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

  function onShowTrackedWindowMouseEnter() {
    tooltipRef.current = setTimeout(()=>{
      setShowSavedWindowButtonTooltip(true)
    },400)
  }

  function onShowTrackedWindowMouseLeave() {
    clearTimeout(tooltipRef.current)
    setShowSavedWindowButtonTooltip(false)
  }


  function onShowTrackedWindowClick() {
    const optionsUrl = chrome.runtime.getURL('options.html')
    chrome.tabs.create({url:optionsUrl})
  }


  if (themeIsSet === false) {
    return (
      <div className="h-[200px] w-[320px] bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <IconBookmark className="h-8 w-8 text-blue-500 mb-3"/>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Loading...</p>
      </div>
    )
  }


  return (
    <div className="h-auto w-[320px] flex flex-col bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
      <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md">
              <IconBookmark className="h-5 w-5 text-blue-500 dark:text-blue-400"/>
            </div>
            <h1 className="text-base font-semibold text-gray-800 dark:text-gray-200">Auto Window Tracker</h1>
          </div>

          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 relative"
            onClick={onShowTrackedWindowClick}
            onMouseEnter={onShowTrackedWindowMouseEnter}
            onMouseLeave={onShowTrackedWindowMouseLeave}
            aria-label="Show tracked windows"
          >
            <IconWindows className="h-4 w-4 text-gray-600 dark:text-gray-300"/>
            
            {showSavedWindowButtonTooltip && (
              <div className="absolute top-full mt-2 right-0 z-10 w-32 p-1.5 text-xs font-medium text-center bg-gray-800 text-white rounded-md shadow-lg">
                Show Tracked Windows
                <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </header>




      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="window-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Window Name
          </label>
          
          <div className="relative">
            <input 
              type="text" 
              id="window-name"
              className={`
                w-full px-3 py-2 rounded-lg border
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-200
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-opacity-50
                transition-all duration-200
                ${error ? 'border-red-400 dark:border-red-400 focus:ring-red-300' : 
                  'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'}
                ${windowTracked ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : ''}
              `}
              placeholder={windowTracked ? "Window already tracked" : "Enter a name for this window..."}
              disabled={windowTracked}
              value={windowName}
              onChange={(e) => setWindowName(e.target.value)}
            />
            
            {windowTracked && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            )}
          </div>
          
          {error && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
        
        <button 
          className={`
            w-full py-2.5 px-4 rounded-lg font-medium text-sm
            flex items-center justify-center space-x-2
            transition-all duration-200 transform hover:translate-y-[-1px]
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${windowTracked 
              ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300" 
              : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300 dark:focus:ring-blue-700"}
          `}
          onClick={onTrackButtonClick}
        >
          <IconBookmark className="w-4 h-4"/>
          <span>{windowTracked ? "Untrack Window" : "Track Window"}</span>
        </button>
      </div>

      <footer className="mt-auto border-t border-gray-100 dark:border-gray-700">
        <div className="py-3 px-4 flex justify-center items-center">
          <div className={`flex items-center text-sm
            ${windowTracked 
              ? 'text-green-500 dark:text-green-400' 
              : 'text-gray-400 dark:text-gray-500'}
          `}>
            <span className={`w-2 h-2 rounded-full mr-2 ${windowTracked ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span>
              {windowTracked ? "Window is being automatically tracked" : "Window is not currently tracked"}
            </span>
          </div>
        </div>
      </footer>


    </div>
  );
};