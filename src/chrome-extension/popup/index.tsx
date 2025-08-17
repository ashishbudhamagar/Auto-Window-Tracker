import { ExtensionData, Theme } from "../../types";

import { useState, useEffect, useRef } from "react";
import { IconWindows } from "../../icons";
import extensionImage192 from "../public/192.png";
import "../global.css";

 
export const Popup = () => { 

  const [windowTracked, setWindowTracked] = useState<boolean>(false)
  const [windowName, setWindowName] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [themeIsSet, setThemeIsSet] = useState<boolean>(false)


  useEffect(()=>{
    chrome.windows.getCurrent((window)=>{
      chrome.runtime.sendMessage({signal: 'dataForPopup'},(responseExtensionData: ExtensionData)=>{

        
        if (responseExtensionData.theme === Theme.dark) {

          if (!document.documentElement.classList.contains(Theme.dark)) {
            document.documentElement.classList.add(Theme.dark);
          }

        } else {
          if (document.documentElement.classList.contains(Theme.dark)) {
            document.documentElement.classList.remove(Theme.dark);
          }
        }

        setThemeIsSet(true)


        for (let trackedWindow of Object.values(responseExtensionData.trackedWindows)) {
          if (trackedWindow.windowId === window.id && trackedWindow.isOpen === true) {
            setWindowTracked(true)
            setWindowName(trackedWindow.windowName)
            return
          }
        }
      })
    })

    // needs to be here to stop no connection error from happening
    // because the background script sends message which is only suppose to be for options page
    // @ts-ignore
    chrome.runtime.onMessage.addListener((message) => {
      return
    })
    },[])




  async function onTrackButtonClick() {
    chrome.runtime.sendMessage({signal: 'dataForPopup'}, async (responseExtensionData: ExtensionData)=>{

      if (windowTracked === false) {

        if (windowName.trim() === "") {
          setError("Name the window")
          return
        }

        if (responseExtensionData.allWindowNames.includes(windowName.trim()) === true) {
          setError("Window with the name already exists")
          return
        }
      }
      
      setError("")
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
      setShowToolTip(true)
    },400)
  }

  function onShowTrackedWindowMouseLeave() {
    if (tooltipRef.current) {
      clearTimeout(tooltipRef.current)
      setShowToolTip(false)
    }
  }


  function onOptionsPageClick() {
    const optionsUrl = chrome.runtime.getURL('options.html')
    chrome.tabs.create({url:optionsUrl})
  }

  if (themeIsSet === false) {
    return (
      <div className="h-[250px] w-[350px] bg-white dark:bg-black flex flex-col items-center justify-center">

        <p className="text-gray-500 dark:text-gray-400 text-xs flex">
          <div className="inline-block">Loading </div>
          <div className="flex flex-row">
            <div className="inline-block animate-bounce [animation-delay:100ms]">.</div>
            <div className="inline-block animate-bounce [animation-delay:200ms]">.</div>
            <div className="inline-block animate-bounce [animation-delay:300ms]">.</div>
          </div>
        </p>
      </div>
    )
  }


  return (

    <div className="h-auto w-[350px] flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <header className="p-5 bg-indigo-50 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-300/50 dark:border-gray-700/50 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 group">
            <div className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img src={extensionImage192} className="h-6 w-6 object-cover object-center scale-125"/>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-gray-800 dark:text-gray-200">Auto Window Tracker</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage browser sessions</p>
            </div>
          </div>

          <button 
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 hover:bg-white/80 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={onOptionsPageClick}
            onMouseEnter={onShowTrackedWindowMouseEnter}
            onMouseLeave={onShowTrackedWindowMouseLeave}
            aria-label="Show tracked windows"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <IconWindows className="h-5 w-5 text-gray-600 dark:text-gray-300 relative z-10 transition-transform group-hover:rotate-12 duration-300"/>
            
            {showToolTip && (
              <div className="absolute top-full mt-3 right-0 z-20 w-36 p-2 text-xs font-semibold text-center bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700">
                Show All Tracked Windows
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </header>




      <div className="px-6 py-3 space-y-6">
        <div className="space-y-2">
          <label htmlFor="window-name" className="block pt-4  text-sm font-semibold text-gray-700 dark:text-gray-300">
            Window Name
          </label>
          
          <div className="relative group">
            <input 
              type="text" 
              id="window-name"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className={`
                w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium
                bg-gray-200 dark:bg-gray-700/80 backdrop-blur-sm
                text-gray-800 dark:text-gray-200
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm focus:shadow-lg
                border border-gray-200/50 dark:border-gray-600/50
                ${error ? 'border-red-400 dark:border-red-400 focus:ring-red-300 bg-red-50/50 dark:bg-red-900/20' : 
                  windowTracked ? 'border-green-400 dark:border-green-400 bg-green-50/50 dark:bg-green-900/20' :
                  'focus:border-blue-300 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-400'}
                ${windowTracked ? 'cursor-not-allowed' : 'hover:shadow-md'}
              `}
              placeholder={windowTracked ? "Window already tracked" : "Enter a name for this window..."}
              disabled={windowTracked}
              value={windowName}
              onChange={(e) => setWindowName(e.target.value)}
            />
            
            {windowTracked && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-4 w-4 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg className="h-4 w-4 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="w-1 h-6 bg-red-500 rounded-full"></div>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}
        </div>
        
        <button 
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-sm
            flex items-center justify-center space-x-3
            transition-all duration-300 transform active:translate-y-1
            focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-lg hover:shadow-xl
            ${windowTracked 
              ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white focus:ring-red-300 shadow-red-500/25" 
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-blue-300 dark:focus:ring-blue-400 shadow-blue-500/25 dark:bg-blue-500"}
          `}
          onClick={onTrackButtonClick}
        >
          
          <span>{windowTracked ? "Untrack Window" : "Track Window"}</span>
        </button>
      </div>

      <footer>

        <div className={`flex justify-center items-center flex-col
            space-x-3 text-sm font-medium transition-all duration-300 pb-2
            ${windowTracked 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-500 dark:text-gray-400'}
          `}>

            <div className="w-full h-[1px] bg-gray-300/50 dark:bg-gray-700/50 my-2" />
              

            <div className="">
              <div className="relative ">
                {windowTracked && (
                  <span className="absolute inset-0 w-3 h-3 top-[5.5px] -left-[12px] rounded-full bg-green-400 animate-ping"></span>
                )}
              </div>

                
              <span className="p-2 py-[10px]  opacity-50">

                {windowTracked ? (
                  <span>
                    <span className="text-xs text-green-600 dark:text-green-400">Auto tracking window</span>
                  </span>
                ) : (
                  <span>
                    <span className="text-xs">Window not tracked</span>
                  </span>
                )}
              </span>

            </div>

        </div>

      </footer>




    </div>
  );
};
