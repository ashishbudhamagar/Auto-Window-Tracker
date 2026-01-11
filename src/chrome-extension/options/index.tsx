import { ExtensionData, OptionsPageSort, OptionsPageLayout, Theme, TrackedWindow, Tab } from "../../types"
import { IconBookmark, IconX, IconExternal, IconLayout } from "../../icons"
import { useEffect, useState } from "react"
import extensionImage192 from "../public/192.png"
import "../global.css"

import CardLayout from "./CardLayout"
import TableLayout from "./TableLayout"
import Settings from "./Settings"
import SearchByUrlResult from "./SearchByUrlResult"
import NoSearchQuery from "./NoSearchQuery"

const DEAFULT_ZOOM_LEVEL: number = 75


const Options = () => {

  const sortingOptions: OptionsPageSort[] = [
    OptionsPageSort.nameAsc, OptionsPageSort.nameDes,
    OptionsPageSort.statusOpen, OptionsPageSort.statusSaved,
    OptionsPageSort.dateAsc, OptionsPageSort.dateDec,
    OptionsPageSort.draggable1, OptionsPageSort.draggable2, OptionsPageSort.draggable3
  ]

  
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState<TrackedWindow[]>([])
  const [originalArrayOfTrackedWindowValues, setOriginalArrayOfTrackedWindowValues] = useState<TrackedWindow[]>([])
  

  const [currentSort, setCurrentSort] = useState<OptionsPageSort | null>(null)
  const [layout, setLayout] = useState<OptionsPageLayout | null>(null)
  const [theme, setTheme] = useState<Theme | null>(null)
  const [spinLayoutIcon, setSpinLayoutIcon] = useState(false)
  const [tabGroupsHiddenForCards, setTabGroupsHiddenForCards] = useState<boolean | null>(null)
  const [tabGroupsHiddenForTable, setTabGroupsHiddenForTable] = useState<boolean | null>(null)
  const [coloredTabGroups, setColoredTabGroups] = useState<boolean | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number | null>(null)
  const [cardsColumns, setCardsColumns] = useState<number | "auto" | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null)
  const [savedWindowIsOpening, setSavedWindowIsOpening] = useState<boolean>(false)



  useEffect(() => {
    chrome.runtime.sendMessage({signal: "getExtensionData"}, (response: ExtensionData) => {

      const trackedWindowValues: TrackedWindow[] = Object.values(response.trackedWindows)
      setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
      setArrayOfTrackedWindowValues(trackedWindowValues)

      setTheme(response.theme)
      setCurrentSort(response.optionsPageSort)
      setLayout(response.optionsPageLayout)
      setTabGroupsHiddenForCards(response.optionsPageHideTabGroupsForCards)
      setTabGroupsHiddenForTable(response.optionsPageHideTabGroupsForTable)
      setColoredTabGroups(response.optionsPageColoredTabGroups)
      setZoomLevel(response.optionsPageZoomLevel)
      setCardsColumns(response.optionsPageCardsColumns)
    })

    
    chrome.runtime.onMessage.addListener(listenerToUpdateOptionsPage)

    function listenerToUpdateOptionsPage(message: any) {
      if (message.signal !== "updateOptions") return
      const trackedWindowValues: TrackedWindow[] = Object.values(message.extensionData.trackedWindows)
      setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
    }

    return () => {
      chrome.runtime.onMessage.removeListener(listenerToUpdateOptionsPage)
    }
  }, [])




  useEffect(() => {
    if (!theme) return

    if (theme === Theme.dark) {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark")
      }
      document.documentElement.style.backgroundColor = "#111827"
    }
    else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
      }
      document.documentElement.style.backgroundColor = "#f9fafb"
    }
  }, [theme])




  useEffect(() => {
    if (zoomLevel === null) return


    if (zoomLevel === 0) {
      document.documentElement.style.zoom = String(DEAFULT_ZOOM_LEVEL) + "%"
      return
    }


    const step = zoomLevel * 10
    let changeBy = step * 5

    if (zoomLevel < 0) {
      changeBy = changeBy / 2
    }

    const finalZoomLevel = DEAFULT_ZOOM_LEVEL + changeBy
    document.documentElement.style.zoom = String(finalZoomLevel) + "%"

  }, [zoomLevel])



  function onSearch(text: string) {
    setSearchQuery(text)
  }



  // ============ setting related start =================

  function onChangeLayoutButtonClicked() {
    chrome.runtime.sendMessage({signal: "changeOptionsPageLayout"}, (newLayout: OptionsPageLayout) => {
      setLayout(newLayout)
    })

    setSpinLayoutIcon(true)
    setTimeout(() => setSpinLayoutIcon(false), 600)
  }
    
  function onChangeSortButtonClicked(newSort: OptionsPageSort) {
    chrome.runtime.sendMessage({signal: "changeOptionsPageSort", newSort: newSort}, (updatedSort: OptionsPageSort) => {
      setCurrentSort(updatedSort)
    })
  }


  function onChangeThemeButtonClicked() {
    chrome.runtime.sendMessage({signal: "changeTheme"}, (newTheme: Theme) => {
        setTheme(newTheme)
    })
  }

  function onToggleTabGroupsButtonClicked(isForTableOrCards: "table" | "cards") {
    chrome.runtime.sendMessage({signal: "toggleHideTabGroups", isForTableOrCards: isForTableOrCards}, ({newHideTabGroupsForCards, newHideTabGroupsForTable}) => {
      setTabGroupsHiddenForCards(newHideTabGroupsForCards)
      setTabGroupsHiddenForTable(newHideTabGroupsForTable)
    })
  }

  function onToggleColoredTabGroupsButtonClicked() {
    chrome.runtime.sendMessage({signal: "toggleColoredTabGroups"}, (newColoredTabGroups: boolean) => {
      setColoredTabGroups(newColoredTabGroups)
    })
  }

  function onZoomLevelChange(zoomLevel: number) {
    chrome.runtime.sendMessage({signal: "changeOptionsPageZoomLevel", zoomLevel: zoomLevel}, (newZoomLevel: number) => {
      setZoomLevel(newZoomLevel)
    })
  }

  function onCardsColumnsChange(incOrDec: "inc" | "dec") {
    chrome.runtime.sendMessage({signal: "changeOptionsPageCardsColumns", incOrDec: incOrDec}, (newCardsColumns: number | "auto") => {
      setCardsColumns(newCardsColumns)
    })
  }


  // ============ setting related end =================



    
  function applyOptionsPageSort() {
        
    if (!currentSort) return

    const cloned = structuredClone(originalArrayOfTrackedWindowValues)
    let sorted = cloned
    
    switch (currentSort) {

      case OptionsPageSort.nameAsc:
        sorted = cloned.sort((a, b) => a.windowName.localeCompare(b.windowName))
        break
      case OptionsPageSort.nameDes:
        sorted = cloned.sort((a, b) => b.windowName.localeCompare(a.windowName))
        break

      case OptionsPageSort.statusOpen:
        sorted = cloned.sort((a, b) => (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0))
        break
      case OptionsPageSort.statusSaved:
        sorted = cloned.sort((a, b) => (a.isOpen ? 1 : 0) - (b.isOpen ? 1 : 0))
        break

      case OptionsPageSort.dateAsc:
        sorted = cloned.sort((a, b) => b.dateAdded - a.dateAdded)
        break
      case OptionsPageSort.dateDec:
        sorted = cloned.sort((a, b) => a.dateAdded - b.dateAdded)
        break

      case OptionsPageSort.draggable1:
      case OptionsPageSort.draggable2:
      case OptionsPageSort.draggable3:

        const orderKey = currentSort === OptionsPageSort.draggable1 ? "draggableOrder1" : currentSort === OptionsPageSort.draggable2 ? "draggableOrder2" : "draggableOrder3"

        if (cloned.every(trackedWindow => trackedWindow[orderKey] === -1)) {
          sorted = cloned.sort((a, b) => a.dateAdded - b.dateAdded)
          break
        }

        const withOrder = cloned.filter(trackedWindow => trackedWindow[orderKey] !== -1)
        const withoutOrder = cloned.filter(trackedWindow => trackedWindow[orderKey] === -1)

        sorted = [...withOrder.sort((a, b) => a[orderKey] - b[orderKey]), ...withoutOrder.sort((a, b) => a.dateAdded - b.dateAdded)]
        break
      default:
        break
    }


    const trimmedSearchQuery = searchQuery.trim()

    if (trimmedSearchQuery !== "") {

      if (trimmedSearchQuery.startsWith("url:")) {
        const urlToSearch = trimmedSearchQuery.replace("url:", "").trim()
        sorted = sorted.filter(trackedWindow => trackedWindow.tabs.some(tab => tab.url.includes(urlToSearch)))
      }
      else {
        sorted = sorted.filter(trackedWindow => trackedWindow.windowName.toLowerCase().startsWith(trimmedSearchQuery.toLowerCase()))
      }
    }

    setArrayOfTrackedWindowValues(sorted)
  }


  useEffect(() => {
    applyOptionsPageSort()
  }, [currentSort, originalArrayOfTrackedWindowValues, searchQuery])
  


  function onUntrackWindowButtonClicked(windowName: string) {
    chrome.runtime.sendMessage({signal: "untrackWindowFromOptions", windowName: windowName})
  }

  function onOpenSavedWindowButtonClicked(windowName: string) {
    const trackedWindowToOpen = originalArrayOfTrackedWindowValues.find(tw => tw.windowName === windowName)
    if (!trackedWindowToOpen) return

    setSavedWindowIsOpening(true)

    chrome.runtime.sendMessage({signal: "openSavedWindow", trackedWindowToOpen: trackedWindowToOpen},(response:boolean) =>{
      setSavedWindowIsOpening(response)
    })
  }




  async function onWindowNameChange(newWindowName: string, oldWindowName: string) {

    const response: ExtensionData = await chrome.runtime.sendMessage({signal: "getExtensionData"})

    let uniqueName = true
    for (let trackedWindow of Object.values(response.trackedWindows)) {
      if (trackedWindow.windowName === newWindowName) {
        uniqueName = false
        break
      }
    }

    if (!uniqueName) {
      return false
    }

    chrome.runtime.sendMessage({signal: "changeWindowNameFromOptionsPage", newWindowName: newWindowName, oldWindowName: oldWindowName})
    return true
  }



  function preventLinkClickIfChromeSpeicalLink(e:any, tab: Tab) {
    if (tab.url.includes("chrome://")) {
      e.preventDefault()
    }
  }






  // ============ Drag and Drop related start =================

  function determinIfDraggable() {
    const isDraggableSort = currentSort === OptionsPageSort.draggable1 || currentSort === OptionsPageSort.draggable2 || currentSort === OptionsPageSort.draggable3
    return isDraggableSort && searchQuery === ""
  }




  function handleDragStart(e: React.DragEvent<HTMLDivElement | HTMLButtonElement>, index: number) {

    setIsDragging(true)
    setDraggedItemIndex(index)

    const target = e.currentTarget as HTMLElement;
    e.dataTransfer.setDragImage(target, 0, 0);

    e.currentTarget.classList.add("draggin-element")
    e.currentTarget.setAttribute("data-card-index", String(index))
    e.dataTransfer.setData("cardIndex", String(index))
    e.dataTransfer.effectAllowed = "move"
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement | HTMLButtonElement>) {
    e.preventDefault()

    setIsDragging(false)
    setDraggedItemIndex(null)

    e.currentTarget.removeAttribute("data-card-index")
    e.dataTransfer.clearData()
    
    e.currentTarget.classList.remove("draggin-element")

    const divs = document.querySelectorAll(".drag-over-target")
    divs.forEach(i => i.classList.remove("drag-over-target"))
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement | HTMLButtonElement>, index: number) {
    e.preventDefault()
    
    if (e.currentTarget.getAttribute("data-card-index") === String(index)) return

    const element = e.currentTarget
    
    const closeByElements = Array.from((element.parentElement || document).children)
    
    closeByElements.forEach(s => {
      if(s !== element) {
        s.classList.remove("drag-over-target")
      }
    })

    if (!element.classList.contains("drag-over-target")) {
      element.classList.add("drag-over-target")
    }
  }


  function handleDragLeave(e: React.DragEvent<HTMLDivElement | HTMLButtonElement>) {
    e.preventDefault()
    e.currentTarget.classList.remove("drag-over-target")
  }




  function handleDrop(e: React.DragEvent<HTMLDivElement | HTMLButtonElement>, index: number) {
    e.preventDefault()

    const element = e.currentTarget
    element.style.removeProperty("transform")


    const from = Number(e.dataTransfer.getData("cardIndex"))
    e.currentTarget.removeAttribute("data-card-index")
    e.dataTransfer.clearData()


    if (from === index) return
    if (from < 0 || index < 0) return
    if (from >= arrayOfTrackedWindowValues.length || index >= arrayOfTrackedWindowValues.length) return

    chrome.runtime.sendMessage({
      signal: "handleDraggableOptionsPageSort",
      arrayOfTrackedWindowValues: arrayOfTrackedWindowValues,
      fromIndex: from,
      toIndex: index
    })
  }

  // ============ Drag and Drop related end =================





  const activeWindowCount = arrayOfTrackedWindowValues.filter(trackedWindow => trackedWindow.isOpen).length
  const savedWindowCount = arrayOfTrackedWindowValues.filter(trackedWindow => !trackedWindow.isOpen).length
  const totalTrackedWindowCount = arrayOfTrackedWindowValues.length


  if (theme === null || layout === null || currentSort === null || 
    tabGroupsHiddenForCards === null || tabGroupsHiddenForTable === null || 
    coloredTabGroups === null || zoomLevel === null || cardsColumns === null
  ) {

    return (
      <div className="min-h-screen w-full bg-[rgb(95,95,95)] flex flex-col items-center justify-center">
        <div className="relative">
          <IconBookmark className="h-12 w-12 text-blue-500 mb-4 relative"/>
        </div>
        <div className="text-center space-y-2">
          <p className="text-gray-400 font-semibold text-lg">Auto Window Tracker</p>
          <p className="text-gray-400/90 text-sm">Loading data...</p>
        </div>
        <div className="mt-6 flex space-x-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen w-[] bg-gradient-to-b from-slate-50 via-indigo-200 to-slate-50 
    dark:from-[#0f1934] dark:via-[#121f40] dark:to-[#101827] transition-all duration-500">

      <header className="relative z-20 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg dark:shadow-2xl border-b border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col sm:flex-row justify-between py-4 sm:py-6 items-center max-w-7xl mx-auto px-5 gap-4">

          <div className="flex items-center space-x-3">
            <div className="relative p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <img
                src={extensionImage192} 
                className="h-6 w-6 sm:h-8 sm:w-8 object-cover object-center scale-150"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl sm:text-2xl text-gray-600 dark:text-gray-300 ">
                Auto Window Tracker
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 sm:space-x-4">

            <div className="flex items-center space-x-3 sm:space-x-6 px-3 sm:px-4 py-2 sm:py-3 
            bg-gray-100 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20
             dark:border-gray-700/30 shadow-sm">

              <span className="text-xs sm:text-sm text-green-500 dark:text-green-600 font-semibold">
                {activeWindowCount} active
              </span>

              <span className="w-px h-4 sm:h-6 bg-gray-300 dark:bg-gray-600" />

              <span className="text-xs sm:text-sm text-blue-500 dark:text-blue-600 font-semibold">
                {savedWindowCount} saved
              </span>

              <span className="w-px h-4 sm:h-6 bg-gray-300 dark:bg-gray-600" />

              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold">
                {totalTrackedWindowCount} {totalTrackedWindowCount === 1 ? "window" : "windows"}
              </span>

            </div>

            <div>
              <Settings
                theme={theme} 
                hideTabGroupsCards={tabGroupsHiddenForCards} 
                hideTabGroupsTable={tabGroupsHiddenForTable}
                coloredTabGroups={coloredTabGroups}
                zoomLevel={zoomLevel}
                cardsColumns={cardsColumns}
                onChangeThemeButtonClicked={onChangeThemeButtonClicked}
                onToggleTabGroupsButtonClicked={onToggleTabGroupsButtonClicked}
                onToggleColoredTabGroupsButtonClicked={onToggleColoredTabGroupsButtonClicked}
                onZoomLevelChange={onZoomLevelChange}
                onCardsColumnsChange={onCardsColumnsChange}
              
              />
            </div>

          </div>

        </div>
      </header>



      <main className="pt-8 pb-8 mx-auto px-2 sm:px-5 transition-all 
      duration-500 max-w-7xl">

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg w-full flex 
        py-6 sm:py-8 items-center justify-between rounded-2xl shadow-xl 
        dark:shadow-2xl border border-white/20 dark:border-gray-700/30 flex-col lg:flex-row gap-6
            mb-10
        ">
          
          <div className="w-full lg:flex-1 px-4 sm:px-6">
            <div className="relative w-full mx-auto lg:mx-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              


              <input 
                type="text"
                placeholder='Search by window name or by URL: "url:google"...'
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="block w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-4 text-gray-700 
                dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-100 
                dark:bg-gray-700/80 backdrop-blur-sm rounded-xl outline-none ring-0 focus:ring-2 
                focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-shadow duration-300 
                shadow-sm focus:shadow-lg text-base sm:text-lg font-medium border border-gray-200 
                dark:border-gray-600/50 focus:border-blue-300 dark:focus:border-blue-500"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => onSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 
                  hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <div className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 
                  transition-colors">
                    <IconX className="h-5 w-5" />
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 
          sm:space-x-4 px-4 sm:px-6 w-full lg:w-auto">

            <div className="flex items-center space-x-3 bg-white/80 dark:bg-transparent 
            backdrop-blur-sm rounded-xl border px-4 py-2 sm:py-3 border-gray-200 
            dark:border-gray-600/50 shadow-sm w-full sm:w-auto">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                Sort by:
              </label>
              <select
                className="bg-gray-100 dark:bg-gray-600 rounded-md text-gray-700 
                dark:text-gray-200 border-0 focus:ring-0 focus:outline-none py-1 pl-2 pr-8 
                appearance-none cursor-pointer font-medium w-full sm:w-auto"
                value={currentSort}
                onChange={(e) => onChangeSortButtonClicked(e.target.value as OptionsPageSort)}
              >
                {sortingOptions.map((option) => (
                  <option value={option} key={option} className="bg-white dark:bg-gray-800">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={onChangeLayoutButtonClicked}
              disabled={spinLayoutIcon}
              title="Change betwen Cards and Table layout"
              className={`
                hover:cursor-pointer
                relative flex items-center justify-center p-2 rounded-xl transition-all
                duration-300 transform  shadow-lg w-full sm:w-auto hover:scale-105
                bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25
                group ${spinLayoutIcon ? "shrink-and-grow" : ""}
                `}
            >
                <IconLayout className={`h-[24px] w-[24px] sm:h-[30px] sm:w-[30px] transition-transform 
                 duration-300 ${spinLayoutIcon ? "spin-once" : "group-hover:rotate-[20deg]"}`} />
            </button>

          </div>
        </div>


        {searchQuery.trim() !== "" && !searchQuery.trim().includes("url:") && arrayOfTrackedWindowValues.length === 0 ?
          <NoSearchQuery />
        :

        searchQuery.trim().includes("url:") ?

          <SearchByUrlResult
          arrayOfTrackedWindowValues={arrayOfTrackedWindowValues}
          searchQuery={searchQuery}
          savedWindowIsOpening={savedWindowIsOpening}
          IconExternal={IconExternal}
          IconX={IconX}
          preventLinkClickIfChromeSpeicalLink={preventLinkClickIfChromeSpeicalLink}
          onUntrackWindowButtonClicked={onUntrackWindowButtonClicked}
          onOpenSavedWindowButtonClicked={onOpenSavedWindowButtonClicked}

          />

        :

        arrayOfTrackedWindowValues.length === 0 ? (
          
          <div className="flex flex-col justify-center items-center min-h-[300px] 
          sm:min-h-[400px] p-6 sm:p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg 
          rounded-2xl shadow-xl dark:shadow-2xl border border-white/20 dark:border-gray-700/30">
     
            <div className="text-center space-y-4 max-w-lg">
              <h2 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-200">
                No Windows Tracked Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
                Auto track your windows to organize, <strong className="underline">save memory</strong> and quickly reopen your saved window
              </p>
            </div>
          </div>

        ) : layout === OptionsPageLayout.card ? (
          
          <CardLayout
            arrayOfTrackedWindowValues={arrayOfTrackedWindowValues}
            onOpenSavedWindowButtonClicked={onOpenSavedWindowButtonClicked}
            onUntrackWindowButtonClicked={onUntrackWindowButtonClicked}
            IconExternal={IconExternal}
            IconX={IconX}
            determinIfDraggable={determinIfDraggable}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            isDragging={isDragging}
            draggedItemIndex={draggedItemIndex}
            preventLinkClickIfChromeSpeicalLink={preventLinkClickIfChromeSpeicalLink}
            savedWindowIsOpening={savedWindowIsOpening}
            onWindowNameChange={onWindowNameChange}
            tabGroupsHiddenForCards={tabGroupsHiddenForCards}
            coloredTabGroups={coloredTabGroups}
            cardsColumns={cardsColumns}
          />

        ) : (
          
          <TableLayout
            arrayOfTrackedWindowValues={arrayOfTrackedWindowValues}
            onOpenSavedWindowButtonClicked={onOpenSavedWindowButtonClicked}
            onUntrackWindowButtonClicked={onUntrackWindowButtonClicked}
            IconExternal={IconExternal}
            IconX={IconX}
            determinIfDraggable={determinIfDraggable}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            isDragging={isDragging}
            draggedItemIndex={draggedItemIndex}
            preventLinkClickIfChromeSpeicalLink={preventLinkClickIfChromeSpeicalLink}
            savedWindowIsOpening={savedWindowIsOpening}
            onWindowNameChange={onWindowNameChange}
            tabGroupsHiddenForTable={tabGroupsHiddenForTable}
            coloredTabGroups={coloredTabGroups}
            searchQuery={searchQuery}
          />

        )}




      </main>
    </div>
  )
}


export default Options