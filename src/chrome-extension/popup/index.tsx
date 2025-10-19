import { useState, useEffect, useRef } from "react";
import { ExtensionData, Theme } from "../../types";
import { IconWindows } from "../../icons";
import extensionImage192 from "../public/192.png";
import "../global.css";

 
export const Popup = () => {
  
  const [currentWindowTracked, setCurrentWindowTracked] = useState<boolean | null>(null)
  const [currentWindowName, setCurrentWindowName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [themeIsSet, setThemeIsSet] = useState<boolean>(false)
  const [showToolTip, setShowToolTip] = useState<boolean>(false)

  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null)


  useEffect(()=>{
    chrome.runtime.sendMessage({signal: "getExtensionData"}, (response: ExtensionData) =>{
      if (response.theme === Theme.dark) {
        if (!document.documentElement.classList.contains(Theme.dark)) {
          document.documentElement.classList.add(Theme.dark)
        }
      }
      else {
        if (document.documentElement.classList.contains(Theme.dark)) {
          document.documentElement.classList.remove(Theme.dark)
        }
      }

      setThemeIsSet(true)

      chrome.windows.getCurrent((currentWindow)=>{

        for (let trackedWindow of Object.values(response.trackedWindows)) {
          if (trackedWindow.windowId == String(currentWindow.id) && trackedWindow.isOpen) {
            setCurrentWindowTracked(true)
            setCurrentWindowName(trackedWindow.windowName)
            return null
          }
        }
        setCurrentWindowTracked(false)
        setCurrentWindowName("")
      })
    })
  },[])


  async function onTrackWindowButtonClicked() {

    chrome.runtime.sendMessage({signal: "getExtensionData"}, (response: ExtensionData)=>{

      if (currentWindowTracked === false) {
        //@ts-ignore
        if (currentWindowName.trim() === "") {
          setError("Name the window")
          return null
        }
        //@ts-ignore
        if ( response.trackedWindowNames.includes(currentWindowName.trim()) === true) {
          setError("Window with the name already exists")
          return null
        }
      }

      setError("")

      chrome.windows.getCurrent((currentWindow)=>{
        chrome.runtime.sendMessage({

          signal: "trackOrUntrackButtonClicked",
          trackWindow: !currentWindowTracked,
          currentWindowId: String(currentWindow.id),
          //@ts-ignore
          windowName: currentWindowName.trim()

        }, (bool: boolean)=>{ setCurrentWindowTracked(bool)})

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





  if (themeIsSet === false || currentWindowTracked === null) {
      return (
          <div className="bg-[rgb(95,95,95)] w-[350px] h-[325px] flex items-center justify-center">
              <p className="text-gray-400 text-lg flex font-extrabold">
                  Loading...
              </p>
          </div>
      )
  }

  return (

      <div className="h-auto w-[350px] flex flex-col bg-white dark:bg-gray-800">


      <header className="p-5 bg-indigo-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-700 shadow-md">
          <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <img src={extensionImage192} className="h-6 w-6 object-cover object-center scale-125 rounded-md"/>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <div>
                  <h1 className="text-[15px] font-bold text-gray-800 dark:text-gray-200">Auto Window Tracker</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage browser sessions</p>
              </div>
          </div>

          <button 
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 hover:bg-indigo-100 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 border-[1px] border-gray-200/50 dark:border-gray-600/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-200"
              onClick={onOptionsPageClick}
              onMouseEnter={onShowTrackedWindowMouseEnter}
              onMouseLeave={onShowTrackedWindowMouseLeave}
              aria-label="Show tracked windows"
          >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <IconWindows className="h-5 w-5 text-gray-600 dark:text-gray-300 relative z-10 transition-transform group-hover:rotate-12 duration-300"/>
              
              {showToolTip && (
              <div className="absolute top-full mt-3 right-0 z-20 w-36 p-2 text-xs font-semibold text-center border border-gray-400 dark:border-gray-400 bg-gray-200 text-gray-600 dark:text-gray-400 dark:bg-gray-800  rounded-lg shadow-xl">
                  Show All Tracked Windows
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-200 dark:bg-gray-800 rotate-45 border-gray-400 dark:border-gray-400 border-t-[1px] border-l-[1px] "></div>
              </div>
              )}
          </button>
          </div>
      </header>




      <div className="px-6 py-3 space-y-6">
          <div className="space-y-3">
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
                  currentWindowTracked ? 'border-green-400 dark:border-green-400 bg-green-50/50 dark:bg-green-900/20' :
                  'focus:border-blue-300 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-400'}
                  ${currentWindowTracked ? 'cursor-not-allowed' : 'hover:shadow-md'}
              `}
              placeholder={currentWindowTracked ? "Window already tracked" : "Enter a name for this window..."}
              disabled={currentWindowTracked}
              value={currentWindowName ? currentWindowName : ""}
              onChange={(e) => setCurrentWindowName(e.target.value)}
              />
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
              ${currentWindowTracked 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-blue-500 hover:bg-blue-600 text-white"}
          `}
          onClick={onTrackWindowButtonClicked}
          >
          
          <span>{currentWindowTracked ? "Untrack Window" : "Track Window"}</span>
          </button>
      </div>

      <footer>

          <div className={`flex justify-center items-center flex-col
              space-x-3 text-sm font-medium transition-all duration-300 pb-2
              ${currentWindowTracked 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-500 dark:text-gray-400'}
          `}>

              <div className="w-full h-[1px] bg-gray-300/50 dark:bg-gray-700/50 my-2" />
              

              <div className="">
              <div className="relative ">
                  {currentWindowTracked && (
                  <span className="absolute inset-0 w-3 h-3 top-[5.5px] -left-[12px] rounded-full bg-green-400 animate-ping"></span>
                  )}
              </div>

                  
              <span className="p-2 py-[10px]  opacity-50">

                  {currentWindowTracked ? (
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