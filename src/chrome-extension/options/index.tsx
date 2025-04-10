
// import { useEffect, useState, useRef } from "react";
// import "../global.css";
// // @ts-ignore
// import { IconBookmark, IconX, IconExternal } from "../icons/icons";
// import extensionIcon from '../icons/auto-tack-track-icon.png';


// const sortingOptions = ['Name: ASC', 'Name: DES', 'Status: Open', 'Status: Saved']


// const Options = () => {

//   const [currentSort, setCurrentSort] = useState('');
//   const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState([]);
//   const [copyArrayOfWin, setCopyArrayOfWin] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('')
//   const inputRef = useRef(null);


//   document.body.style.zoom = "85%";


//   useEffect(()=>{

//     chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{
//       setArrayOfTrackedWindowValues(Object.values(responseExtensionData.trackedWindows))
//       setCopyArrayOfWin(Object.values(responseExtensionData.trackedWindows))
//       setCurrentSort(responseExtensionData.optionsPageSort)
//     })

//     // @ts-ignore
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       if (message.signal !== 'changeOptions') return
      
//       setArrayOfTrackedWindowValues(Object.values(message.trackedWindows))
//       setCopyArrayOfWin(Object.values(message.trackedWindows))
//     })
//   },[])



//   useEffect(()=>{
//     if (currentSort === '') return

//     switch (currentSort) {

//       // case sortingOptions[0]:
//       case 'Name: ASC':

//         // @ts-ignore
//         const nameSortAsc = [...arrayOfTrackedWindowValues].sort((a,b) => a.windowName.localeCompare(b.windowName))
//         setArrayOfTrackedWindowValues(nameSortAsc)
//         break

//       case 'Name: DES':
//         // @ts-ignore

//         const nameSortDes = [...arrayOfTrackedWindowValues].sort((a,b) => b.windowName.localeCompare(a.windowName))
//         setArrayOfTrackedWindowValues(nameSortDes)
//         break
      
//       case 'Status: Open':
//         // @ts-ignore
//         const nameSortOpen = [...arrayOfTrackedWindowValues].sort((a,b) => b.isOpen - a.isOpen)
//         setArrayOfTrackedWindowValues(nameSortOpen)
//         break

//       case 'Status: Saved':
//         // @ts-ignore
//         const nameSortSaved = [...arrayOfTrackedWindowValues].sort((a,b) => a.isOpen - b.isOpen)
//         setArrayOfTrackedWindowValues(nameSortSaved)
//         break
//       default:
//         console.warn("No valid sort")
//         break
//     }
//   },[currentSort])



//   // @ts-ignore
//   function onSearchType(e) {
//     const searched = (e.target.value).trim()
//     setSearchQuery(e.target.value)

//     searched === "" ?
//       setArrayOfTrackedWindowValues(copyArrayOfWin)
//       :
//       // @ts-ignore
//       setArrayOfTrackedWindowValues(copyArrayOfWin.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
      
//   }


//   function onUntrackWindowClick(windowName : string) {
//     chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
//   }

//   function onOpenSavedWindowClick(isOpen: boolean, windowName: string) {
//     if (isOpen === true) {
//       alert("Cannot open opened window")
//       return
//     }

//     let openedWindowDetails = null
//     for (let trackedWindow of arrayOfTrackedWindowValues) {
//       // @ts-ignore
//       if (trackedWindow.windowName === windowName) {
//         openedWindowDetails = trackedWindow
//         break
//       }
//     }
//     if (!openedWindowDetails) {
//       alert('Saved window not found')
//     }

//     chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
//   }



//   if (currentSort === '') return

//   return (
//     <div className="min-h-screen w-auto bg-gray-100">

//       <header className=" bg-white shadow-md">
//         <div className="flex justify-between py-6 items-center
//           max-w-[93rem] mx-auto px-5 md:px-40
//         ">

//           <div className="">
//             <h1 className="flex items-center justify-center space-x-3">
//               {/* <IconBookmark className="h-8 w-8 text-blue-400"/> */}
//               <img src={extensionIcon} alt="" className="h-12 w-12 text-blue-600" />
//               <p className="font-semibold text-[25px]">Auto Window Tracker</p>
//             </h1>
//           </div>

//           <div className="flex items-center justify-center">

//             <p className="font-medium text-gray-500">Tracked Windows: {
//             // @ts-ignore
//             arrayOfTrackedWindowValues.length} (Opened: {arrayOfTrackedWindowValues.filter(ele=> ele.isOpen).length})</p>
//           </div>

//         </div>
//       </header>




//       <main className="mt-10 mx-auto px-4 md:px-40 transition-all duration-500 max-w-[93rem]">

//         <div className="bg-white w-full h-auto flex py-5 items-center justify-center rounded-lg mb-8 shadow-md flex-col md:flex-row">

//           <div className="flex-[4] mr-5 w-full" 
          
//           // @ts-ignore
//           onClick={(e)=>
//           // @ts-ignore
//             inputRef.current?.focus()}>

//             <div className="flex max-w-[35rem] p-3 rounded-md border-2 border-gray-300 ml-5 justify-center items-center space-x-2
//               focus-within:border-gray-400 hover:border-gray-400  transition-colors duration-200
//             ">
//               <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <input type="text" placeholder="Search windows..." ref={inputRef}
//                 onChange={onSearchType}
//                 value={searchQuery}
//                 className=" w-full focus:outline-none ext-gray-600"
//               />
//             </div>

//           </div>

//           <div className="flex-1 flex justify-center items-center mr-5">


//             <div className="flex flex-col space-y-2">

//              <div className="mr-auto ">
//                 <label htmlFor="sort" className="mr-1 whitespace-nowrap">Sort by :</label>
//                   <select id="sort" className="hover:bg-gray-200 p-2 rounded-md transition-colors duration-300"
//                   value={currentSort}
//                   onChange={(e)=>setCurrentSort(e.target.value)}
//                   >
//                       {
//                         sortingOptions.map((ele, index)=>(
//                           <option value={ele} key={index}>{ele}</option>
//                         ))
//                       }
//                   </select>
//              </div>

              
//             </div>

//           </div>
//         </div>


//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

//           {
//             // @ts-ignore
//             arrayOfTrackedWindowValues.map((window : any, index)=>(


//               <div className={`bg-white h-[17rem] w-full rounded-lg px-7 py-5 border-l-[5px] flex flex-col justify-between
//                 hover:-translate-y-1 hover:shadow-[7px_7px_5px_rgba(0,0,0,0.3)] transition-all shadow-md
//                 ${window.isOpen ? "border-green-500 " : "border-blue-500 "}
//               `} key={index}>

//                 <div>
//                   <div className="flex justify-between">
//                     <h1 className="text-2xl">{window.windowName}</h1>
//                     <p className={` rounded-2xl px-3 py-1  flex items-center  ${window.isOpen ? " bg-green-200 text-green-700" : "bg-blue-200 text-blue-700"}`}>{window.isOpen ? "Open" : "Saved"}</p>
//                   </div>

//                   <div className="mt-2 mb-3">
//                     <div className="flex space-x-3 items-center">
//                       <div className="border-2 h-1 w-1 py-[5px] px-[8px] mt-[2px] rounded-md border-gray-400"></div>
//                       <p className="text-gray-600">{
//                           window.tabs.length === 0 ? "0 tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
//                         }</p>
//                     </div>
//                   </div>
                
//                   <div className="flex flex-col space-y-[2px]">
//                     {
//                         // @ts-ignore
//                         window.tabs.slice(0,4).map((tab, index)=>(
//                           <a href={tab.url} className="hover:text-blue-700 hover:underline" target="_blank" key={index}>
//                             {
//                               <div className="flex items-center space-x-2">
//                                 <img src={tab.favIconUrl} alt="Website Icon" className="w-5 h-5 rounded-md"/>
//                                 <p className="truncate">{tab.title}</p>
                              
//                               </div>
//                             }
//                             </a>
//                         ))
//                       }

//                       <div className="flex mt-2 items-center text-gray-500 flex-wrap h-8">
//                         {
//                           // @ts-ignore
//                           window.tabs.slice(4,15).map((tab, index)=>(
//                             <a href={tab.url} target="_blank" key={index}>
//                               <img src={tab.favIconUrl} alt="Website Icon" className="w-5 h-5 mr-[3px] rounded-md hover:h-7 hover:w-7 transition-all" />
//                             </a>
//                           ))
//                         }
//                         {window.tabs.length > 15 ? `...${window.tabs.length - 15}+` : ""}
//                       </div>

//                   </div>

//                 </div>

//                 <div className="flex justify-between ">
//                   <button className="flex bg-red-50 rounded-md py-1 px-3 items-center space-x-1 hover:bg-red-200"
//                   onClick={()=>onUntrackWindowClick(window.windowName)}
//                   >
//                     <IconX className="h-[18px] w-[18px] text-red-400"/>
//                     <p className="text-red-400 font-medium" >Untrack</p>
//                     </button>
//                   <button className={`flex items-center py-1 px-3  rounded-md space-x-1 ${window.isOpen ? "bg-green-100" : "bg-blue-200"}
//                     ${window.isOpen ? "hover:cursor-not-allowed" : "hover:bg-blue-300"}
//                   `}
//                   disabled={window.isOpen}
//                   onClick={()=>onOpenSavedWindowClick(window.isOpen, window.windowName)}
//                   >
//                     <IconExternal className={` h-[20px] w-[20px] ${window.isOpen ? "text-green-600" : "text-blue-500"}`}/>
//                     <p className={` font-medium ${window.isOpen ? "text-green-600" : "text-blue-500"}`}>{window.isOpen ? "Already Open" : "Open Window"}</p>
//                   </button>

//                 </div>

//               </div>

//             ))
//           }



//         </div>



//       </main>
//     </div>
//   )
// };


// export default Options



import { useEffect, useState, useRef } from "react";
import "../global.css";
// @ts-ignore
import { IconBookmark, IconX, IconExternal } from "../icons/icons";
import extensionIcon from '../icons/auto-tack-track-icon.png';


const sortingOptions = ['Name: ASC', 'Name: DES', 'Status: Open', 'Status: Saved']









const Options = () => {

  const [currentSort, setCurrentSort] = useState('');
  const [arrayOfTrackedWindowValues, setArrayOfTrackedWindowValues] = useState([]);
  const [copyArrayOfWin, setCopyArrayOfWin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null);


  // different layout
  const [layoutWindowChosen, setLayoutWindowChosen] = useState(0)



  const trackedWindows = Object.values({
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
        }
      ]
    }
  })


  

  // document.body.style.zoom = "85%";


  // useEffect(()=>{

  //   chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{
  //     setArrayOfTrackedWindowValues(Object.values(responseExtensionData.trackedWindows))
  //     setCopyArrayOfWin(Object.values(responseExtensionData.trackedWindows))
  //     setCurrentSort(responseExtensionData.optionsPageSort)
  //   })

  //   // @ts-ignore
  //   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //     if (message.signal !== 'changeOptions') return
      
  //     setArrayOfTrackedWindowValues(Object.values(message.trackedWindows))
  //     setCopyArrayOfWin(Object.values(message.trackedWindows))
  //   })
  // },[])



  // useEffect(()=>{
  //   if (currentSort === '') return

  //   switch (currentSort) {

  //     // case sortingOptions[0]:
  //     case 'Name: ASC':

  //       // @ts-ignore
  //       const nameSortAsc = [...arrayOfTrackedWindowValues].sort((a,b) => a.windowName.localeCompare(b.windowName))
  //       setArrayOfTrackedWindowValues(nameSortAsc)
  //       break

  //     case 'Name: DES':
  //       // @ts-ignore

  //       const nameSortDes = [...arrayOfTrackedWindowValues].sort((a,b) => b.windowName.localeCompare(a.windowName))
  //       setArrayOfTrackedWindowValues(nameSortDes)
  //       break
      
  //     case 'Status: Open':
  //       // @ts-ignore
  //       const nameSortOpen = [...arrayOfTrackedWindowValues].sort((a,b) => b.isOpen - a.isOpen)
  //       setArrayOfTrackedWindowValues(nameSortOpen)
  //       break

  //     case 'Status: Saved':
  //       // @ts-ignore
  //       const nameSortSaved = [...arrayOfTrackedWindowValues].sort((a,b) => a.isOpen - b.isOpen)
  //       setArrayOfTrackedWindowValues(nameSortSaved)
  //       break
  //     default:
  //       console.warn("No valid sort")
  //       break
  //   }
  // },[currentSort])



  // // @ts-ignore
  // function onSearchType(e) {
  //   const searched = (e.target.value).trim()
  //   setSearchQuery(e.target.value)

  //   searched === "" ?
  //     setArrayOfTrackedWindowValues(copyArrayOfWin)
  //     :
  //     // @ts-ignore
  //     setArrayOfTrackedWindowValues(copyArrayOfWin.filter(ele=> ele.windowName.toLowerCase().startsWith(searched.toLowerCase())))
      
  // }


  // function onUntrackWindowClick(windowName : string) {
  //   chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  // }

  // function onOpenSavedWindowClick(isOpen: boolean, windowName: string) {
  //   if (isOpen === true) {
  //     alert("Cannot open opened window")
  //     return
  //   }

  //   let openedWindowDetails = null
  //   for (let trackedWindow of arrayOfTrackedWindowValues) {
  //     // @ts-ignore
  //     if (trackedWindow.windowName === windowName) {
  //       openedWindowDetails = trackedWindow
  //       break
  //     }
  //   }
  //   if (!openedWindowDetails) {
  //     alert('Saved window not found')
  //   }

  //   chrome.runtime.sendMessage({signal: 'openSavedWindow', openedWindowDetails: openedWindowDetails})
  // }



  // if (currentSort === '') return

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

            <p className="font-medium text-gray-500">Tracked Windows: {
            // @ts-ignore
            arrayOfTrackedWindowValues.length} (Opened: {arrayOfTrackedWindowValues.filter(ele=> ele.isOpen).length})</p>
          </div>

        </div>
      </header>




      <main className="mt-10 mx-auto px-4 md:px-40 transition-all duration-500 max-w-[93rem]">

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




        <div className="gap-6 flex max-h-[700px] bg-green-200">

          <div className="bg-white h-[1000px] p-5 space-y-3 rounded-xl shadow-xl lg:w-72">

            {
              trackedWindows.map((window,index)=>(
                
                <button key={index} className={`w-full  hover:cursor-pointer min-w-36 p-5 max-w-80 
                  break-words rounded-md border-l-[5px]  border-b-[5px] border-b-gray-300 
                  flex  flex-col  items-start

                  ${window.isOpen ? 'border-l-green-400' : 'border-l-blue-400'}
                  ${index === layoutWindowChosen ? 'bg-gray-300 border-l-[20px] border-b-0' : 'hover:bg-gray-200'}
                  transition-all duration-[0.5s]

                  
                  `}
                  onClick={()=>setLayoutWindowChosen(index)}
                  >
                    <p className="text-xl font-medium text-gray-800">{window.windowName}</p>
                    <p className="text-gray-600">{window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`}</p>
                    
                </button>
              ))
            }

          </div>


          <div className="bg-white shadow-lg w-[1000px] h-full rounded-xl p-5 space-y-1 ">

            <div className={`border-l-[5px] border-l-green-500 bg-gray-50 p-5 flex justify-between rounded-md mb-5 shadow-md
              
              ${trackedWindows[layoutWindowChosen].isOpen ? 'border-l-green-400' : 'border-l-blue-400'}
              `}>
                <div>
                  <p className="text-2xl font-medium">{trackedWindows[layoutWindowChosen].windowName}</p>
                  <p className="text-gray-500 ">{trackedWindows[layoutWindowChosen].tabs.length === 1 ? '1 tab' : `${trackedWindows[layoutWindowChosen].tabs.length} tabs`}</p>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-gray-300 px-3 py-1 rounded-md">Open Window</button>
                  <button className="bg-gray-300 px-3 py-1 rounded-md">Untrack</button>

                </div>
              </div>


              <div className="overflow-y-auto h-[600px]">
              {
                // @ts-ignore
                trackedWindows[layoutWindowChosen].tabs.map((tab)=>(
                  <div className=" px-5 py-2 flex space-x-5 items-center rounded-md border-b-4 border-b-gray-100
                    border-l-4 relative h-auto group hover:pl-10 transition-all duration-500
                  ">
                    <img src={tab.favIconUrl} alt="Website Icon" className="w-10 h-10 rounded-md z-10" />
                    <div className="flex flex-col z-10">
                      <p className="font-medium text-lg z-10">{tab.title}</p>
                      <p>{tab.url}</p>
                    </div>

                    <div className="absolute h-full bg-gray-200 -left-6 w-0 transition-all group-hover:w-full z-0 rounded-md duration-300"></div>
                    
                  </div>
                ))
              }
              </div>



          </div>













        </div>



      </main>
    </div>
  )
};


export default Options


