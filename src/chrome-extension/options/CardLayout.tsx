import noImageImage from '../public/no-image.png'
import { TrackedWindow, Tab } from "../../types"
import GroupedTabs from './GroupedTabs'
import EditableHeader from './EditableHeader'


export default function CardLayout({
  arrayOfTrackedWindowValues, onOpenSavedWindowButtonClicked, onUntrackWindowButtonClicked,
  IconExternal, IconX, determinIfDraggable, handleDragStart, handleDragEnd, handleDragOver, 
  handleDragLeave, handleDrop, isDragging, preventLinkClickIfChromeSpeicalLink, savedWindowIsOpening,
  onWindowNameChange
}: any) {
  


  


  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"> 
    
      {arrayOfTrackedWindowValues.map((trackedWindow: TrackedWindow, index: number) => (
        
        <div
          key={trackedWindow.windowName}
          draggable={determinIfDraggable()}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={(e) => handleDragEnd(e)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            ${isDragging ? "dragging" : ""} 
            backdrop-blur-lg h-auto w-full rounded-2xl px-5 sm:px-6 py-5 sm:py-6 flex flex-col justify-between gap-2
            hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl
            transition-[opacity,transform,box-shadow] ease-out duration-500 overflow-hidden 
            border border-white/20 dark:border-gray-700/30 border-l-4
            bg-white dark:bg-gray-800
            ${trackedWindow.isOpen ? "border-l-green-500 dark:border-l-green-600" : "border-l-blue-500 dark:border-l-blue-600"}
          `}
        >
        
          <div>

            <div className="flex justify-between items-center mb-2">
              <EditableHeader
                windowName={trackedWindow.windowName}
                onWindowNameChange={onWindowNameChange}
              />
              <span className={`
                flex items-center px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold
                ${trackedWindow.isOpen
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-700" 
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                }
              `}>
                {trackedWindow.isOpen ? "Active" : "Saved"}
              </span>
            </div>
            
            <div className="flex items-center  space-x-3">
              <span className="border-2 h-1 w-1 py-[4px] px-[6px] mt-[2px] rounded-lg border-gray-400" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                {trackedWindow.tabs.length === 1 ? "1 tab" : `${trackedWindow.tabs.length} tabs`}
              </p>
            </div>
            
            <div className="mt-4 mb-2">
              <GroupedTabs trackedWindow={trackedWindow} isCardsLayout={true} ></GroupedTabs>

            </div>

            
            
            <div className="flex flex-col space-y-4 mb-4 items-start">
            
              <div className="w-full">
                {trackedWindow.tabs.slice(0, 4).map((tab: Tab) => (
                  <a 
                    key={tab.id}
                    href={tab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e)=>preventLinkClickIfChromeSpeicalLink(e, tab)}
                    draggable={false}
                    className="flex hover:underline underline-offset-4 items-center mb-1 text-gray-700
                     dark:text-gray-200 rounded-md space-x-3 hover:text-blue-600 dark:hover:text-blue-400
                      py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:decoration-gray-200 w-full"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden
                     dark:border-gray-600/50">
                      <img
                        src={tab.favIconUrl || noImageImage}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = noImageImage;
                        }}
                        className="w-full h-full object-contain bg-gray-200 dark:bg-gray-700 p-[5px] rounded-xl"
                      />
                    </div>
                    <p 
                      className="truncate text-xs sm:text-sm font-medium"
                    >
                      {tab.title}
                    </p>
                  </a>
                ))}
              </div>
              
              
              {trackedWindow.tabs.length > 4 && (
                <div className="w-full overflow-y-auto bg-gray-200 dark:bg-gray-600/50 rounded-xl">

                  <div className="w-full h-full flex flex-wrap my-[2.1px] items-center gap-x-[12px] gap-y-[12px] py-2 pl-[15px]">
                    {trackedWindow.tabs.slice(4).map((tab: Tab) => (
                      <a
                        key={tab.id}
                        href={tab.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        draggable={false}
                        className="relative"
                      >
                        <div className={`w-7 h-7 rounded-lg overflow-hidden
                         border-[4px] border-transparent  
                         shadow-sm hover:scale-125 hover:shadow-md transition-transform duration-300
                         hover:border-blue-400 dark:hover:border-blue-500 dark:bg-gray-500 
                          ${tab?.url.includes("github") ? "bg-gray-500" : "bg-white dark:bg-gray-800"}
                         `}>
                          <img 
                            src={tab.favIconUrl || noImageImage}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = noImageImage;
                            }}
                            onClick={(e)=>{preventLinkClickIfChromeSpeicalLink(e,tab)}}
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      </a>
                    ))}

                  </div>
                  
                </div>
              )}
              
            </div>
            
          </div>






          <div className="flex space-x-3">
              <button 
                className="group flex items-center space-x-2 py-3 px-4 rounded-xl text-red-500
                 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all 
                 duration-300 border border-red-200/50 dark:border-red-700/50 hover:border-red-300
                  dark:hover:border-red-600 hover:shadow-md flex-1 justify-center font-medium  hover:scale-105
                  "
                  

                onClick={() => onUntrackWindowButtonClicked(trackedWindow.windowName)}
              >
                <IconX className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300 group-hover:scale-[1.2] " />
                <span className="text-sm">Untrack</span>
              </button>

              <button

                className={`group flex items-center space-x-2 py-3 px-4 rounded-xl transition-all 
                  duration-300 flex-1 justify-center font-medium hover:shadow-md border border-blue-100
                  hover:scale-105
                  ${trackedWindow.isOpen
                    ? `text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200
                     dark:border-gray-700 bg-green-50 dark:bg-gray-800/50`
                    : `text-blue-600 dark:text-blue-500 bg-indigo-50 hover:bg-blue-200 bg-blue-900/30
                     dark:hover:bg-blue-900/80 border dark:bg-blue-900/50 border-blue-200/50 
                     dark:border-blue-700/50 hover:border-blue-600 dark:hover:border-blue-600 `}`
                }

                disabled={savedWindowIsOpening  || trackedWindow.isOpen}
                onClick={() => onOpenSavedWindowButtonClicked(trackedWindow.windowName)}
              >
                <IconExternal className="h-4 w-4 group-hover:scale-[1.2] transition-transform duration-300" />
                <span className="text-sm">
                  {savedWindowIsOpening ? "Opening..." : trackedWindow.isOpen ? "Active" : "Open"}
                </span>
              </button>
            </div>

          
        </div>
        
      ))}
      
    </div>
  )
}