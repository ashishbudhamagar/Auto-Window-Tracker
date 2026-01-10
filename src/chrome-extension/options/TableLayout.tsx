import { useState, useEffect } from "react"
import noImageImage from '../public/no-image.png'
import { TrackedWindow, Tab } from "../../types"
import GroupedTabs from "./GroupedTabs"
import EditableHeader from "./EditableHeader"


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
  savedWindowIsOpening,
  onWindowNameChange,
  tabGroupsHiddenForTable,
  coloredTabGroups
}: any) {

  const [activeWindowIndex, setActiveWindowIndex] = useState<number>(0)
  const activeWindow: TrackedWindow = arrayOfTrackedWindowValues[activeWindowIndex]

  useEffect(() => {
    if (activeWindowIndex >= arrayOfTrackedWindowValues.length) {
      if (arrayOfTrackedWindowValues.length -1 > 0) {
        setActiveWindowIndex(arrayOfTrackedWindowValues.length - 1)
      }
    }
  }, [arrayOfTrackedWindowValues.length])


  function getTabCountText(count: number): string {
    if (count === 1) return "1 tab"
    return `${count} tabs`
  }






  return (

    <div className="gap-8 flex flex-col md:flex-row p-5 md:h-[730px] 
    from-indigo-50 to-white bg-gradient-to-tr dark:from-gray-900/60 dark:to-gray-800/60
     dark:bg-gray-800/70 rounded-2xl shadow-xl">

      <div className="h-[400px] md:h-[500px] md:w-[280px] flex-shrink-0 bg-white
      dark:bg-gray-700/40 flex flex-col backdrop-blur-sm pt-5 pb-3 rounded-xl shadow-md
      ">

        <div className="px-6">
          <h3 className="px-3 font-bold text-gray-600 dark:text-gray-300 text-xs uppercase mb-4 
          pb-3 border-b-2 border-gray-200 dark:border-gray-600/60">
            Windows Collection
          </h3>
        </div>

        <div className="overflow-y-auto space-y-3 py-2 w-full custom-scrollbar">
          {arrayOfTrackedWindowValues.map((trackedWindow: TrackedWindow, index: number) => (
            <button
              key={trackedWindow.windowName}
              title={trackedWindow.windowName}
              draggable={determinIfDraggable()}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={(e) => handleDragEnd(e)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => setActiveWindowIndex(index)}
              className={`
                ${isDragging ? "dragging" : ""} 
                w-[95%] md:w-[85%] mx-auto cursor-pointer p-4 text-left break-words rounded-xl transition-all duration-300
                flex flex-col items-start gap-1 md:gap-2 relative overflow-hidden shadow-md border-l-4  
                ${trackedWindow.isOpen
                  ? "border-green-400 dark:border-green-700/70 "
                  : "border-blue-400 dark:border-blue-700/70"
                }
                ${index === activeWindowIndex ? "scale-[1.02] md:scale-105 bg-gray-300/40 dark:bg-gray-700/90 border-b-4" : " hover:bg-gray-200 dark:hover:bg-gray-700/70 bg-white/60 dark:bg-gray-800/10"}
              `}
            >
              <div className="flex items-center justify-between w-full">
                <p
                  className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 
                  truncate w-[90%]"
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
                <span className="border-2 h-1 w-1 py-[3px] px-[5px] mt-[2px] rounded-lg border-gray-400 dark:border-gray-500" />
                <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {getTabCountText(trackedWindow.tabs.length)}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>




      <div className="shadow-xl h-full min-h-[500px] rounded-xl 
      flex flex-col flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
      overflow-hidden
      
      border border-gray-200/30 dark:border-gray-700/30
      from-indigo-100/60 to-gray-100 via-gray-100/50 bg-gradient-to-bl
      dark:from-gray-800/60 dark:to-gray-900/60 dark:via-gray-800/50
      
      ">



        <div className="px-4 py-6 flex flex-col
        md:flex-row justify-between items-center border-b-2 border-gray-300
         dark:border-gray-600/50 dark:bg-gray-700/80
         backdrop-blur-sm sticky gap-4 overflow-hidden min-h-[80px]
         mb-4
         ">
          
          <div className={`flex items-center space-x-4 border-l-4 pl-4 w-full md:w-auto min-w-0 ${activeWindow.isOpen ? 'border-green-500' : 'border-blue-500'}`}>
            <div className="min-w-0 flex-1">

              <EditableHeader windowName={activeWindow.windowName} onWindowNameChange={onWindowNameChange}/>
              
              <div className="flex items-center text-xs md:text-sm space-x-3">
                <span className={`font-semibold ${activeWindow.isOpen ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {activeWindow.isOpen ? 'Active Window' : 'Saved Window'}
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
              onClick={() => onUntrackWindowButtonClicked(activeWindow.windowName)}
              className="flex items-center space-x-2 py-2 md:py-3 px-3 md:px-5 rounded-xl
               text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
               transition-all duration-300 border-2 border-red-200 dark:border-red-700/50 
               hover:border-red-300 dark:hover:border-red-600 font-semibold  hover:shadow-md
                transform hover:scale-105 flex-1 md:flex-none justify-center group"
            >
              <IconX className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-xs md:text-sm">Untrack</span>
            </button>

            <button
              disabled={savedWindowIsOpening || activeWindow.isOpen}
              onClick={() => onOpenSavedWindowButtonClicked(activeWindow.windowName)}
              className={`
                flex items-center space-x-2 py-2 md:py-3 px-3 md:px-5 rounded-xl 
                transition-all duration-300 font-semibold  hover:shadow-md
                transform hover:scale-105 flex-1 md:flex-none justify-center group
                ${activeWindow.isOpen
                  ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border-2 border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-gray-800" 
                  : "text-blue-600 dark:text-blue-400 bg-indigo-100 dark:bg-blue-900/30 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 border-2 border-blue-200 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600"
                }
              `}
            >
              <IconExternal className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm whitespace-nowrap">
                {savedWindowIsOpening ? "Opening..." : activeWindow.isOpen ? "Already Active" : "Open Window"}

              </span>
            </button>
          </div>

        </div>
        
        
        <div className="mb-4">
          <GroupedTabs trackedWindow={activeWindow} isCardsLayout={false} tabGroupsHidden={tabGroupsHiddenForTable} coloredTabGroups={coloredTabGroups} />
        </div>
       


        <div className="flex-1 overflow-y-auto space-y-1 px-4 mb-4 " key={activeWindowIndex}>

          {activeWindow.tabs.map((tab: Tab, index: number) => (
              <a
                key={tab.id}
                title={tab.url}
                href={tab.url}
                target="_blank"
                onClick={preventLinkClickIfChromeSpeicalLink}
                rel="noopener noreferrer"
                className="flex items-center p-2 md:p-3 rounded-xl border-2 border-gray-200 
                dark:border-gray-700 group
                  dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300
                  hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 bg-gray-200/20 
                  border-t-0 border-r-0 dark:bg-gray-800/40 backdrop-blur-sm
                  
                  "
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
                  <p className="font-semibold text-base md:text-lg mb-1 text-gray-700 dark:text-gray-100 truncate transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tab.title}
                  </p>
                  <p className="group-hover:underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400
                  text-[10px] md:text-sm truncate text-gray-500 dark:text-gray-400 font-medium">
                    {tab.url}
                  </p>
                </div>
              </a>
            ))}

        </div>



      </div>

    </div>
  )

}