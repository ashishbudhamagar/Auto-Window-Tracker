// @ts-nocheck
import { useEffect, useState } from "react"
import noImageImage from '../public/no-image.png';




export default function TableLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
) {
   const [activeWindow, setActiveWindow] = useState(0)


   useEffect(() => {
    console.log("Array of tracked windows updated:", arrayOfTrackedWindowValues.length, activeWindow);

      if (arrayOfTrackedWindowValues.length > 0 && activeWindow >= arrayOfTrackedWindowValues.length) {
         setActiveWindow(0);
         console.log("Resetting active window to 0 due to index out of bounds");
      }
   }, [arrayOfTrackedWindowValues]);

   if (activeWindow > arrayOfTrackedWindowValues.length - 1) {
      console.warn("Active window index is out of bounds, resetting to 0");
      setActiveWindow((prev) => prev - 1 < 0 ? 0 : prev - 1);
      return null
   }

   return (
      <div className="gap-8 flex flex-col md:flex-row h-[1200px] lg:h-[700px] p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30" >

        <div className="h-[400px]   md:w-[260px] flex-grow-0 flex-shrink-0 lg:h-[550px] bg-white/80 dark:bg-gray-800/80 flex flex-col  backdrop-blur-sm  py-5 rounded-xl shadow-lg dark:shadow-xl  mb-6 lg:mb-0 border border-gray-200/30 dark:border-gray-700/30">

          <div className="px-6 ">
            <h3 className="px-3 font-bold text-gray-600 dark:text-gray-300 text-sm uppercase mb-5 pb-3 border-b-2 border-gray-200/50 dark:border-gray-600/50">Windows Collection</h3>
          </div>


            <div className="overflow-y-auto space-y-3 py-2 w-full">

                {
                  arrayOfTrackedWindowValues.map((window, index) => (
                      <button 
                        key={index} 
                        className={`group w-[85%] mx-auto hover:cursor-pointer p-4 text-left
                          break-words rounded-xl border transition-all duration-300
                          flex flex-col items-start gap-2 relative overflow-hidden
                          ${window.isOpen ? 'border-l-4 border-l-green-400 bg-gradient-to-r from-green-50/60 to-white/60 dark:from-green-900/20 dark:to-gray-800/60' : 'border-l-4 border-l-blue-400 bg-gradient-to-r from-blue-50/60 to-white/60 dark:from-blue-900/20 dark:to-gray-800/60'}
                          ${index === activeWindow 
                            ? 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg transform scale-105 border-blue-300 dark:border-blue-500' 
                            : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 hover:scale-102 hover:shadow-md'}
                        `}
                        onClick={() => setActiveWindow(index)}
                      >
              
                        
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={window.windowName}>{window.windowName}</p>
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300
                            ${window.isOpen ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' : 'bg-blue-500 shadow-lg shadow-blue-500/50'}`}
                          ></div>
                        </div>
                        
                        <div className="flex items-center space-x-2">

                          <div className="border-2 h-1 w-1 py-[3px] px-[5px] mt-[2px] rounded-lg border-gray-400"></div>
                      
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {window.tabs.length === 0 ? "No tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`}
                          </p>
                        </div>
                        
                        
                      </button>
                  ))
                }

            </div>

        </div>




        <div className="shadow-xl dark:shadow-2xl h-full rounded-xl flex flex-col 
            flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden border border-gray-200/30 dark:border-gray-700/30
         ">

            <div className="px-8 py-6 flex justify-between items-center border-b border-gray-200/50 dark:border-gray-600/50 bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm sticky top-0 z-10">
              <div className={`flex items-center space-x-4 border-l-4 pl-4 ${
                arrayOfTrackedWindowValues[activeWindow].isOpen ? 'border-green-500' : 'border-blue-500'
              }`}>
              
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 break-all pr-10">
                    {arrayOfTrackedWindowValues[activeWindow].windowName}
                  </h2>
                  <div className="flex items-center text-sm space-x-3">
                    <div className="flex items-center">
                   
                      <span className={`font-semibold
                        ${arrayOfTrackedWindowValues[activeWindow].isOpen 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-blue-600 dark:text-blue-400'}`
                      }>
                        {arrayOfTrackedWindowValues[activeWindow].isOpen ? 'Active Window' : 'Saved Session'}
                      </span>
                    </div>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
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
                  
              <div className="flex items-center space-x-3">
                <button 
                  className={`group flex items-center space-x-2 py-3 px-5 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
                    ${arrayOfTrackedWindowValues[activeWindow].isOpen 
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" 
                      : "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"}`
                  }
                  disabled={arrayOfTrackedWindowValues[activeWindow].isOpen}
                  onClick={() => onOpenSavedWindowClick(arrayOfTrackedWindowValues[activeWindow].windowName)}
                  title={arrayOfTrackedWindowValues[activeWindow].isOpen ? "Window is already open" : "Open saved window"}
                >
                  <IconExternal className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">
                    {arrayOfTrackedWindowValues[activeWindow].isOpen ? "Already Active" : "Open Session"}
                  </span>
                </button>

                <button 
                  className="group flex items-center space-x-2 py-3 px-5 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 border-2 border-red-200 dark:border-red-700 hover:border-red-300 dark:hover:border-red-600 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => onUntrackWindowClick(arrayOfTrackedWindowValues[activeWindow].windowName)}
                  title="Remove this window from tracking"
                >
                  <IconX className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-sm">Untrack</span>
                </button>
              </div>
            </div>





            <div className="overflow-y-auto flex-1 px-6 py-10" key={activeWindow}>
              <div className="space-y-2 ">
                {arrayOfTrackedWindowValues[activeWindow].tabs.length > 0 ? (
                  // @ts-ignore
                  arrayOfTrackedWindowValues[activeWindow].tabs.map((tab, index) => (
                    <a 
                      href={tab.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-white/60 hover:to-blue-50/60 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 bg-gray-200/20 border-t-0 border-r-0 dark:bg-gray-800/40 backdrop-blur-sm "
                      style={{
                        animation: `expandHeight 0.6s ease-out ${index * 0.05}s forwards`,
                        opacity: 0,
                        maxHeight: 0,
                      }}
                      key={index}
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 mr-4 p-2 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img 
                          src={tab.favIconUrl} 
                          alt=""
                          className="w-full h-full object-contain" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = noImageImage;
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 truncate transition-colors duration-300">
                          {tab.title || "Untitled Tab"}
                        </p>
                        <p className="text-sm truncate text-gray-500 dark:text-gray-400 font-medium">
                          {tab.url}
                        </p>
                      </div>
                      
                      <div className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
                          <IconExternal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6 mb-6 shadow-inner">
                      <svg className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Tabs Available</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">This window session doesn't contain any saved tabs yet.</p>
                  </div>
                )}
              </div>
            </div>




         </div>    
      </div>
   )
}