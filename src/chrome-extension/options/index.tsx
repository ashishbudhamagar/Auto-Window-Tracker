import { ExtensionData, OptionsPageSort, OptionsPageLayout, Theme } from "../../types";
import { useEffect, useState, useRef } from "react";
import extensionImage192 from "../public/192.png";
import "../global.css";
import { IconBookmark, IconX, IconExternal, IconDarkMode, IconLightMode, IconLayout } from "../../icons";

import CardLayout from "./CardLayout";
import TableLayout from "./TableLayout";



     
const Options = () => {

  const sortingOptions: OptionsPageSort[] = [OptionsPageSort.nameAsc, OptionsPageSort.nameDes, OptionsPageSort.statusOpen, OptionsPageSort.statusSaved];

  const [currentSort, setCurrentSort] = useState<OptionsPageSort | undefined>(undefined);
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState<any[]>([]);
  const [originalArrayOfTrackedWindowValues, setOriginalArrayOfTrackedWindowValues] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [layout, setLayout] = useState<OptionsPageLayout | undefined>(OptionsPageLayout.card);
  const [theme, setTheme] = useState<Theme | undefined>(undefined)
  const selectRef = useRef<HTMLSelectElement>(null);
  const [spinLayoutIcon, setSpinLayoutIcon] = useState(false)
  const sentSortRef = useRef<OptionsPageSort | null>(null)

  document.documentElement.style.zoom = "85%";



  useEffect(()=>{
    chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData: ExtensionData)=>{
      const trackedWindowValues: any[] = Object.values(responseExtensionData.trackedWindows)
      setArrayOfTrackedWindowValues(trackedWindowValues)
      setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
      setTheme(responseExtensionData.theme)
      setCurrentSort(responseExtensionData.optionsPageSort)
      setLayout(responseExtensionData.optionsPageLayout)
      sentSortRef.current = responseExtensionData.optionsPageSort
    })

    chrome.runtime.onMessage.addListener((message) => {
      console.log("Message received in options page:", message)
      
      if (message.signal !== 'changeOptions') return

      const trackedWindowValues: any[] = Object.values(message.trackedWindows)
      console.log("new windows", trackedWindowValues)
      setArrayOfTrackedWindowValues(trackedWindowValues)
      setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
    })
    

  },[])


  useEffect(() => {

    if (!theme) return

    if (theme === Theme.dark) {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = "#111827";
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = "#f9fafb";
      }
    }
  }, [theme])



  useEffect(() => {

    if (!layout) return

    chrome.runtime.sendMessage({signal: 'optionsPageLayout', optionsPageLayout: layout})
  }, [layout])



  useEffect(()=>{

    if (!currentSort) return

    const cloneData = [...originalArrayOfTrackedWindowValues]
    let sorted = cloneData

    switch (currentSort) {
      case OptionsPageSort.nameAsc: sorted = cloneData.sort((a,b)=> a.windowName.localeCompare(b.windowName)); break;
      case OptionsPageSort.nameDes: sorted = cloneData.sort((a,b)=> b.windowName.localeCompare(a.windowName)); break;
      case OptionsPageSort.statusOpen: sorted = cloneData.sort((a,b)=> (b.isOpen?1:0)-(a.isOpen?1:0)); break;
      case OptionsPageSort.statusSaved: sorted = cloneData.sort((a,b)=> (a.isOpen?1:0)-(b.isOpen?1:0)); break;
      default: break;
    }

    setArrayOfTrackedWindowValues([...sorted])

    if (sentSortRef.current !== currentSort) {
      chrome.runtime.sendMessage({signal: 'setOptionsPageSort', optionsPageSort: currentSort})
      sentSortRef.current = currentSort
    }
  }, [currentSort, originalArrayOfTrackedWindowValues])
  



  function onSearch(text : string) {

    setSearchQuery(text)
    const searched = text.trim()
    if (searched === "") {
      setArrayOfTrackedWindowValues(originalArrayOfTrackedWindowValues)
      return
    }

    setArrayOfTrackedWindowValues(originalArrayOfTrackedWindowValues.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
  }


  function onUntrackWindowClick(windowName : string) {
    chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  }

  function onOpenSavedWindowClick(windowName: string) {

    let openedWindowDetails = null

    for (let trackedWindow of arrayOfTrackedWindowValues) {
      if (trackedWindow.windowName === windowName) {
        openedWindowDetails = trackedWindow
        break
      }
    }
    chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  }



  if (theme === null || layout === null ||  currentSort === null) {
  return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <IconBookmark className="h-12 w-12 text-blue-500/30 mb-4"/>
          </div>
          <IconBookmark className="h-12 w-12 text-blue-500 mb-4 relative z-10"/>
        </div>
        <div className="text-center space-y-2">
          <p className="text-gray-500 dark:text-gray-200 font-semibold text-lg">Auto Window Tracker</p>
          <p className="text-gray-400 dark:text-gray-400 text-sm">Loading data...</p>
        </div>
        <div className="mt-6 flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-50 via-indigo-200 to-slate-50 dark:from-[#0f1934] dark:via-[#121f40] dark:to-[#101827] transition-all duration-500">

      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg dark:shadow-2xl border-b border-white/20 dark:border-gray-700/30">
        <div className="flex justify-between py-6 items-center max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center space-x-3 group">
            <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img src={extensionImage192} className="h-8 w-8 object-cover object-center scale-150"/>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100 tracking-tight">
                Auto Window Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your browser sessions</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">

            <div className="flex items-center space-x-6 px-4 py-3 bg-gray-100 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30 shadow-sm">


              <span className="flex items-center">
                <span className="text-sm ml-1 text-green-500 dark:text-green-600 font-semibold">{arrayOfTrackedWindowValues.filter(ele => ele.isOpen).length} active</span>
              </span>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

              <div className="flex items-center">
                  <span className="text-sm ml-1 text-gray-500 dark:text-gray-400 font-semibold">{arrayOfTrackedWindowValues.length} {arrayOfTrackedWindowValues.length === 1 ? "window" : "windows"}</span>
              </div>

            </div>

            <button 
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/60 hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-700/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                chrome.runtime.sendMessage({signal: 'changeTheme'}, (newTheme: Theme)=> { if (newTheme) setTheme(newTheme) })
              }}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {theme === "light" ? 
                <IconLightMode className="h-6 w-6 text-blue-600 relative z-10 transition-transform group-hover:rotate-180 duration-500"/> : 
                <IconDarkMode className="h-6 w-6 text-blue-400 relative z-10 transition-transform group-hover:rotate-180 duration-500"/>
              }
            </button>
          </div>
        </div>
      </header>



      <main className="pt-12 pb-10 mx-auto px-6 sm:px-8 lg:px-10 transition-all duration-500 max-w-7xl">

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg w-full flex py-8 items-center justify-between rounded-2xl mb-10 shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30 flex-col lg:flex-row gap-6">
          <div className="w-full lg:flex-1 px-6">
            <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search windows by name..." 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 
                  bg-gray-100 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 
                  transition-all duration-300 focus:outline-none shadow-sm focus:shadow-lg text-lg font-medium
                  border border-gray-200 dark:border-gray-600/50 focus:border-blue-300 dark:focus:border-blue-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors group"
                >
                  <div className="p-1 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                    <IconX className="h-5 w-5" />
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 px-6 w-full lg:w-auto">
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-transparent backdrop-blur-sm rounded-xl border-[1px] px-4 py-3  border-gray-200 dark:border-gray-600/50 shadow-sm"
              onClick={() => selectRef.current?.focus()}
            >
              <label htmlFor="sort" className="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">Sort by:</label>
              <select
                ref={selectRef}
                id="sort" 
                className="bg-gray-100 dark:bg-gray-600 rounded-md text-gray-700 dark:text-gray-200 border-0 focus:ring-0 focus:outline-none py-1 pl-2 pr-8 appearance-none cursor-pointer font-medium"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value as OptionsPageSort)}
              >
                {sortingOptions.map((option, index) => (
                  <option value={option} key={index} className="bg-white dark:bg-gray-800">{option}</option>
                ))}
              </select>
            </div>
            
            <button 
              className={`group relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg
                bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25
                ${layout === 'card' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25' 
                  : 'bg-white/80 text-gray-600 dark:bg-gray-700/80 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 border border-gray-200/50 dark:border-gray-600/50'}`}
              onClick={() => { layout === 'card' ? setLayout(OptionsPageLayout.table) : setLayout(OptionsPageLayout.card); setSpinLayoutIcon(true); setTimeout(()=> setSpinLayoutIcon(false), 650); }}
            >
              <IconLayout className={`h-[30px] w-[30px] transition-transform group-hover:rotate-12 duration-300 ${spinLayoutIcon ? 'animate-spin-once' : ''}`} />
              {layout === 'card' && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </div>



        {

          arrayOfTrackedWindowValues.length === 0 ? 
          
          
          (
            <div className="flex flex-col justify-center items-center min-h-[400px] p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full p-8 shadow-inner">
                  <IconBookmark className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <div className="text-center space-y-4 max-w-lg">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-200">No Windows Tracked Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Auto track your windows to organize, <strong className="underline">save memory</strong> and quickly reopen your saved window sessions.
                </p>
              </div>
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
            
            <TableLayout {
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

