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
        
    if (theme === 'dark') {

      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = "#111827";

      }
    } 
    else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = "white";
      }
    }
    setTheme(theme)
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
      <div className="h-auto w-[320px] bg-black flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="h-auto w-auto bg-white dark:bg-gray-900">

      <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg">
        <div className="flex justify-between py-6 items-center
          max-w-[93rem] mx-auto px-5 md:px-40
        ">

          <div>
            <h1 className="flex items-center justify-center space-x-3">
              <IconBookmark className="h-8 w-8 text-blue-400"/>
              <p className="font-semibold text-[25px] text-gray-900 dark:text-gray-100">Auto Window Tracker</p>
            </h1>
          </div>

          <div className="flex items-center justify-center ">

            <p className="font-medium text-gray-500 dark:text-gray-300">Tracked Windows: {
            // @ts-ignore
            arrayOfTrackedWindowValues.length} (Opened: {arrayOfTrackedWindowValues.filter(ele=> ele.isOpen).length})</p>

            <button className="hover:bg-gray-200 dark:hover:bg-gray-800 p-1 rounded-md ml-6"
              onClick={onThemeChange}
            >

              {
                theme === "light" ?
                <IconLightMode className="h-7 w-7 text-blue-400"/> : null
              }
              {
                theme === "dark" ?
                <IconDarkMode className="h-7 w-7 text-blue-400"/> : null
              }
              
            </button>
          </div>



        </div>
      </header>



      <main className="h-auto mt-10  mx-auto px-4 md:px-40 transition-all duration-500 max-w-[93rem]">

        <div className="bg-white dark:bg-gray-800 w-full h-auto flex py-5 items-center justify-center rounded-lg mb-8 shadow-md dark:shadow-lg flex-col md:flex-row">

          <div className="flex-[4] mr-5 w-full" 
          
          // @ts-ignore 
          onClick={(e)=>
          // @ts-ignore
            inputRef.current?.focus()}>

            <div className="flex max-w-[35rem] p-3 rounded-md border-2 border-gray-300 dark:border-gray-700 ml-5 justify-center items-center space-x-2
              focus-within:border-gray-400 dark:focus-within:border-gray-500 hover:border-gray-400 dark:hover:border-gray-500  transition-colors duration-200
            ">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search windows..." ref={inputRef}

                value={searchQuery}
                onChange={(e)=>onSearchType(e.target.value)}
                className="w-full focus:outline-none text-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

          </div>

          <div className="flex-1 flex justify-center items-center mr-5">



              <div className="mr-auto flex items-center ">

                <label htmlFor="sort" className="mr-1 whitespace-nowrap text-gray-700 dark:text-gray-200">Sort by :</label>
                <select id="sort" className="hover:bg-gray-200 dark:hover:bg-gray-700 py-2 rounded-md transition-colors duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
                value={currentSort}
                onChange={(e)=>setCurrentSort(e.target.value)}
                >
                    {
                      sortingOptions.map((ele, index)=>(
                        <option value={ele} key={index}>{ele}</option>
                      ))
                    }
                </select>

                <div className="hover:bg-gray-200 dark:hover:bg-gray-700 px-0 w-16 rounded-md transition-colors duration-300 ml-2 hover:cursor-pointer"
                  onClick={()=> layout === 'card' ? setLayout('vertical') : setLayout('card')}
                >
                  <IconWindows className="h-10 w-5 mx-auto text-gray-700 dark:text-gray-200"/>
                </div>
              </div>
              
          </div>
        </div>



        {

          arrayOfTrackedWindowValues.length === 0 ? 
          
          
          (
            <div className="flex justify-center items-center h-[200px]">
              <div className="font-medium text-gray-400 dark:text-gray-500 text-2xl">No windows tracked</div>
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