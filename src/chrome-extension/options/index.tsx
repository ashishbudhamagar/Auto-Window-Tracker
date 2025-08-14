// @ts-nocheck
import { ExtensionData, OptionsPageSort, OptionsPageLayout, Theme } from "../../types";
import { useEffect, useState, useRef } from "react";
import "../global.css";
import { IconBookmark, IconX, IconExternal, IconWindows, IconDarkMode, IconLightMode, IconLayout } from "../icons/icons";

import CardLayout from "./CardLayout";
import VerticalLayout from "./TableLayout";

const windowsData = [
  {
    windowName: "College and School things",
    color: "white",
    groupedTabsInfo: [],
    isOpen: true,
    tabs:[
  {
    "title": "Google",
    "url": "https://www.google.com",
    "favIconUrl": "https://www.google.com/favicon.ico"
  },
  {
    "title": "YouTube",
    "url": "https://www.youtube.com",
    "favIconUrl": "https://www.youtube.com/favicon.ico"
  },
  {
    "title": "Reddit",
    "url": "https://www.reddit.com",
    "favIconUrl": "https://www.reddit.com/favicon.ico"
  },
  {
    "title": "Stack Overflow",
    "url": "https://stackoverflow.com",
    "favIconUrl": "https://stackoverflow.com/favicon.ico"
  },
  {
    "title": "GitHub",
    "url": "https://github.com",
    "favIconUrl": "https://github.githubassets.com/favicons/favicon.svg"
  },
  {
    "title": "Wikipedia",
    "url": "https://en.wikipedia.org",
    "favIconUrl": "https://en.wikipedia.org/static/favicon/wikipedia.ico"
  },
  {
    "title": "Twitter",
    "url": "https://twitter.com",
    "favIconUrl": "https://abs.twimg.com/favicons/twitter.ico"
  },
  {
    "title": "LinkedIn",
    "url": "https://www.linkedin.com",
    "favIconUrl": "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
  },
  {
    "title": "Instagram",
    "url": "https://www.instagram.com",
    "favIconUrl": "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico"
  },
  {
    "title": "Broken Icon Example",
    "url": "https://example.com",
    "favIconUrl": "https://example.com/thisdoesnotexist.ico"
  }
],
    windowId: 134320737
  },
  {
    windowName: "asd 2",
    color: "white",
    groupedTabsInfo: [],
    isOpen: true,
    tabs: [
  {
    "title": "Google",
    "url": "https://www.google.com",
    "favIconUrl": "https://www.google.com/favicon.ico"
  },
  {
    "title": "YouTube",
    "url": "https://www.youtube.com",
    "favIconUrl": "https://www.youtube.com/favicon.ico"
  },
  {
    "title": "Reddit",
    "url": "https://www.reddit.com",
    "favIconUrl": "https://www.reddit.com/favicon.ico"
  },
  {
    "title": "Stack Overflow",
    "url": "https://stackoverflow.com",
    "favIconUrl": "https://stackoverflow.com/favicon.ico"
  },
  {
    "title": "GitHub",
    "url": "https://github.com",
    "favIconUrl": "https://github.githubassets.com/favicons/favicon.svg"
  },
  {
    "title": "Wikipedia",
    "url": "https://en.wikipedia.org",
    "favIconUrl": "https://en.wikipedia.org/static/favicon/wikipedia.ico"
  },
  {
    "title": "Twitter",
    "url": "https://twitter.com",
    "favIconUrl": "https://abs.twimg.com/favicons/twitter.ico"
  },
  {
    "title": "LinkedIn",
    "url": "https://www.linkedin.com",
    "favIconUrl": "https://static.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
  },
  {
    "title": "Instagram",
    "url": "https://www.instagram.com",
    "favIconUrl": "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico"
  },
  {
    "title": "Netflix",
    "url": "https://www.netflix.com",
    "favIconUrl": "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
  },
  {
    "title": "Spotify",
    "url": "https://www.spotify.com",
    "favIconUrl": "https://www.scdn.co/i/_global/favicon.png"
  },
  {
    "title": "Amazon",
    "url": "https://www.amazon.com",
    "favIconUrl": "https://www.amazon.com/favicon.ico"
  },
  {
    "title": "Microsoft",
    "url": "https://www.microsoft.com",
    "favIconUrl": "https://www.microsoft.com/favicon.ico"
  },
  {
    "title": "Broken Icon 1",
    "url": "https://example.com",
    "favIconUrl": "https://example.com/notfound.ico"
  },
  {
    "title": "Broken Icon 2",
    "url": "https://example.org",
    "favIconUrl": "https://example.org/404favicon.png"
  },
  {
    "title": "No Icon 1",
    "url": "https://noicon1.com"
  },
  {
    "title": "No Icon 2",
    "url": "https://noicon2.com"
  },
  {
    "title": "Broken Icon 3",
    "url": "https://testsite.com",
    "favIconUrl": "https://testsite.com/fakeicon.ico"
  },
  {
    "title": "OpenAI",
    "url": "https://www.openai.com",
    "favIconUrl": "https://openai.com/favicon.ico"
  },
  {
    "title": "Cloudflare",
    "url": "https://www.cloudflare.com",
    "favIconUrl": "https://www.cloudflare.com/favicon.ico"
  }
]
,
    windowId: 134321034
  },
  {
    windowName: "dev tools",
    color: "blue",
    groupedTabsInfo: [],
    isOpen: false,
    tabs: [
      {
        favIconUrl: "https://developer.chrome.com/favicon.ico",
        groupId: -1,
        id: 200001,
        title: "Chrome Developers",
        url: "https://developer.chrome.com/"
      },
      {
        favIconUrl: "https://nodejs.org/static/images/favicons/favicon.ico",
        groupId: -1,
        id: 200002,
        title: "Node.js",
        url: "https://nodejs.org/"
      },
      {
        favIconUrl: "https://webpack.js.org/icon-square-big.svg",
        groupId: -1,
        id: 200003,
        title: "Webpack Documentation",
        url: "https://webpack.js.org/"
      }
    ],
    windowId: 200000
  },
  {
    windowName: "research",
    color: "green",
    groupedTabsInfo: [],
    isOpen: true,
    tabs: [
      {
        favIconUrl: "https://en.wikipedia.org/static/favicon/wikipedia.ico",
        groupId: -1,
        id: 200101,
        title: "JavaScript - Wikipedia",
        url: "https://en.wikipedia.org/wiki/JavaScript"
      },
      {
        favIconUrl: "https://stackoverflow.com/favicon.ico",
        groupId: -1,
        id: 200102,
        title: "Stack Overflow",
        url: "https://stackoverflow.com/"
      },
      {
        favIconUrl: "https://developer.mozilla.org/favicon.ico",
        groupId: -1,
        id: 200103,
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org/"
      },
      {
        favIconUrl: "https://react.dev/favicon.ico",
        groupId: -1,
        id: 200104,
        title: "React Docs",
        url: "https://react.dev/"
      }
    ],
    windowId: 200100
  },
  {
    windowName: "music",
    color: "purple",
    groupedTabsInfo: [],
    isOpen: false,
    tabs: [
      {
        favIconUrl: "https://www.youtube.com/s/desktop/fe9b36c2/img/favicon_32x32.png",
        groupId: -1,
        id: 200201,
        title: "LoFi Hip Hop",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A"
      },
      {
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png",
        groupId: -1,
        id: 200202,
        title: "Spotify",
        url: "https://open.spotify.com/"
      },
      {
        favIconUrl: "https://soundcloud.com/favicon.ico",
        groupId: -1,
        id: 200203,
        title: "SoundCloud",
        url: "https://soundcloud.com/"
      }
    ],
    windowId: 200200
  },
  {
    windowName: "shopping",
    color: "pink",
    groupedTabsInfo: [],
    isOpen: true,
    tabs: [
      {
        favIconUrl: "https://www.amazon.com/favicon.ico",
        groupId: -1,
        id: 200301,
        title: "Amazon",
        url: "https://www.amazon.com/"
      },
      {
        favIconUrl: "https://www.ebay.com/favicon.ico",
        groupId: -1,
        id: 200302,
        title: "eBay",
        url: "https://www.ebay.com/"
      },
      {
        favIconUrl: "https://target.com/favicon.ico",
        groupId: -1,
        id: 200303,
        title: "Target",
        url: "https://www.target.com/"
      }
    ],
    windowId: 200300
  },
  {
    windowName: "news",
    color: "orange",
    groupedTabsInfo: [],
    isOpen: false,
    tabs: [
      {
        favIconUrl: "https://www.bbc.com/favicon.ico",
        groupId: -1,
        id: 200401,
        title: "BBC News",
        url: "https://www.bbc.com/"
      },
      {
        favIconUrl: "https://www.cnn.com/favicon.ico",
        groupId: -1,
        id: 200402,
        title: "CNN",
        url: "https://www.cnn.com/"
      },
      {
        favIconUrl: "https://www.reuters.com/pf/resources/images/reuters/favicon.ico",
        groupId: -1,
        id: 200403,
        title: "Reuters",
        url: "https://www.reuters.com/"
      }
    ],
    windowId: 200400
  },
  {
    windowName: "gaming",
    color: "red",
    groupedTabsInfo: [],
    isOpen: true,
    tabs: [
      {
        favIconUrl: "https://store.steampowered.com/favicon.ico",
        groupId: -1,
        id: 200501,
        title: "Steam Store",
        url: "https://store.steampowered.com/"
      },
      {
        favIconUrl: "https://www.epicgames.com/favicon.ico",
        groupId: -1,
        id: 200502,
        title: "Epic Games",
        url: "https://www.epicgames.com/"
      },
      {
        favIconUrl: "https://www.ign.com/favicon.ico",
        groupId: -1,
        id: 200503,
        title: "IGN",
        url: "https://www.ign.com/"
      }
    ],
    windowId: 200500
  },
  {
    windowName: "coding",
    color: "cyan",
    groupedTabsInfo: [],
    isOpen: true,
    tabs: [
      {
        favIconUrl: "https://github.com/favicon.ico",
        groupId: -1,
        id: 200601,
        title: "GitHub",
        url: "https://github.com/"
      },
      {
        favIconUrl: "https://code.visualstudio.com/favicon.ico",
        groupId: -1,
        id: 200602,
        title: "Visual Studio Code",
        url: "https://code.visualstudio.com/"
      },
      {
        favIconUrl: "https://git-scm.com/favicon.ico",
        groupId: -1,
        id: 200603,
        title: "Git",
        url: "https://git-scm.com/"
      }
    ],
    windowId: 200600
  },
  {
    windowName: "social",
    color: "yellow",
    groupedTabsInfo: [],
    isOpen: false,
    tabs: [
      {
        favIconUrl: "https://twitter.com/favicon.ico",
        groupId: -1,
        id: 200701,
        title: "Twitter",
        url: "https://twitter.com/"
      },
      {
        favIconUrl: "https://www.facebook.com/favicon.ico",
        groupId: -1,
        id: 200702,
        title: "Facebook",
        url: "https://www.facebook.com/"
      },
      {
        favIconUrl: "https://www.instagram.com/favicon.ico",
        groupId: -1,
        id: 200703,
        title: "Instagram",
        url: "https://www.instagram.com/"
      }
    ],
    windowId: 200700
  }
];

 
 
const Options = () => {

  

  document.documentElement.style.zoom = "85%";
  const sortingOptions: OptionsPageSort[] = [OptionsPageSort.nameAsc, OptionsPageSort.nameDes, OptionsPageSort.statusOpen, OptionsPageSort.statusSaved];

  const [currentSort, setCurrentSort] = useState<OptionsPageSort | null>(null);
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState<any[]>(windowsData);
  const [originalArrayOfTrackedWindowValues, setOriginalArrayOfTrackedWindowValues] = useState<any[]>(windowsData);

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [layout, setLayout] = useState<OptionsPageLayout | null>("card");
  const [theme, setTheme] = useState<Theme | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [testTheme, setTestTheme] = useState<boolean>(true)
  const [spinLayoutIcon, setSpinLayoutIcon] = useState(false)

  useEffect(() => {

    if (testTheme === true) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = "#111827"
    } 
    else {
      
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = "#f9fafb";

    }

  }, [testTheme])


  // useEffect(()=>{
  //   chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData: ExtensionData)=>{
      
  //     const trackedWindowValues: any[] = Object.values(responseExtensionData.trackedWindows)
      
  //     setArrayOfTrackedWindowValues(trackedWindowValues)
  //     setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
  //     setTheme(responseExtensionData.theme)
  //     setCurrentSort(responseExtensionData.optionsPageSort)
  //     setLayout(responseExtensionData.optionsPageLayout)
  //   })
    
  //   chrome.runtime.onMessage.addListener((message) => {
      
  //     if (message.signal !== 'changeOptions') return

  //     const trackedWindowValues: any[] = Object.values(message.trackedWindows)
  //     setArrayOfTrackedWindowValues(trackedWindowValues)
  //     setOriginalArrayOfTrackedWindowValues(trackedWindowValues)
  //   })
  // },[])



  useEffect(()=>{

    if (!currentSort) return

    switch (currentSort) {

      case OptionsPageSort.nameAsc:

        const nameSortAsc = arrayOfTrackedWindowValues.sort((a,b) => b.windowName.localeCompare(a.windowName))
        setArrayOfTrackedWindowValues(nameSortAsc)
        break
        

      case OptionsPageSort.nameDes:

        const nameSortDes: any[] = arrayOfTrackedWindowValues.sort((a,b) => a.windowName.localeCompare(b.windowName))
        setArrayOfTrackedWindowValues(nameSortDes)
        break
      
      case OptionsPageSort.statusOpen:

        const nameSortOpen = arrayOfTrackedWindowValues.sort((a,b) => b.isOpen - a.isOpen)
        setArrayOfTrackedWindowValues(nameSortOpen)
        break

      case OptionsPageSort.statusSaved:

        const nameSortSaved = arrayOfTrackedWindowValues.sort((a,b) => a.isOpen - b.isOpen)
        setArrayOfTrackedWindowValues(nameSortSaved)
        break
      default:
        console.warn("Not a valid sort")
        break
    }
  },[currentSort])
  // },[currentSort, arrayOfTrackedWindowValues])


  function changeTheme(theme: Theme){
    document.documentElement.classList.add('transition-colors');
    document.documentElement.style.transitionDuration = '500ms';
        
    if (theme === 'dark') {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = "#111827";
      }
    } 
    else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.backgroundColor = "#f9fafb";
      }
    }
    
    setTimeout(() => {
      document.documentElement.classList.remove('transition-colors');
    }, 300);
    
    setTheme(theme);
  }


  function onThemeChangeClick() {
    chrome.runtime.sendMessage({signal: 'changeTheme'}, (theme: Theme)=>{
      changeTheme(theme)
    })
  }



  function onSearchType(text : string) {

    const searched = text.trim()
    setSearchQuery(searched)
    if (searched === "") {
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



  // if (theme === null || layout === null ||  currentSort === null) {
  //   return (
  //     <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
  //       <div className="relative">
  //         <div className="absolute inset-0 animate-ping">
  //           <IconBookmark className="h-12 w-12 text-blue-500/30 mb-4"/>
  //         </div>
  //         <IconBookmark className="h-12 w-12 text-blue-500 mb-4 relative z-10"/>
  //       </div>
  //       <div className="text-center space-y-2">
  //         <p className="text-gray-500 dark:text-gray-200 font-semibold text-lg">Auto Window Tracker</p>
  //         <p className="text-gray-400 dark:text-gray-400 text-sm">Loading data...</p>
  //       </div>
  //       <div className="mt-6 flex space-x-1">
  //         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
  //         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
  //         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-50 via-indigo-200 to-slate-50 dark:from-[#0f1934] dark:via-[#121f40] dark:to-[#101827] transition-all duration-500">

      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg dark:shadow-2xl border-b border-white/20 dark:border-gray-700/30">
        <div className="flex justify-between py-6 items-center max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center space-x-3 group">
            <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <IconBookmark className="h-8 w-8 text-white"/>
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
                  <span className="text-sm ml-1 text-blue-500 dark:text-blue-600 font-semibold">{arrayOfTrackedWindowValues.length} {arrayOfTrackedWindowValues.length === 1 ? "window" : "windows"}</span>
              </div>

            </div>

            <button 
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/60 hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-700/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setTestTheme(!testTheme)}
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
          <div className="w-full lg:flex-1 px-6" onClick={() => inputRef.current?.focus()}>
            <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search windows by name..." 
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => onSearchType(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 
                  bg-gray-100 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 
                  transition-all duration-300 focus:outline-none shadow-sm focus:shadow-lg text-lg font-medium
                  border border-gray-200 dark:border-gray-600/50 focus:border-blue-300 dark:focus:border-blue-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchType("")}
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
              title={layout === 'card' ? 'Switch to vertical layout' : 'Switch to card layout'}
            >
              <IconLayout className={`h-[35px] w-[35px] transition-transform group-hover:rotate-12 duration-300 ${spinLayoutIcon ? 'animate-spin-once' : ''}`} />
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
