// import { useEffect, useState } from "react";
import "../global.css";
import { IconBookmark, IconX, IconExternal } from "../icons/icons";

const trackedWindows = {
  abc123: {
    windowName: "Dev + Research",
    windowId: 101001,
    color: "white",
    isOpen: true,
    groupedTabsInfo: [],
    tabs: [
      {
        id: 201001,
        groupId: -1,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        favIconUrl: "https://developer.mozilla.org/favicon.ico",
        title: "JavaScript | MDN"
      },
      {
        id: 201002,
        groupId: -1,
        url: "https://react.dev/learn",
        favIconUrl: "https://react.dev/favicon.ico",
        title: "React – Learn React"
      },
      {
        id: 201003,
        groupId: -1,
        url: "https://chat.openai.com/",
        favIconUrl: "https://chat.openai.com/favicon.ico",
        title: "ChatGPT"
      },
      {
        id: 201004,
        groupId: -1,
        url: "https://github.com/ashishbudhamagar",
        favIconUrl: "https://github.githubassets.com/favicons/favicon.svg",
        title: "ashishbudhamagar (GitHub)"
      },
      {
        id: 201005,
        groupId: -1,
        url: "https://stackoverflow.com/questions",
        favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico",
        title: "Newest Questions - Stack Overflow"
      },
      {
        id: 201006,
        groupId: -1,
        url: "chrome://extensions/",
        favIconUrl: "",
        title: "Extensions"
      },
      {
        id: 201007,
        groupId: -1,
        url: "https://claude.ai/chat/12345678",
        favIconUrl: "https://claude.ai/favicon.ico",
        title: "Claude – Chat Interface"
      },
      {
        id: 201008,
        groupId: -1,
        url: "https://notion.so/",
        favIconUrl: "https://www.notion.so/images/favicon.ico",
        title: "Notion – All-in-one workspace"
      }
    ]
  },

  xyz789: {
    windowName: "Media + Tools",
    windowId: 101002,
    color: "green",
    isOpen: false,
    groupedTabsInfo: [],
    tabs: [
      {
        id: 202001,
        groupId: -1,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        favIconUrl: "https://www.youtube.com/s/desktop/bfe4b043/img/logos/favicon_32x32.png",
        title: "Rick Astley - Never Gonna Give You Up"
      },
      {
        id: 202002,
        groupId: -1,
        url: "https://open.spotify.com/",
        favIconUrl: "https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png",
        title: "Spotify"
      },
      {
        id: 202003,
        groupId: -1,
        url: "https://calendar.google.com/",
        favIconUrl: "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_8.ico",
        title: "Google Calendar"
      },
      {
        id: 202004,
        groupId: -1,
        url: "https://mail.google.com/",
        favIconUrl: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
        title: "Gmail"
      },
      {
        id: 202005,
        groupId: -1,
        url: "https://figma.com/",
        favIconUrl: "https://static.figma.com/app/icon/1/favicon.ico",
        title: "Figma"
      },
      {
        id: 202006,
        groupId: -1,
        url: "http://localhost:5173/options-local.html",
        favIconUrl: "http://localhost:5173/src/chrome-extension/public/32.png",
        title: "App"
      }
    ]
  }
};


const Options = () => {

  // const [trackedWindows, setTrackedWindows] = useState<Record<string, Array<any>>>({});

  // useEffect(()=>{
  //   chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseExtensionData)=>{
  //     setTrackedWindows(responseExtensionData.trackedWindows)
  //   })

  //   // @ts-ignore
  //   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //     if (message.signal !== 'changeOptions') return
  //     setTrackedWindows(message.trackedWindows)
  //   })
  // },[])

  // function onSavedWindowClicked(isOpen: boolean, windowName: string) {
  //   if (isOpen === true) {
  //     alert("Cannot open opened window")
  //     return
  //   }

  //   let openedWindowDetails = null
  //   for (let trackedWindow of Object.values(trackedWindows)) {
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

  // function onUntrackWIndow(windowName: string) {
  //   chrome.runtime.sendMessage({signal: 'untrackWindowFromOptions', windowName: windowName})
  // }

  return (
    <div className="min-h-screen w-auto bg-gray-100">

      <header className=" bg-white shadow-md">
        <div className="flex justify-between py-6 items-center
          max-w-[93rem] mx-auto px-5 md:px-20
        ">

          <div className="">
            <h1 className="flex items-center justify-center space-x-3">
              <IconBookmark className="h-8 w-8 text-blue-400"/>
              <p className="font-semibold text-[25px]">Auto Window Tracker</p>
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <p className="font-medium text-gray-500">Saved Windows: 4 (Opened: 2)</p>
          </div>

        </div>
      </header>


      <main className="mt-10 mx-auto px-4 md:px-10 lg:px-20 transition-all duration-500 max-w-[93rem]">

        <div className="bg-white w-full h-auto flex py-5 items-center justify-center rounded-lg mb-8 shadow-md flex-col md:flex-row">

          <div className="flex-[4] mr-5 w-full">

            <div className="flex max-w-[35rem] p-3 rounded-md border-2 border-gray-300 ml-5 justify-center items-center space-x-2
              focus-within:border-gray-400 hover:border-gray-400  transition-colors duration-200
            ">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search saved windows..."
                className=" w-full focus:outline-none ext-gray-600"
              />
            </div>

          </div>

          <div className="flex-1 flex justify-center items-center">
            <label htmlFor="sort" className="mr-1">Sort by :</label>
            <select id="sort" className="hover:bg-gray-200 p-2 rounded-md transition-colors duration-300">
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>

          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            // @ts-ignore
            Object.values(trackedWindows).map((window : any)=>(


              <div className="bg-white h-[18rem] w-full rounded-lg p-7 border-l-[5px] border-green-500 flex flex-col justify-between
                hover:-translate-y-1 hover:shadow-[7px_7px_5px_rgba(0,0,0,0.3)] transition-all shadow-md
              ">

                <div>
                  <div className="flex justify-between">
                    <h1 className="text-2xl">{window.windowName}</h1>
                    <p className="bg-green-200 rounded-2xl px-3 pt-[1px] pb-[4px] text-center text-green-700">{window.isOpen ? "Open" : "Saved"}</p>
                  </div>

                  <div className="mt-2 mb-4">
                    <div className="flex space-x-3 items-center">
                      <div className="border-2 h-1 w-1 py-[5px] px-[8px] mt-[2px] rounded-md border-gray-300"></div>
                      <p className="text-gray-500">{
                          window.tabs.length === 0 ? "0 tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
                        }</p>
                    </div>
                  </div>
                
                  <div className="flex flex-col">
                    {
                        // @ts-ignore
                        window.tabs.slice(0,3).map((tab)=>(
                          <div className="">
                            {
                              <div className="flex items-center space-x-2 space-y-1">
                                <img src={tab.favIconUrl} className="w-5 h-5"/>
                                <p>{tab.title}</p>
                              
                              </div>
                            }
                            </div>
                        ))
                      }
                  </div>

                </div>

                <div className="flex justify-between">
                  <button className="flex bg-red-50 rounded-md py-1 px-3 items-center space-x-1 hover:bg-red-200">
                    <IconX className="h-[18px] w-[18px] text-red-400"/>
                    <p className="text-red-400 font-medium">Untrack</p>
                    </button>
                  <button className="flex items-center py-1 px-3 bg-gray-100 rounded-md space-x-1">
                    <IconExternal className="text-gray-400 h-[20px] w-[20px]"/>
                    <p className="text-gray-400 font-medium">{window.isOpen ? "Already Open" : "Open Window"}</p>
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


