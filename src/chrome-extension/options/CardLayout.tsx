//@ts-nocheck
import { useState } from 'react';
import noImageImage from '../public/no-image.png';
import {TrackedWindow} from "../../types"


export default function CardLayout(
  {  
    // @ts-ignore
    arrayOfTrackedWindowValues, onOpenSavedWindowButtonClicked, onUntrackWindowButtonClicked,
    IconExternal, IconX, currentSort, determinIfDraggable,
    handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop, isDragging, setIsDragging
    
  }
) {
  
  console.log("tracked windows", arrayOfTrackedWindowValues)
  
  
  
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
    
    {
      
      arrayOfTrackedWindowValues.map((window : TrackedWindow, index: number)=>(
        
        <div
        draggable={determinIfDraggable()}
        
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e, index)}
        
        className={`${isDragging ? "dragging" : ""} group  backdrop-blur-lg h-auto w-full rounded-2xl px-6 py-6 flex flex-col justify-between gap-2
            hover:-translate-y-2 shadow-lg hover:shadow-2xl dark:shadow-xl dark:hover:shadow-2xl
            transition-[opacity,transform, shadow] ease-out duration-500 overflow-hidden border border-white/20 dark:border-gray-700/30 border-l-4
            bg-white dark:bg-gray-800
            ${window.isOpen ? " border-l-green-500 dark:border-l-green-600" : " border-l-blue-500 dark:border-l-blue-600"}
          `} key={index}>
        
        <div>
        <div className="flex justify-between items-center mb-2">
        <h2
        className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate w-auto min-w-24 max-w-56"
        title={window.windowName}
        >
        {window.windowName}
        </h2>
        <div className={`flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm
                  ${window.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-700" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"}
                `}>
          {window.isOpen ? "Active" : "Saved"}
          </div>
          </div>
          
          <div className="flex items-center mb-5 space-x-3">
          
          <div className="border-2 h-1 w-1 py-[4px] px-[6px] mt-[2px] rounded-lg border-gray-400"></div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{
            window.tabs.length === 0 ? "No tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
          }</p>
          </div>
          
          <div className="flex flex-col space-y-4 mb-4 items-start">
          
          <div className='w-full'>
          {
            // @ts-ignore
            window.tabs.slice(0,4).map((tab, index)=>(
              <a 
              href={tab.url} 
              className="flex hover:underline underline-offset-4 items-center  mb-1 text-gray-700 dark:text-gray-200
                              rounded-md space-x-3 hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2 hover:bg-gray-200
                              dark:hover:bg-gray-700 dark:decoration-gray-200 w-full
                            " 
              target="_blank"
              key={index}
              rel="noopener noreferrer"
              draggable={false}
              onDragStart={(e) => e.stopPropagation()}
              >
              <div className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden  dark:border-gray-600/50">
              <img 
              src={tab.favIconUrl} 
              className="w-full h-full object-contain bg-gray-200 dark:bg-gray-700 p-[5px] rounded-xl"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noImageImage;
              }}
              />
              </div>
              <p className="truncate text-sm   transition-colors font-medium"
              title={tab.title}
              >
              {tab.title}
              
              </p>
              
              </a>
            ))
          }
          
          </div>
          
          
          <div className='w-full max-h-[5.2rem] overflow-y-auto bg-gray-200 dark:bg-gray-600/50 rounded-xl'>
          {window.tabs.length > 4 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-[10px] py-2 px-[8px] w-full  border border-gray-200/30 dark:border-gray-600/30
                      ">
            {window.tabs.slice(4).map((tab: any, index: number) => (
              <a 
              href={tab.url} 
              target="_blank" 
              key={index}
              rel="noopener noreferrer"
              className="relative"
              title={tab.title}
              draggable={false}
              onDragStart={(e) => e.stopPropagation()}
              >
              <div className="w-7 h-7 rounded-lg overflow-hidden border-2 border-white dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm
                              hover:scale-125 hover:shadow-lg transition-transform duration-300 hover:border-blue-300 dark:hover:border-blue-500
                              
                              
                              ">
              <img 
              src={tab.favIconUrl}
              className="w-full h-full object-contain" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noImageImage;
              }}
              />
              </div>
              </a>
            ))}
            
            </div>
          )}
          
          </div>
          
          </div>
          
          </div>
          
          <div className="flex border-gray-200/50 dark:border-gray-600/50 space-x-3">
          <button 
          className="group flex items-center space-x-2 py-3 px-4 rounded-xl text-red-500 dark:text-red-400 
                hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-300 border border-red-200/50 dark:border-red-700/50 hover:border-red-300 dark:hover:border-red-600 flex-1 justify-center font-medium
                  hover:shadow-lg
                "
          onClick={() => onUntrackWindowButtonClicked(window.windowName)}
          >
          <IconX className="h-4 w-4" />
          <span className="text-sm">Untrack</span>
          </button>
          
          <button
          className={`group flex items-center space-x-2 py-3 px-4 rounded-xl duration-300 flex-1 justify-center font-medium 
                  hover:shadow-lg transition-[shadow colors]
                  ${window.isOpen 
            ? "text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700 bg-green-100 dark:bg-gray-800/50" 
            : "text-blue-600 dark:text-blue-500 bg-indigo-100 hover:bg-blue-200 bg-blue-900/30 dark:hover:bg-blue-900/80 border dark:bg-blue-900/50 border-blue-200/50 dark:border-blue-700/50 hover:border-blue-600 dark:hover:border-blue-600"}`
          }
          disabled={window.isOpen}
          onClick={() => onOpenSavedWindowButtonClicked(window.windowName)}
          title={window.isOpen ? "Window is already open" : "Open saved window"}
          >
          <IconExternal className="h-4 w-4" />
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
  