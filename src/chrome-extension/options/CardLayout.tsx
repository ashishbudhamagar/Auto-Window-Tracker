


export default function CardLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
 ) {



   return (

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">

      {

        arrayOfTrackedWindowValues.map((window : any, index: number)=>(


          <div className={`bg-white dark:bg-gray-800 h-auto w-full rounded-xl px-5 py-5 flex flex-col justify-between gap-4
            hover:-translate-y-1 shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl
            transition-all duration-300 overflow-hidden
            ${window.isOpen ? "border-l-4 border-green-500 dark:border-green-400" : "border-l-4 border-blue-500 dark:border-blue-400"}
          `} key={index}>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h2
                  className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[8rem] sm:max-w-[24rem] md:max-w-[20rem] lg:max-w-[16rem] xl:max-w-[12rem]"
                  title={window.windowName}
                >
                  {window.windowName}
                </h2>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${window.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}
                `}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${window.isOpen ? "bg-green-500" : "bg-blue-500"}`}></span>
                  {window.isOpen ? "Open" : "Saved"}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 mr-2">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {window.tabs.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{
                    window.tabs.length === 0 ? "No tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
                  }</p>
              </div>
            
              <div className="flex flex-col space-y-2 mb-3">
                {
                    // @ts-ignore
                    window.tabs.slice(0,4).map((tab, index)=>(
                      <a 
                          href={tab.url} 
                          className="group flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors" 
                          target="_blank" 
                          key={index}
                          rel="noopener noreferrer"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-white dark:bg-gray-700 rounded overflow-hidden">
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
                          <p className="truncate text-sm text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tab.title}
                          </p>
                        </a>
                    ))
                  }

                  {/* Additional tabs as icons */}
                  {window.tabs.length > 4 && (
                    <div className="flex flex-wrap items-center gap-1 pt-2 pb-1 px-2 bg-gray-50 dark:bg-gray-700/30 rounded-md">
                      {window.tabs.slice(4, 12).map((tab: any, idx: number) => (
                        <a 
                          href={tab.url} 
                          target="_blank" 
                          key={idx}
                          rel="noopener noreferrer"
                          className="group relative"
                          title={tab.title}
                        >
                          <div className="w-6 h-6 rounded overflow-hidden border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700
                            hover:scale-125 transition-transform">
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
                        </a>
                      ))}
                      
                      {window.tabs.length > 12 && (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
                          +{window.tabs.length - 12} more
                        </span>
                      )}
                    </div>
                  )}
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
              <button 
                className="flex items-center space-x-1 py-2 px-3 rounded-md text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                onClick={() => onUntrackWindowClick(window.windowName)}
                title="Remove this window from tracking"
              >
                <IconX className="h-4 w-4" />
                <span className="text-sm font-medium">Untrack</span>
              </button>

              <button 
                className={`flex items-center space-x-1 py-2 px-3 rounded-md transition-colors
                  ${window.isOpen 
                    ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" 
                    : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"}`
                }
                disabled={window.isOpen}
                onClick={() => onOpenSavedWindowClick(window.isOpen, window.windowName)}
                title={window.isOpen ? "Window is already open" : "Open saved window"}
              >
                <IconExternal className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {window.isOpen ? "Already Open" : "Open Window"}
                </span>
              </button>
            </div>

          </div>

        ))
      }



</div>
   )
}