


export default function CardLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
 ) {



   return (

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">

      {

        arrayOfTrackedWindowValues.map((window : any, index: number)=>(


          <div className={`group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg h-auto w-full rounded-2xl px-6 py-6 flex flex-col justify-between gap-5
            hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl
            transition-all duration-500 overflow-hidden border border-white/20 dark:border-gray-700/30
            ${window.isOpen ? "border-l-4 border-l-green-500 dark:border-l-green-400 bg-gradient-to-br from-green-50/50 to-white/70 dark:from-green-900/20 dark:to-gray-800/70" : "border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-gradient-to-br from-blue-50/50 to-white/70 dark:from-blue-900/20 dark:to-gray-800/70"}
          `} key={index}>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate max-w-[8rem] sm:max-w-[24rem] md:max-w-[20rem] lg:max-w-[16rem] xl:max-w-[12rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                  title={window.windowName}
                >
                  {window.windowName}
                </h2>
                <div className={`flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm
                  ${window.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-700" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"}
                `}>
                  <span className={`w-2.5 h-2.5 rounded-full mr-2 animate-pulse ${window.isOpen ? "bg-green-500" : "bg-blue-500"}`}></span>
                  {window.isOpen ? "Active" : "Saved"}
                </div>
              </div>

              <div className="flex items-center mb-5 space-x-3">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 shadow-inner">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {window.tabs.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{
                    window.tabs.length === 0 ? "No tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
                  }</p>
              </div>
            
              <div className="flex flex-col space-y-3 mb-4">
                {
                    // @ts-ignore
                    window.tabs.slice(0,4).map((tab, index)=>(
                      <a 
                          href={tab.url} 
                          className="group flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all duration-300 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-600/50 hover:shadow-sm" 
                          target="_blank" 
                          key={index}
                          rel="noopener noreferrer"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-white dark:bg-gray-700 rounded-md overflow-hidden shadow-sm border border-gray-200/50 dark:border-gray-600/50">
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
                          <p className="truncate text-sm text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                            {tab.title}
                          </p>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </a>
                    ))
                  }

                  {/* Additional tabs as icons */}
                  {window.tabs.length > 4 && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 pb-2 px-3 bg-gray-50/80 dark:bg-gray-700/40 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-600/30">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-2">More tabs:</span>
                      {window.tabs.slice(4, 12).map((tab: any, idx: number) => (
                        <a 
                          href={tab.url} 
                          target="_blank" 
                          key={idx}
                          rel="noopener noreferrer"
                          className="group relative"
                          title={tab.title}
                        >
                          <div className="w-7 h-7 rounded-lg overflow-hidden border-2 border-white dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                            hover:scale-125 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500">
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
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-2 px-2 py-1 bg-white/60 dark:bg-gray-600/60 rounded-md">
                          +{window.tabs.length - 12} more
                        </span>
                      )}
                    </div>
                  )}
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-600/50 space-x-3">
              <button 
                className="group flex items-center space-x-2 py-3 px-4 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 border border-red-200/50 dark:border-red-700/50 hover:border-red-300 dark:hover:border-red-600 hover:shadow-sm flex-1 justify-center font-medium"
                onClick={() => onUntrackWindowClick(window.windowName)}
                title="Remove this window from tracking"
              >
                <IconX className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm">Untrack</span>
              </button>

              <button 
                className={`group flex items-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 flex-1 justify-center font-medium
                  ${window.isOpen 
                    ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50" 
                    : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm"}`
                }
                disabled={window.isOpen}
                onClick={() => onOpenSavedWindowClick(window.isOpen, window.windowName)}
                title={window.isOpen ? "Window is already open" : "Open saved window"}
              >
                <IconExternal className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">
                  {window.isOpen ? "Active" : "Open"}
                </span>
              </button>
            </div>

          </div>

        ))
      }



</div>
   )
}