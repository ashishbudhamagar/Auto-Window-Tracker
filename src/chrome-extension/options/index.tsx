// @ts-nocheck

import { useEffect, useState, useRef } from "react";
import "../global.css";
import { IconBookmark, IconX, IconExternal, IconWindows, IconDarkMode, IconLightMode } from "../icons/icons";

import CardLayout from "./CardLayout";
import VerticalLayout from "./VerticalLayout";

const sortingOptions = ['Name: ASC', 'Name: DES', 'Status: Open', 'Status: Saved']

// @ts-ignore
const asd = Object.values({
  devTools123: {
    windowName: "Dev + Tools",
    windowId: 201001,
    color: "white",
    isOpen: true,
    groupedTabsInfo: [],
    tabs: [
      {
        id: 301008,
        groupId: -1,
        url: "https://www.youtube.com/",
        favIconUrl: "https://www.youtube.com/favicon.ico",
        title: "YouTube"
      },
      {
        id: 301009,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301008,
        groupId: -1,
        url: "https://www.youtube.com/",
        favIconUrl: "https://www.youtube.com/favicon.ico",
        title: "YouTube"
      },
      {
        id: 301009,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301001,
        groupId: -1,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        favIconUrl: "https://developer.mozilla.org/favicon.ico",
        title: "JavaScript | MDN"
      },
      {
        id: 301002,
        groupId: -1,
        url: "https://reactjs.org/docs/getting-started.html",
        favIconUrl: "https://reactjs.org/favicon.ico",
        title: "React Docs"
      },
      {
        id: 301003,
        groupId: -1,
        url: "https://github.com/",
        favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
        title: "GitHub"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301008,
        groupId: -1,
        url: "https://www.youtube.com/",
        favIconUrl: "https://www.youtube.com/favicon.ico",
        title: "YouTube"
      },
      {
        id: 301009,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301001,
        groupId: -1,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        favIconUrl: "https://developer.mozilla.org/favicon.ico",
        title: "JavaScript | MDN"
      },
      {
        id: 301002,
        groupId: -1,
        url: "https://reactjs.org/docs/getting-started.html",
        favIconUrl: "https://reactjs.org/favicon.ico",
        title: "React Docs"
      },
      {
        id: 301003,
        groupId: -1,
        url: "https://github.com/",
        favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
        title: "GitHub"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301008,
        groupId: -1,
        url: "https://www.youtube.com/",
        favIconUrl: "https://www.youtube.com/favicon.ico",
        title: "YouTube"
      },
      {
        id: 301009,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      }
      ,
      {
        id: 301001,
        groupId: -1,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        favIconUrl: "https://developer.mozilla.org/favicon.ico",
        title: "JavaScript | MDN"
      },
      {
        id: 301002,
        groupId: -1,
        url: "https://reactjs.org/docs/getting-started.html",
        favIconUrl: "https://reactjs.org/favicon.ico",
        title: "React Docs"
      },
      {
        id: 301003,
        groupId: -1,
        url: "https://github.com/",
        favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
        title: "GitHub"
      }
    ]
  },
  studyStack456: {
    windowName: "Study Stack",
    windowId: 201002,
    color: "blue",
    isOpen: false,
    groupedTabsInfo: [],
    tabs: [
      {
        id: 301004,
        groupId: -1,
        url: "https://chat.openai.com/",
        favIconUrl: "https://chat.openai.com/favicon.ico",
        title: "ChatGPT"
      },
      {
        id: 301005,
        groupId: -1,
        url: "https://www.khanacademy.org/",
        favIconUrl: "https://www.khanacademy.org/favicon.ico",
        title: "Khan Academy"
      },
      {
        id: 301006,
        groupId: -1,
        url: "https://notion.so/",
        favIconUrl: "https://www.notion.so/images/favicon.ico",
        title: "Notion"
      },
      {
        id: 301007,
        groupId: -1,
        url: "https://canvas.northeastern.edu/",
        favIconUrl: "https://canvas.northeastern.edu/favicon.ico",
        title: "Canvas Dashboard"
      }
    ]
  },
  mediaAndChill789: {
    windowName: "Media & Chill",
    windowId: 201003,
    color: "gray",
    isOpen: false,
    groupedTabsInfo: [],
    tabs: [
      {
        id: 301008,
        groupId: -1,
        url: "https://www.youtube.com/",
        favIconUrl: "https://www.youtube.com/favicon.ico",
        title: "YouTube"
      },
      {
        id: 301009,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 301010,
        groupId: -1,
        url: "https://netflix.com/",
        favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
        title: "Netflix"
      },
      
    ]
  },
  devTools12223: {
     windowName: "Dev + Tools",
     windowId: 201001,
     color: "white",
     isOpen: true,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       }
       ,
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       }
       ,
       {
         id: 301001,
         groupId: -1,
         url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
         favIconUrl: "https://developer.mozilla.org/favicon.ico",
         title: "JavaScript | MDN"
       },
       {
         id: 301002,
         groupId: -1,
         url: "https://reactjs.org/docs/getting-started.html",
         favIconUrl: "https://reactjs.org/favicon.ico",
         title: "React Docs"
       },
       {
         id: 301003,
         groupId: -1,
         url: "https://github.com/",
         favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
         title: "GitHub"
       }
     ]
   },
   studyStac22k456: {
     windowName: "Study Stack",
     windowId: 201002,
     color: "blue",
     isOpen: false,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301004,
         groupId: -1,
         url: "https://chat.openai.com/",
         favIconUrl: "https://chat.openai.com/favicon.ico",
         title: "ChatGPT"
       },
       {
         id: 301005,
         groupId: -1,
         url: "https://www.khanacademy.org/",
         favIconUrl: "https://www.khanacademy.org/favicon.ico",
         title: "Khan Academy"
       },
       {
         id: 301006,
         groupId: -1,
         url: "https://notion.so/",
         favIconUrl: "https://www.notion.so/images/favicon.ico",
         title: "Notion"
       },
       {
         id: 301007,
         groupId: -1,
         url: "https://canvas.northeastern.edu/",
         favIconUrl: "https://canvas.northeastern.edu/favicon.ico",
         title: "Canvas Dashboard"
       }
     ]
   },
   mediaAnd222Chill789: {
     windowName: "Media & Chill",
     windowId: 201003,
     color: "gray",
     isOpen: false,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       },
       
     ]
   },
   devTo12312ols123: {
     windowName: "Dev + Tools",
     windowId: 201001,
     color: "white",
     isOpen: true,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       }
       ,
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       }
       ,
       {
         id: 301001,
         groupId: -1,
         url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
         favIconUrl: "https://developer.mozilla.org/favicon.ico",
         title: "JavaScript | MDN"
       },
       {
         id: 301002,
         groupId: -1,
         url: "https://reactjs.org/docs/getting-started.html",
         favIconUrl: "https://reactjs.org/favicon.ico",
         title: "React Docs"
       },
       {
         id: 301003,
         groupId: -1,
         url: "https://github.com/",
         favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
         title: "GitHub"
       }
     ]
   },
   stud22yStack456: {
     windowName: "Study Stack",
     windowId: 201002,
     color: "blue",
     isOpen: false,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301004,
         groupId: -1,
         url: "https://chat.openai.com/",
         favIconUrl: "https://chat.openai.com/favicon.ico",
         title: "ChatGPT"
       },
       {
         id: 301005,
         groupId: -1,
         url: "https://www.khanacademy.org/",
         favIconUrl: "https://www.khanacademy.org/favicon.ico",
         title: "Khan Academy"
       },
       {
         id: 301006,
         groupId: -1,
         url: "https://notion.so/",
         favIconUrl: "https://www.notion.so/images/favicon.ico",
         title: "Notion"
       },
       {
         id: 301007,
         groupId: -1,
         url: "https://canvas.northeastern.edu/",
         favIconUrl: "https://canvas.northeastern.edu/favicon.ico",
         title: "Canvas Dashboard"
       }
     ]
   },
   media11AndChill789: {
     windowName: "Media & Chill",
     windowId: 201003,
     color: "gray",
     isOpen: false,
     groupedTabsInfo: [],
     tabs: [
       {
         id: 301008,
         groupId: -1,
         url: "https://www.youtube.com/",
         favIconUrl: "https://www.youtube.com/favicon.ico",
         title: "YouTube"
       },
       {
         id: 301009,
         groupId: -1,
         url: "https://open.spotify.com/",
         favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
         title: "Spotify"
       },
       {
         id: 301010,
         groupId: -1,
         url: "https://netflix.com/",
         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
         title: "Netflix"
       },
       
     ]
   }

  
})



const Options = () => {

  document.documentElement.style.backgroundColor = "#f3f4f6";
  document.documentElement.style.zoom = "85%";
  
  const [currentSort, setCurrentSort] = useState(sortingOptions[0]);
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState([]);
  const [copyArrayOfWin, setCopyArrayOfWin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [layout, setLayout] = useState('card')
  const [theme, setTheme] = useState(null)
  
  const inputRef = useRef(null);
  
  

  useEffect(()=>{
    // chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{

    //   setArrayOfTrackedWindowValues(Object.values(responseExtensionData.trackedWindows))
    //   setCopyArrayOfWin(Object.values(responseExtensionData.trackedWindows))
    //   setCurrentSort(responseExtensionData.optionsPageSort)
    //   setTheme(responseExtensionData.themeMode)
    // })
    
    // // @ts-ignore
    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      
    //   if (message.signal !== 'changeOptions') return
      
    //   setArrayOfTrackedWindowValues(Object.values(message.trackedWindows))
    //   setCopyArrayOfWin(Object.values(message.trackedWindows))
    // })

  },[])



  useEffect(()=>{
    // if (currentSort === '') return

    // switch (currentSort) {

    //   // case sortingOptions[0]:
    //   case 'Name: ASC':

    //     // @ts-ignore
    //     const nameSortAsc = [...arrayOfTrackedWindowValues].sort((a,b) => a.windowName.localeCompare(b.windowName))
    //     setArrayOfTrackedWindowValues(nameSortAsc)
    //     break

    //   case 'Name: DES':
    //     // @ts-ignore

    //     const nameSortDes = [...arrayOfTrackedWindowValues].sort((a,b) => b.windowName.localeCompare(a.windowName))
    //     setArrayOfTrackedWindowValues(nameSortDes)
    //     break
      
    //   case 'Status: Open':
    //     // @ts-ignore
    //     const nameSortOpen = [...arrayOfTrackedWindowValues].sort((a,b) => b.isOpen - a.isOpen)
    //     setArrayOfTrackedWindowValues(nameSortOpen)
    //     break

    //   case 'Status: Saved':
    //     // @ts-ignore
    //     const nameSortSaved = [...arrayOfTrackedWindowValues].sort((a,b) => a.isOpen - b.isOpen)
    //     setArrayOfTrackedWindowValues(nameSortSaved)
    //     break
    //   default:
    //     console.warn("No valid sort")
    //     break
    // }
  },[currentSort])


  function onThemeChange() {
    // chrome.runtime.sendMessage({signal: 'changeTheme'}, (themeMode)=>{
    //   setTheme(themeMode)
    // })
  }



  function onSearchType(text : string) {

    // const searched = text.trim()
    // setSearchQuery(text)

    // searched === "" ?
    //   setArrayOfTrackedWindowValues(copyArrayOfWin)
    //   :
    //   // @ts-ignore
    //   setArrayOfTrackedWindowValues(copyArrayOfWin.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
  }


  function onUntrackWindowClick(windowName : string) {
    // chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  }

  function onOpenSavedWindowClick(isOpen: boolean, windowName: string) {
    // if (isOpen === true) {
    //   alert("Cannot open opened window")
    //   return
    // }

    // let openedWindowDetails = null
    // for (let trackedWindow of arrayOfTrackedWindowValues) {
    //   // @ts-ignore
    //   if (trackedWindow.windowName === windowName) {
    //     openedWindowDetails = trackedWindow
    //     break
    //   }
    // }
    // if (!openedWindowDetails) {
    //   alert('Saved window not found')
    // }

    // chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  }





  if (currentSort === null || theme === null) return

  return (
    <div className="h-full w-auto">

      <header className=" bg-white shadow-md">
        <div className="flex justify-between py-6 items-center
          max-w-[93rem] mx-auto px-5 md:px-40
        ">

          <div>
            <h1 className="flex items-center justify-center space-x-3">
              <IconBookmark className="h-8 w-8 text-blue-400"/>
              <p className="font-semibold text-[25px]">Auto Window Tracker</p>
            </h1>
          </div>

          <div className="flex items-center justify-center ">

            <p className="font-medium text-gray-500">Tracked Windows: {
            // @ts-ignore
            arrayOfTrackedWindowValues.length} (Opened: {arrayOfTrackedWindowValues.filter(ele=> ele.isOpen).length})</p>

            <button className="hover:bg-gray-200 p-1 rounded-md ml-6"
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



      <main className="mt-10  mx-auto px-4 md:px-40 transition-all duration-500 max-w-[93rem]">

        <div className="bg-white w-full h-auto flex py-5 items-center justify-center rounded-lg mb-8 shadow-md flex-col md:flex-row">

          <div className="flex-[4] mr-5 w-full" 
          
          // @ts-ignore 
          onClick={(e)=>
          // @ts-ignore
            inputRef.current?.focus()}>

            <div className="flex max-w-[35rem] p-3 rounded-md border-2 border-gray-300 ml-5 justify-center items-center space-x-2
              focus-within:border-gray-400 hover:border-gray-400  transition-colors duration-200
            ">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search windows..." ref={inputRef}

                value={searchQuery}
                onChange={(e)=>onSearchType(e.target.value)}
                className=" w-full focus:outline-none ext-gray-600"
              />
            </div>

          </div>

          <div className="flex-1 flex justify-center items-center mr-5">



            
              <div className="mr-auto flex items-center ">

                <label htmlFor="sort" className="mr-1 whitespace-nowrap">Sort by :</label>
                <select id="sort" className="hover:bg-gray-200 py-2 rounded-md transition-colors duration-300 "
                value={currentSort}
                onChange={(e)=>setCurrentSort(e.target.value)}
                >
                    {
                      sortingOptions.map((ele, index)=>(
                        <option value={ele} key={index}>{ele}</option>
                      ))
                    }
                </select>

                <div className="hover:bg-gray-200 px-0 w-16 rounded-md transition-colors duration-300 ml-2 hover:cursor-pointer"
                  onClick={()=> layout === 'card' ? setLayout('vertical') : setLayout('card')}
                >
                  <IconWindows className="h-10 w-5 mx-auto"/>
                </div>
              </div>
              
          </div>
        </div>



        {

          arrayOfTrackedWindowValues.length === 0 ? 
          
          
          (
            <div className="flex justify-center items-center h-[200px]">
              <div className="font-medium text-gray-400 text-2xl">No windows tracked</div>
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