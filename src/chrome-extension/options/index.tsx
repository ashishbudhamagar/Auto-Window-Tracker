// @ts-nocheck

import { useEffect, useState, useRef } from "react";
import "../global.css";
import { IconBookmark, IconX, IconExternal } from "../icons/icons";
import noimage from '../icons/no-image.jpg';

// const trackedWindows = {
//   win0: {
//     windowName: "Entertainment",
//     windowId: 101008,
//     color: "gray",
//     isOpen: false,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300500,
//         groupId: -1,
//         url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//         favIconUrl: "https://www.youtube.com/favicon.ico",
//         title: "Rick Astley - Never Gonna Give You Up"
//       },
//       {
//         id: 300501,
//         groupId: -1,
//         url: "https://netflix.com/",
//         favIconUrl: "https://assets.nflxext.com/us/icons/nficon2016.ico",
//         title: "Netflix"
//       }
//     ]
//   },
//   win15tabs: {
//     windowName: "Big Research Window",
//     windowId: 102000,
//     color: "teal",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 400000,
//         groupId: -1,
//         url: "https://www.reddit.com/",
//         favIconUrl: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
//         title: "Reddit - Dive into anything"
//       },
//       {
//         id: 400001,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 400002,
//         groupId: -1,
//         url: "https://www.youtube.com/watch?v=abc123",
//         favIconUrl: "https://www.youtube.com/favicon.ico",
//         title: "YouTube Video"
//       },
//       {
//         id: 400003,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 400004,
//         groupId: -1,
//         url: "https://www.nytimes.com/",
//         favIconUrl: "https://www.nytimes.com/favicon.ico",
//         title: "The New York Times"
//       },
//       {
//         id: 400005,
//         groupId: -1,
//         url: "https://chat.openai.com/",
//         favIconUrl: "https://chat.openai.com/favicon.ico",
//         title: "ChatGPT"
//       },
//       {
//         id: 400006,
//         groupId: -1,
//         url: "https://chat.openai.com/",
//         favIconUrl: "https://chat.openai.com/favicon.ico",
//         title: "ChatGPT"
//       },
//       {
//         id: 400007,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 400008,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 400009,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 400010,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 400011,
//         groupId: -1,
//         url: "https://chat.openai.com/",
//         favIconUrl: "https://chat.openai.com/favicon.ico",
//         title: "ChatGPT"
//       },
//       {
//         id: 400012,
//         groupId: -1,
//         url: "https://www.reddit.com/",
//         favIconUrl: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
//         title: "Reddit - Dive into anything"
//       },
//       {
//         id: 400013,
//         groupId: -1,
//         url: "https://www.reddit.com/",
//         favIconUrl: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
//         title: "Reddit - Dive into anything"
//       },
//       {
//         id: 400014,
//         groupId: -1,
//         url: "https://twitter.com/",
//         favIconUrl: "https://abs.twimg.com/favicons/twitter.ico",
//         title: "Twitter"
//       },
//       {
//         id: 300000,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 300001,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 300002,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 300003,
//         groupId: -1,
//         url: "https://codepen.io/",
//         favIconUrl: "https://codepen.io/favicon.ico",
//         title: "CodePen"
//       },
//       {
//         id: 300000,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 300001,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 300002,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 300003,
//         groupId: -1,
//         url: "https://codepen.io/",
//         favIconUrl: "https://codepen.io/favicon.ico",
//         title: "CodePen"
//       },
//       {
//         id: 300000,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 300001,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 300002,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 300003,
//         groupId: -1,
//         url: "https://codepen.io/",
//         favIconUrl: "https://codepen.io/favicon.ico",
//         title: "CodePen"
//       }
//     ]
//   },
//   win1: {
//     windowName: "Docs + Tools",
//     windowId: 101003,
//     color: "white",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300000,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       },
//       {
//         id: 300001,
//         groupId: -1,
//         url: "https://news.ycombinator.com/",
//         favIconUrl: "https://news.ycombinator.com/favicon.ico",
//         title: "Hacker News"
//       },
//       {
//         id: 300002,
//         groupId: -1,
//         url: "https://www.google.com/",
//         favIconUrl: "https://www.google.com/favicon.ico",
//         title: "Google"
//       },
//       {
//         id: 300003,
//         groupId: -1,
//         url: "https://codepen.io/",
//         favIconUrl: "https://codepen.io/favicon.ico",
//         title: "CodePen"
//       }
//     ]
//   },
//   win2: {
//     windowName: "News",
//     windowId: 101004,
//     color: "green",
//     isOpen: false,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300100,
//         groupId: -1,
//         url: "https://www.nytimes.com/",
//         favIconUrl: "https://www.nytimes.com/favicon.ico",
//         title: "The New York Times"
//       },
//       {
//         id: 300101,
//         groupId: -1,
//         url: "https://twitter.com/",
//         favIconUrl: "https://abs.twimg.com/favicons/twitter.ico",
//         title: "Twitter"
//       }
//     ]
//   },
//   win3: {
//     windowName: "Social Media",
//     windowId: 101005,
//     color: "blue",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300200,
//         groupId: -1,
//         url: "https://reddit.com/",
//         favIconUrl: "https://www.redditstatic.com/favicon.ico",
//         title: "Reddit"
//       },
//       {
//         id: 300201,
//         groupId: -1,
//         url: "https://chat.openai.com/",
//         favIconUrl: "https://chat.openai.com/favicon.ico",
//         title: "ChatGPT"
//       }
//     ]
//   },
//   win4: {
//     windowName: "Design Projects",
//     windowId: 101006,
//     color: "yellow",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300300,
//         groupId: -1,
//         url: "https://figma.com/",
//         favIconUrl: "https://static.figma.com/favicon.ico",
//         title: "Figma"
//       },
//       {
//         id: 300301,
//         groupId: -1,
//         url: "https://github.com/",
//         favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
//         title: "GitHub"
//       }
//     ]
//   },
//   win5: {
//     windowName: "Coding Resources",
//     windowId: 101007,
//     color: "purple",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300400,
//         groupId: -1,
//         url: "https://stackoverflow.com/",
//         favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico",
//         title: "Stack Overflow"
//       },
//       {
//         id: 300401,
//         groupId: -1,
//         url: "https://developer.mozilla.org/",
//         favIconUrl: "https://developer.mozilla.org/favicon.ico",
//         title: "MDN Web Docs"
//       }
//     ]
//   },

//   win7: {
//     windowName: "University Dashboard",
//     windowId: 101009,
//     color: "orange",
//     isOpen: true,
//     groupedTabsInfo: [],
//     tabs: [
//       {
//         id: 300600,
//         groupId: -1,
//         url: "https://northeastern.instructure.com/",
//         favIconUrl: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico",
//         title: "Canvas"
//       },
//       {
//         id: 300601,
//         groupId: -1,
//         url: "https://outlook.office.com/mail/",
//         favIconUrl: "https://res.cdn.office.net/assets/mail/favicon.ico",
//         title: "Outlook Mail"
//       }
//     ]
//   },
  
// };


const sortingOptions = ['Name: ASC', 'Name: DES', 'Status: Open', 'Status: Saved']


const Options = () => {

  const [currentSort, setCurrentSort] = useState('');
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState([]);
  const [copyArrayOfWin, setCopyArrayOfWin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null);


  document.body.style.zoom = "85%";


  useEffect(()=>{

    chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{
      setArrayOfTrackedWindowValues(Object.values(responseExtensionData.trackedWindows))
      setCopyArrayOfWin(Object.values(responseExtensionData.trackedWindows))
      setCurrentSort(responseExtensionData.optionsPageSort)
    })

    // @ts-ignore
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.signal !== 'changeOptions') return
      
      setArrayOfTrackedWindowValues(Object.values(message.trackedWindows))
      setCopyArrayOfWin(Object.values(message.trackedWindows))
    })
  },[])



  useEffect(()=>{
    if (currentSort === '') return

    switch (currentSort) {

      // case sortingOptions[0]:
      case 'Name: ASC':

        const nameSortAsc = [...arrayOfTrackedWindowValues].sort((a,b) => a.windowName.localeCompare(b.windowName))
        setArrayOfTrackedWindowValues(nameSortAsc)
        break

      case 'Name: DES':

        const nameSortDes = [...arrayOfTrackedWindowValues].sort((a,b) => b.windowName.localeCompare(a.windowName))
        setArrayOfTrackedWindowValues(nameSortDes)
        break
      
      case 'Status: Open':
        const nameSortOpen = [...arrayOfTrackedWindowValues].sort((a,b) => b.isOpen - a.isOpen)
        setArrayOfTrackedWindowValues(nameSortOpen)
        break

      case 'Status: Saved':
        const nameSortSaved = [...arrayOfTrackedWindowValues].sort((a,b) => a.isOpen - b.isOpen)
        setArrayOfTrackedWindowValues(nameSortSaved)
        break
      default:
        console.warn("No valid sort")
        break
    }
  },[currentSort])



  function onSearchType(e) {
    const searched = (e.target.value).trim()
    setSearchQuery(e.target.value)

    searched === "" ?
      setArrayOfTrackedWindowValues(copyArrayOfWin)
      :
      setArrayOfTrackedWindowValues(copyArrayOfWin.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
      
  }


  function onUntrackWindowClick(windowName) {
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
    if (!openedWindowDetails) {
      alert('Saved window not found')
    }

    chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  }

  function onUntrackWIndow(windowName: string) {
    chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  }


  if (currentSort === '') return

  return (
    <div className="min-h-screen w-auto bg-gray-100">

      <header className=" bg-white shadow-md">
        <div className="flex justify-between py-6 items-center
          max-w-[93rem] mx-auto px-5 md:px-40
        ">

          <div className="">
            <h1 className="flex items-center justify-center space-x-3">
              <IconBookmark className="h-8 w-8 text-blue-400"/>
              <p className="font-semibold text-[25px]">Auto Window Tracker</p>
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <p className="font-medium text-gray-500">Tracked Windows: {arrayOfTrackedWindowValues.length} (Opened: {arrayOfTrackedWindowValues.filter(ele=> ele.isOpen).length})</p>
          </div>

        </div>
      </header>




      <main className="mt-10 mx-auto px-4 md:px-40 transition-all duration-500 max-w-[93rem]">

        <div className="bg-white w-full h-auto flex py-5 items-center justify-center rounded-lg mb-8 shadow-md flex-col md:flex-row">

          <div className="flex-[4] mr-5 w-full" onClick={(e)=>inputRef.current?.focus()}>

            <div className="flex max-w-[35rem] p-3 rounded-md border-2 border-gray-300 ml-5 justify-center items-center space-x-2
              focus-within:border-gray-400 hover:border-gray-400  transition-colors duration-200
            ">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search windows..." ref={inputRef}
                onChange={onSearchType}
                value={searchQuery}
                className=" w-full focus:outline-none ext-gray-600"
              />
            </div>

          </div>

          <div className="flex-1 flex justify-center items-center mr-5">


            <div className="flex flex-col space-y-2">

             <div className="mr-auto ">
                <label htmlFor="sort" className="mr-1 whitespace-nowrap">Sort by :</label>
                  <select id="sort" className="hover:bg-gray-200 p-2 rounded-md transition-colors duration-300"
                  value={currentSort}
                  onChange={(e)=>setCurrentSort(e.target.value)}
                  >
                      {
                        sortingOptions.map((ele, index)=>(
                          <option value={ele} key={index}>{ele}</option>
                        ))
                      }
                  </select>
             </div>

              
            </div>

          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            // @ts-ignore
            arrayOfTrackedWindowValues.map((window : any, index)=>(


              <div className={`bg-white h-[17rem] w-full rounded-lg px-7 py-5 border-l-[5px] flex flex-col justify-between
                hover:-translate-y-1 hover:shadow-[7px_7px_5px_rgba(0,0,0,0.3)] transition-all shadow-md
                ${window.isOpen ? "border-green-500 " : "border-blue-500 "}
              `} key={index}>

                <div>
                  <div className="flex justify-between">
                    <h1 className="text-2xl">{window.windowName}</h1>
                    <p className={` rounded-2xl px-3 py-1  flex items-center  ${window.isOpen ? " bg-green-200 text-green-700" : "bg-blue-200 text-blue-700"}`}>{window.isOpen ? "Open" : "Saved"}</p>
                  </div>

                  <div className="mt-2 mb-3">
                    <div className="flex space-x-3 items-center">
                      <div className="border-2 h-1 w-1 py-[5px] px-[8px] mt-[2px] rounded-md border-gray-400"></div>
                      <p className="text-gray-600">{
                          window.tabs.length === 0 ? "0 tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
                        }</p>
                    </div>
                  </div>
                
                  <div className="flex flex-col space-y-[2px]">
                    {
                        // @ts-ignore
                        window.tabs.slice(0,4).map((tab, index)=>(
                          <a href={tab.url} className="hover:text-blue-700 hover:underline" target="_blank" key={index}>
                            {
                              <div className="flex items-center space-x-2">
                                <img src={tab.favIconUrl} alt="Website Icon" className="w-5 h-5 rounded-md" onError={(e)=>{
                                  e.currentTarget.onerror = null
                                  e.currentTarget.src=noimage
                                }}/>
                                <p className="truncate">{tab.title}</p>
                              
                              </div>
                            }
                            </a>
                        ))
                      }

                      <div className="flex mt-2 items-center text-gray-500 flex-wrap h-8">
                        {
                          // @ts-ignore
                          window.tabs.slice(4,15).map((tab, index)=>(
                            <a href={tab.url} target="_blank" key={index}>
                              <img src={tab.favIconUrl} alt="Website Icon" className="w-5 h-5 mr-[3px] rounded-md hover:h-7 hover:w-7 transition-all" />
                            </a>
                          ))
                        }
                        {window.tabs.length > 15 ? `...${window.tabs.length - 15}+` : ""}
                      </div>

                  </div>

                </div>

                <div className="flex justify-between ">
                  <button className="flex bg-red-50 rounded-md py-1 px-3 items-center space-x-1 hover:bg-red-200"
                  onClick={()=>onUntrackWindowClick(window.windowName)}
                  >
                    <IconX className="h-[18px] w-[18px] text-red-400"/>
                    <p className="text-red-400 font-medium" >Untrack</p>
                    </button>
                  <button className={`flex items-center py-1 px-3  rounded-md space-x-1 ${window.isOpen ? "bg-green-100" : "bg-blue-200"}
                    ${window.isOpen ? "hover:cursor-not-allowed" : "hover:bg-blue-300"}
                  `}
                  disabled={window.isOpen}
                  onClick={()=>onOpenSavedWindowClick(window.isOpen, window.windowName)}
                  >
                    <IconExternal className={` h-[20px] w-[20px] ${window.isOpen ? "text-green-600" : "text-blue-500"}`}/>
                    <p className={` font-medium ${window.isOpen ? "text-green-600" : "text-blue-500"}`}>{window.isOpen ? "Already Open" : "Open Window"}</p>
                  </button>

                </div>

              </div>

            ))
          }



        </div>







      </main>
    </div>
  )
};


export default Options


