// @ts-nocheck

import { useState, useEffect } from "react"
import noImageImage from '../public/no-image.png';
import { TrackedWindow, Tab } from "../../types"



export default function TableLayout({  
  arrayOfTrackedWindowValues, 
  onOpenSavedWindowButtonClicked, 
  onUntrackWindowButtonClicked,
  IconExternal, 
  IconX, 
  determinIfDraggable,
  handleDragStart, 
  handleDragEnd, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop, 
  isDragging, 
  preventLinkClickIfChromeSpeicalLink,
  savedWindowIsOpening
}: any) {

  const [activeWindowIndex, setActiveWindowIndex] = useState(0)


  // Keep activeWindowIndex in bounds when array changes
  useEffect(() => {
    if (arrayOfTrackedWindowValues.length === 0) {
      setActiveWindowIndex(0)
      return
    }
    if (activeWindowIndex >= arrayOfTrackedWindowValues.length) {
      setActiveWindowIndex(arrayOfTrackedWindowValues.length - 1)
    }
  }, [arrayOfTrackedWindowValues.length])


  function handleUntrackAndUpdateIndex(windowName: string) {
    const newLength = arrayOfTrackedWindowValues.length - 1
    if (activeWindowIndex >= newLength) {
      setActiveWindowIndex(Math.max(0, newLength - 1))
    }
    onUntrackWindowButtonClicked(windowName)
  }


  function getTabCountText(count: number): string {
    if (count === 0) return "No tabs"
    if (count === 1) return "1 tab"
    return `${count} tabs`
  }


  // Handle empty state
  if (arrayOfTrackedWindowValues.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No windows to display</p>
      </div>
    )
  }


  const activeWindow = arrayOfTrackedWindowValues[activeWindowIndex]


  return (

    <div className="gap-8 flex flex-col md:flex-row p-5 md:h-[730px] 
    from-indigo-50 to-white bg-gradient-to-tr dark:from-gray-900/60 dark:to-gray-800/60
     dark:bg-gray-800/70 rounded-2xl shadow-xl">

      <div className="h-[400px] md:h-full md:w-[280px] flex-shrink-0 bg-white
      dark:bg-gray-800/80 flex flex-col backdrop-blur-sm py-5 rounded-xl shadow-md
      ">

        <div className="px-4">
          <h3 className="px-3 font-bold text-gray-600 dark:text-gray-300 text-xs uppercase mb-4 
          pb-3 border-b-2 border-gray-200 dark:border-gray-600/60">
            Windows Collection
          </h3>
        </div>

        <nav className="overflow-y-auto space-y-3 py-2 w-full custom-scrollbar">
          {arrayOfTrackedWindowValues.map((trackedWindow, index) => (
            <button
              key={trackedWindow.windowName}
              draggable={determinIfDraggable()}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={(e) => handleDragEnd(e)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => setActiveWindowIndex(index)}
              className={`
                w-[90%] mx-auto cursor-pointer p-3 md:p-4 text-left break-words rounded-xl border transition-all duration-300
                flex flex-col items-start gap-1 md:gap-2 relative overflow-hidden
                ${trackedWindow.isOpen 
                  ? 'border-l-4 border-l-green-400 bg-gradient-to-r from-green-50/60 to-white/60 dark:from-green-900/20 dark:to-gray-800/60' 
                  : 'border-l-4 border-l-blue-400 bg-gradient-to-r from-blue-50/60 to-white/60 dark:from-blue-900/20 dark:to-gray-800/60'
                }
                ${index === activeWindowIndex 
                  ? 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg transform scale-102 border-blue-300 dark:border-blue-500' 
                  : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:scale-[1.01] shadow-md'
                }
              `}
            >
              <div className="flex items-center justify-between w-full">
                <p
                  className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  title={trackedWindow.windowName}
                >
                  {trackedWindow.windowName}
                </p>
                <span
                  className={`
                    w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-all duration-300
                    ${trackedWindow.isOpen 
                      ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                      : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    }
                  `}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="border-2 h-1 w-1 py-[3px] px-[5px] mt-[2px] rounded-lg border-gray-400" />
                <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {getTabCountText(trackedWindow.tabs.length)}
                </p>
              </div>
            </button>
          ))}
        </nav>

      </div>




      <div className="shadow-xl dark:shadow-2xl h-full min-h-[500px] rounded-xl 
      flex flex-col flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
      overflow-hidden border border-gray-200/30 dark:border-gray-700/30
      from-indigo-50 to-gray-100 bg-gradient-to-bl
      ">


        <header className="px-4 md:px-8 py-4 md:py-6 flex flex-col
        md:flex-row justify-between items-center border-b-2 border-gray-300
         dark:border-gray-600/50 dark:from-gray-800/80 dark:to-gray-700/80 
         backdrop-blur-sm sticky top-0 z-10 gap-4 overflow-hidden">
          
          <div className={`flex items-center space-x-4 border-l-4 pl-4 w-full md:w-auto min-w-0 ${activeWindow.isOpen ? 'border-green-500' : 'border-blue-500'}`}>
            <div className="min-w-0 flex-1">
              <h2 
                className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1
                 break-words line-clamp-4 pr-4 md:pr-10"
                title={activeWindow.windowName}
              >
                {activeWindow.windowName}
              </h2>
              <div className="flex items-center text-xs md:text-sm space-x-3">
                <span className={`font-semibold ${activeWindow.isOpen ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {activeWindow.isOpen ? 'Active Window' : 'Saved Session'}
                </span>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {getTabCountText(activeWindow.tabs.length)}
                </span>
              </div>
            </div>
          </div>
              
          <div className="flex items-center space-x-2 md:space-x-3 w-full md:w-auto flex-shrink-0">

            <button 
              disabled={activeWindow.isOpen}
              onClick={() => onOpenSavedWindowButtonClicked(activeWindow.windowName)}
              className={`
                flex items-center space-x-2 py-2 md:py-3 px-3 md:px-5 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 md:flex-none justify-center
                ${activeWindow.isOpen 
                  ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" 
                  : "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"
                }
              `}
            >
              <IconExternal className="h-4 w-4 md:h-5 md:w-5 hover:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm whitespace-nowrap">
                {activeWindow.isOpen ? "Already Active" : "Open Session"}
              </span>
            </button>

            <button 
              onClick={() => handleUntrackAndUpdateIndex(activeWindow.windowName)}
              className="flex items-center space-x-2 py-2 md:py-3 px-3 md:px-5 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 border-2 border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 md:flex-none justify-center"
            >
              <IconX className="h-4 w-4 md:h-5 md:w-5 hover:rotate-90 transition-transform duration-300" />
              <span className="text-xs md:text-sm">Untrack</span>
            </button>

          </div>

        </header>


        <div className="overflow-y-auto p-4 flex-1" key={activeWindowIndex}>
          <div className="space-y-1">

            {activeWindow.tabs.length > 0 ? (
              activeWindow.tabs.map((tab: Tab, index: number) => (
                <a
                  key={tab.id}
                  title={tab.url}
                  href={tab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 md:p-3 rounded-xl border-2 border-gray-200 
                  dark:border-gray-700 hover:bg-gradient-to-r hover:from-white/60 hover:to-blue-50/60
                   dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300 
                   hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 bg-gray-200/20 
                   border-t-0 border-r-0 dark:bg-gray-800/40 backdrop-blur-sm"
                  style={{
                    animation: `expandHeight 0.6s ease-out ${index * 0.05}s forwards`,
                    opacity: 0,
                    maxHeight: 0,
                  }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 mr-3 md:mr-4 p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <img 
                      src={tab.favIconUrl || noImageImage}
                      className="w-full h-full object-contain rounded-xl" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = noImageImage;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base md:text-lg mb-1 text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 truncate transition-colors duration-300">
                      {tab.title || "Untitled Tab"}
                    </p>
                    <p className="text-[10px] md:text-sm truncate text-gray-500 dark:text-gray-400 font-medium">
                      {tab.url}
                    </p>
                  </div>
                  
                  <div className="ml-2 md:ml-3 opacity-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 hidden md:block">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
                      <IconExternal className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center px-4">
                <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-4 md:p-6 mb-4 md:mb-6 shadow-inner">
                  <svg className="h-10 w-10 md:h-12 md:w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                  No Tabs Available
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                  This window session doesn't contain any saved tabs yet.
                </p>
              </div>
            )}

          </div>
        </div>


      </div>

    </div>
  )

}