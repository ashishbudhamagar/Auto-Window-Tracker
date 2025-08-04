// @ts-nocheck

import { useEffect, useState, useRef } from "react";
import "../global.css";
import { IconBookmark, IconX, IconExternal, IconWindows, IconDarkMode, IconLightMode } from "../icons/icons";

import CardLayout from "./CardLayout";
import VerticalLayout from "./VerticalLayout";



const Options = () => {

  // document.documentElement.style.zoom = "85%";
  const sortingOptions = ['Name: ASC', 'Name: DES', 'Status: Open', 'Status: Saved']
  
  const [currentSort, setCurrentSort] = useState(sortingOptions[0]);
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState([]);
  const [copyArrayOfWin, setCopyArrayOfWin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [layout, setLayout] = useState('card')
  const [theme, setTheme] = useState(null)
  
  const inputRef = useRef(null);
  
  

  useEffect(()=>{
    chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{

      changeTheme(responseExtensionData.themeMode)

      const trackedWindowValues = Object.values(responseExtensionData.trackedWindows)

      setArrayOfTrackedWindowValues(trackedWindowValues)
      setCopyArrayOfWin(trackedWindowValues)

      setCurrentSort(responseExtensionData.optionsPageSort)
    })
    
    // @ts-ignore
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      
      if (message.signal !== 'changeOptions') return

      const trackedWindowValues = Object.values(message.trackedWindows)

      setArrayOfTrackedWindowValues(trackedWindowValues)
      setCopyArrayOfWin(trackedWindowValues)
    })
  },[])



  useEffect(()=>{
    if (currentSort === '') return

    switch (currentSort) {

      case 'Name: ASC':

        // @ts-ignore
        const nameSortAsc = [...arrayOfTrackedWindowValues].sort((a,b) => a.windowName.localeCompare(b.windowName))
        setArrayOfTrackedWindowValues(nameSortAsc)
        break

      case 'Name: DES':
        // @ts-ignore

        const nameSortDes = [...arrayOfTrackedWindowValues].sort((a,b) => b.windowName.localeCompare(a.windowName))
        setArrayOfTrackedWindowValues(nameSortDes)
        break
      
      case 'Status: Open':
        // @ts-ignore
        const nameSortOpen = [...arrayOfTrackedWindowValues].sort((a,b) => b.isOpen - a.isOpen)
        setArrayOfTrackedWindowValues(nameSortOpen)
        break

      case 'Status: Saved':
        // @ts-ignore
        const nameSortSaved = [...arrayOfTrackedWindowValues].sort((a,b) => a.isOpen - b.isOpen)
        setArrayOfTrackedWindowValues(nameSortSaved)
        break
      default:
        console.warn("No valid sort")
        break
    }
  },[currentSort])


  function changeTheme(theme){
    // Add transition effect before changing theme
    document.documentElement.classList.add('transition-colors');
    document.documentElement.style.transitionDuration = '300ms';
        
    if (theme === 'dark') {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = "#111827";
      }
    } 
    else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = "#f9fafb"; // Using gray-50 instead of plain white
      }
    }
    
    // Remove transition class after theme change is complete
    setTimeout(() => {
      document.documentElement.classList.remove('transition-colors');
    }, 300);
    
    setTheme(theme);
  }


  function onThemeChange() {
    chrome.runtime.sendMessage({signal: 'changeTheme'}, (themeMode)=>{
      changeTheme(themeMode)
    })
  }



  function onSearchType(text : string) {

    const searched = text.trim()
    setSearchQuery(text)

    searched === "" ?
      setArrayOfTrackedWindowValues(copyArrayOfWin)
      :
      // @ts-ignore
      setArrayOfTrackedWindowValues(copyArrayOfWin.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
  }


  function onUntrackWindowClick(windowName : string) {
    chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  }

  function onOpenSavedWindowClick(isOpen: boolean, windowName: string) {
    if (isOpen === true) {
      alert("Cannot open opened window")
      return
    }

    let openedWindowDetails = null
    for (let trackedWindow of arrayOfTrackedWindowValues) {
      // @ts-ignore
      if (trackedWindow.windowName === windowName) {
        openedWindowDetails = trackedWindow
        break
      }
    }

    chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  }







  if (theme === null) {
    return (
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <IconBookmark className="h-12 w-12 text-blue-500 mb-4"/>
        </div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">Loading Auto Window Tracker...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg sticky top-0 z-10 transition-colors duration-300">
        <div className="flex justify-between py-5 items-center max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <IconBookmark className="h-8 w-8 text-blue-500 dark:text-blue-400"/>
            </div>
            <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
              Auto Window Tracker
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {arrayOfTrackedWindowValues.length}
                  </span> windows
                </span>
                <span className="text-gray-400 dark:text-gray-500">|</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    {arrayOfTrackedWindowValues.filter(ele => ele.isOpen).length}
                  </span> open
                </span>
              </div>
            </div>

            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={onThemeChange}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? 
                <IconLightMode className="h-5 w-5 text-blue-500"/> : 
                <IconDarkMode className="h-5 w-5 text-blue-400"/>
              }
            </button>
          </div>
        </div>
      </header>



      <main className="h-auto py-10 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 max-w-7xl">

        <div className="bg-white dark:bg-gray-800 w-full h-auto flex py-6 items-center justify-between rounded-xl mb-8 shadow-lg dark:shadow-xl flex-col md:flex-row gap-4">
          <div className="w-full md:flex-1 px-5" onClick={() => inputRef.current?.focus()}>
            <div className="relative w-full max-w-xl mx-auto md:mx-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search windows by name..." 
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => onSearchType(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-0 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 
                  bg-gray-50 dark:bg-gray-700/70 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                  transition-all duration-200 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchType("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <IconX className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 px-5 w-full md:w-auto">
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/70 rounded-lg px-3 py-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-600 dark:text-gray-300">Sort:</label>
              <select 
                id="sort" 
                className="bg-transparent text-gray-700 dark:text-gray-200 border-0 focus:ring-0 focus:outline-none py-1 pl-1 pr-8 appearance-none cursor-pointer"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                {sortingOptions.map((option, index) => (
                  <option value={option} key={index}>{option}</option>
                ))}
              </select>
            </div>
            
            <button 
              className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300
                ${layout === 'card' 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
              onClick={() => layout === 'card' ? setLayout('vertical') : setLayout('card')}
              title={layout === 'card' ? 'Switch to vertical layout' : 'Switch to card layout'}
            >
              <IconWindows className="h-6 w-6" />
            </button>
          </div>
        </div>



        {

          arrayOfTrackedWindowValues.length === 0 ? 
          
          
          (
            <div className="flex flex-col justify-center items-center h-[300px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-5 mb-4">
                <IconBookmark className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">No windows tracked</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Track your first browser window to manage and quickly access your saved tab sessions.
              </p>
            </div>
          )

          :

          (
            layout === 'card' ? 
          
            <CardLayout {
              ... {
                arrayOfTrackedWindowValues,
                onOpenSavedWindowClick,
                onUntrackWindowClick,
                IconExternal,
                IconX
              }
            } /> 
            
            :
            
            <VerticalLayout {
              ...{
                arrayOfTrackedWindowValues,
                onOpenSavedWindowClick,
                onUntrackWindowClick,
                IconExternal,
                IconX
              }
            }/>
          )

        }        
      </main>
    </div>
  )
};


export default Options