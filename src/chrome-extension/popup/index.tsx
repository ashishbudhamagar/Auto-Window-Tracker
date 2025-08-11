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
      <div className="h-[250px] w-[350px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 animate-ping">
            <IconBookmark className="h-10 w-10 text-blue-500/30"/>
          </div>
          <IconBookmark className="h-10 w-10 text-blue-500 relative z-10"/>
        </div>
        <div className="text-center space-y-2">
          <p className="text-gray-700 dark:text-gray-200 text-sm font-semibold">Auto Window Tracker</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Loading...</p>
        </div>
        <div className="mt-4 flex space-x-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    )
  }


  return (
    <div>

    <div className="h-auto w-[350px] flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <header className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-100/50 dark:border-gray-700/50 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <IconBookmark className="h-6 w-6 text-white"/>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">Auto Window Tracker</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage browser sessions</p>
            </div>
          </div>

          <button 
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 hover:bg-white/80 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={onShowTrackedWindowClick}
            onMouseEnter={onShowTrackedWindowMouseEnter}
            onMouseLeave={onShowTrackedWindowMouseLeave}
            aria-label="Show tracked windows"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <IconWindows className="h-5 w-5 text-gray-600 dark:text-gray-300 relative z-10 transition-transform group-hover:rotate-12 duration-300"/>
            
            {showSavedWindowButtonTooltip && (
              <div className="absolute top-full mt-3 right-0 z-20 w-36 p-2 text-xs font-semibold text-center bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700">
                Show Tracked Windows
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </header>




      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <label htmlFor="window-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Window Name
          </label>
          
          <div className="relative group">
            <input 
              type="text" 
              id="window-name"
              className={`
                w-full px-4 py-3 rounded-xl transition-all duration-300 text-lg font-medium
                bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm
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
            w-full py-4 px-6 rounded-xl font-semibold text-base
            flex items-center justify-center space-x-3
            transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0
            focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-lg hover:shadow-xl
            ${windowTracked 
              ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white focus:ring-red-300 shadow-red-500/25" 
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-blue-300 dark:focus:ring-blue-400 shadow-blue-500/25"}
          `}
          onClick={onTrackButtonClick}
        >
          <div className={`p-1 rounded-full ${windowTracked ? 'bg-white/20' : 'bg-white/20'}`}>
            <IconBookmark className="w-5 h-5"/>
          </div>
          <span>{windowTracked ? "Untrack Window" : "Track Window"}</span>
          <div className={`w-2 h-2 rounded-full ${windowTracked ? 'bg-white/60' : 'bg-white/60'} animate-pulse`}></div>
        </button>
      </div>

      <footer className="mt-auto border-t border-gray-100/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm">
        <div className="py-4 px-6 flex justify-center items-center">
          <div className={`flex items-center space-x-3 text-sm font-medium transition-all duration-300
            ${windowTracked 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-500 dark:text-gray-400'}
          `}>
            <div className="relative">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${windowTracked ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
              {windowTracked && (
                <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping"></span>
              )}
            </div>
            <span className="leading-tight">
              {windowTracked ? (
                <span>
                  <span className="font-semibold text-green-700 dark:text-green-300">Active</span>
                  <br />
                  <span className="text-xs text-green-600 dark:text-green-400">Auto-tracking enabled</span>
                </span>
              ) : (
                <span>
                  <span className="font-semibold">Inactive</span>
                  <br />
                  <span className="text-xs">Click to start tracking</span>
                </span>
              )}
            </span>
          </div>
        </div>
      </footer>


    </div>
    </div>


  );
};