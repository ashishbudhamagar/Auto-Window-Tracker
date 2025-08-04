import { useState } from "react"





export default function VerticalLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
) {
   const [activeWindow, setActiveWindow] = useState(0)

   return (
      <div className="gap-6 flex flex-col md:flex-row min-h-[650px] p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg" >

         <div className="bg-white dark:bg-gray-800 h-auto md:h-[500px] p-4 rounded-xl shadow-lg dark:shadow-xl w-full md:w-72 mb-6 md:mb-0">
            <h3 className="font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide mb-3 px-2">Windows List</h3>
            <div className="overflow-y-auto max-h-[calc(100%-2rem)] pr-1 flex flex-col space-y-2">
               {
                  // @ts-ignore
                  arrayOfTrackedWindowValues.map((window, index) => (
                     <button 
                        key={index} 
                        className={`w-full hover:cursor-pointer p-3 text-left
                          break-words rounded-lg border-l-4 border-b-0 sm:border-b-0
                          flex flex-col items-start gap-1
                          ${window.isOpen ? 'border-l-green-400' : 'border-l-blue-400'}
                          ${index === activeWindow 
                            ? 'bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                          transition-all duration-200 relative
                        `}
                        onClick={() => setActiveWindow(index)}
                     >
                        {index === activeWindow && (
                          <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 dark:bg-blue-400"></div>
                        )}
                        
                        <div className="flex items-center justify-between w-full">
                          <p className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-[180px]" title={window.windowName}>{window.windowName}</p>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0
                            ${window.isOpen ? 'bg-green-500' : 'bg-blue-500'}`}
                          ></div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-700 mr-2">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                              {window.tabs.length}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {window.tabs.length === 0 ? "No tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`}
                          </p>
                        </div>
                        
                     </button>
                  ))
               }

            </div>
         </div>



         <div className="shadow-lg dark:shadow-xl h-full rounded-xl flex flex-col 
            flex-grow bg-white dark:bg-gray-800 overflow-hidden
         ">

            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center
                  ${arrayOfTrackedWindowValues[activeWindow].isOpen 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`
                }>
                  <span className="text-lg font-bold">
                    {arrayOfTrackedWindowValues[activeWindow].windowName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {arrayOfTrackedWindowValues[activeWindow].windowName}
                  </h2>
                  <div className="flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full mr-2
                      ${arrayOfTrackedWindowValues[activeWindow].isOpen ? 'bg-green-500' : 'bg-blue-500'}`
                    }></span>
                    <span className={`font-medium
                      ${arrayOfTrackedWindowValues[activeWindow].isOpen 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-blue-600 dark:text-blue-400'}`
                    }>
                      {arrayOfTrackedWindowValues[activeWindow].isOpen ? 'Open' : 'Saved'}
                    </span>
                    <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {arrayOfTrackedWindowValues[activeWindow].tabs.length === 0 
                        ? "No tabs" 
                        : arrayOfTrackedWindowValues[activeWindow].tabs.length === 1 
                          ? '1 tab' 
                          : `${arrayOfTrackedWindowValues[activeWindow].tabs.length} tabs`
                      }
                    </span>
                  </div>
                </div>
              </div>
                  
              <div className="flex items-center space-x-2">
                <button 
                  className={`flex items-center space-x-1 py-2 px-3 rounded-md transition-colors
                    ${arrayOfTrackedWindowValues[activeWindow].isOpen 
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700" 
                      : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40"}`
                  }
                  disabled={arrayOfTrackedWindowValues[activeWindow].isOpen}
                  onClick={() => onOpenSavedWindowClick(arrayOfTrackedWindowValues[activeWindow].isOpen, arrayOfTrackedWindowValues[activeWindow].windowName)}
                  title={arrayOfTrackedWindowValues[activeWindow].isOpen ? "Window is already open" : "Open saved window"}
                >
                  <IconExternal className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {arrayOfTrackedWindowValues[activeWindow].isOpen ? "Already Open" : "Open Window"}
                  </span>
                </button>

                <button 
                  className="flex items-center space-x-1 py-2 px-3 rounded-md text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  onClick={() => onUntrackWindowClick(arrayOfTrackedWindowValues[activeWindow].windowName)}
                  title="Remove this window from tracking"
                >
                  <IconX className="h-4 w-4" />
                  <span className="text-sm font-medium">Untrack</span>
                </button>
              </div>
            </div>





            <div className="overflow-y-auto flex-1 px-4 py-3" key={activeWindow}>
              <div className="space-y-3">
                {arrayOfTrackedWindowValues[activeWindow].tabs.length > 0 ? (
                  // @ts-ignore
                  arrayOfTrackedWindowValues[activeWindow].tabs.map((tab, index) => (
                    <a 
                      href={tab.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                      style={{
                        animation: `expandHeight 0.5s ease-out ${index * 0.05}s forwards`,
                        opacity: 0,
                        maxHeight: 0,
                      }}
                      key={index}
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 mr-3 p-1">
                        <img 
                          src={tab.favIconUrl} 
                          alt=""
                          className="w-full h-full object-contain" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "../icons/no-image.jpg";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-base mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 truncate">
                          {tab.title || "Untitled Tab"}
                        </p>
                        <p className="text-sm truncate text-gray-500 dark:text-gray-400">
                          {tab.url}
                        </p>
                      </div>
                      
                      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconExternal className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 mb-4">
                      <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-base font-medium text-gray-600 dark:text-gray-300 mb-1">No tabs in this window</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">This window doesn't have any saved tabs.</p>
                  </div>
                )}
              </div>
            </div>




         </div>    
      </div>
   )
}