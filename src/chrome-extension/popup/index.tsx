import { useState, useEffect, useRef } from "react"
import { ExtensionData, Theme } from "../../types"
import { IconWindows } from "../../icons"
import extensionImage192 from "../public/192.png"
import "../global.css" 

 
export const Popup = () => {
  
  const [currentWindowTracked, setCurrentWindowTracked] = useState<boolean | null>(null)
  const [currentWindowName, setCurrentWindowName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [themeIsSet, setThemeIsSet] = useState<boolean>(false)
  const [showToolTip, setShowToolTip] = useState<boolean>(false)

  const tooltipRef = useRef<ReturnType<typeof setTimeout> | null>(null)


  useEffect(()=>{
    chrome.runtime.sendMessage({signal: "getExtensionData"}, (response: ExtensionData) =>{
      if (!response) return

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

          if (trackedWindow.windowId === currentWindow.id && trackedWindow.isOpen) {
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


  useEffect(() => {
    return () => {
      if (tooltipRef.current) {
        clearTimeout(tooltipRef.current)
      }
    }
  }, [])


  function onTrackWindowButtonClicked() {

    if (currentWindowName === null) return
    
    chrome.runtime.sendMessage({signal: "getExtensionData"}, (response: ExtensionData)=>{

      if (currentWindowTracked === false) {
        if (currentWindowName.trim() === "") {
          setError("Name the window")
          return null
        }

        for (let trackedWindow of Object.values(response.trackedWindows)) {
          if (trackedWindow.windowName === currentWindowName.trim()) {
            setError("Window with the name already exists")
            return null
          }
        }
      }

      setError(null)

      chrome.windows.getCurrent((currentWindow)=>{

        if (currentWindowTracked === false) {

          chrome.runtime.sendMessage({
            signal: "trackWindow",
            currentWindowId: currentWindow.id,
            windowName: currentWindowName.trim()
          }, (windowTracked: boolean)=>{
            setCurrentWindowTracked(windowTracked)
          })
        }
        else {
          
          chrome.runtime.sendMessage({
            signal: "untrackWindowFromPopup",
            windowName: currentWindowName.trim()
          }, (windowTracked: boolean)=>{
            setCurrentWindowTracked(windowTracked)
          })
        }



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
      tooltipRef.current = null
      setShowToolTip(false)
    }
  }

  function onOptionsPageClick() {
      const optionsUrl = chrome.runtime.getURL('options.html')
      chrome.tabs.create({url:optionsUrl})
  }



  if (themeIsSet === false || currentWindowTracked === null || currentWindowName === null) {
      return (
          <div className="bg-[rgb(95,95,95)] w-[350px] h-[325px] flex items-center justify-center">
              <p className="text-gray-400 text-lg font-extrabold">
                  Loading...
              </p>
          </div>
      )
  }


  return (

    <div className="h-auto w-[350px] flex flex-col bg-white dark:bg-gray-800">


      <header className="p-5 bg-indigo-50 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-700 shadow-md">
          <div className="flex justify-between items-center">

          <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <img 
                    src={extensionImage192} 
                    alt="Auto Window Tracker"
                    className="h-6 w-6 object-cover object-center scale-125 rounded-md"
                  />
              </div>
              <div>
                  <h1 className="text-[15px] font-bold text-gray-800 dark:text-gray-200">
                    Auto Window Tracker
                  </h1>
                  <p className="text-[10px] tracking-tighter text-gray-500 dark:text-gray-400 font-medium">
                    Manage and organize windows
                  </p>
              </div>
          </div>

          <div className="relative">
            <button 
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/50 hover:bg-indigo-100 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 border border-gray-200/50 dark:border-gray-600/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-200"
                onClick={onOptionsPageClick}
                onMouseEnter={onShowTrackedWindowMouseEnter}
                onMouseLeave={onShowTrackedWindowMouseLeave}
            >
                <IconWindows className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform hover:rotate-12 duration-300"/>
            </button>
            
            {showToolTip && (
            <div 
              className="absolute top-full mt-3 right-0 w-36 p-2 text-xs font-semibold text-center border border-gray-400 bg-gray-200 text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-400 rounded-lg shadow-xl"
            >
                Show All Tracked Windows
                <span className="absolute -top-1 right-4 w-2 h-2 bg-gray-200 dark:bg-gray-800 rotate-45 border-t border-l border-gray-400 dark:border-gray-400" />
            </div>
            )}
          </div>

          </div>
      </header>




      <main className="px-6 py-3 space-y-6"> 

          <div className="space-y-2">
            <div  
              className="block pt-4 text-base font-bold text-gray-600/85 dark:text-gray-300"
            >
              Window Name
            </div>
            
            <input 
              type="text" 
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              disabled={currentWindowTracked}
              value={currentWindowName}
              onChange={(e) => {
                setCurrentWindowName(e.target.value)
                if (error) setError(null)
              }}
              placeholder={currentWindowTracked ? "Window already tracked" : "Enter a name for this window..."}
              className={`
                  w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium
                  bg-gray-200 dark:bg-gray-700/80 backdrop-blur-sm
                  text-gray-800 dark:text-gray-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm focus:shadow-lg
                  border border-gray-200/50 dark:border-gray-600/50
                  ${error 
                    ? 'border-red-400 dark:border-red-400 focus:ring-red-300 bg-red-50/50 dark:bg-red-900/20' 
                    : currentWindowTracked 
                      ? 'border-green-400 dark:border-green-400 bg-green-50/50 dark:bg-green-900/20 cursor-not-allowed' 
                      : 'focus:border-blue-300 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-400 hover:shadow-md'
                  }
              `}
            />
            
            {error && (
                <div 
                  id="window-name-error"
                  className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <span className="w-1 h-6 bg-red-500 rounded-full"/>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                </div>
            )}
          </div>
          
          <button 
            type="button"
            onClick={onTrackWindowButtonClicked}
            className={`
                w-full py-3 px-6 rounded-lg font-semibold text-sm
                flex items-center justify-center
                transition-all duration-300 transform active:translate-y-1
                focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-lg hover:shadow-xl
                ${currentWindowTracked 
                  ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300" 
                  : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300"
                }
            `}
          >
            {currentWindowTracked ? "Untrack Window" : "Track Window"}
          </button>

      </main>


      <footer className="pb-2">

          <div className="w-full h-px bg-gray-300/50 dark:bg-gray-700/50 my-2" />
          
          <div className="flex justify-center items-center">

              {currentWindowTracked && (
                <span 
                  className="relative flex h-3 w-3 mr-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300" />
                </span>
              )}

              
              <span className={`
                text-xs font-medium opacity-50
                ${currentWindowTracked 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {currentWindowTracked ? "Auto tracking window" : "Window not tracked"}
              </span>

          </div>

      </footer>


    </div>
  )
}