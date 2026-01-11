import { TrackedWindow, Tab } from "../../types"
import noImageImage from '../public/no-image.png'

import NoSearchQuery from "./NoSearchQuery"

export default function SearchByUrlResult({
    arrayOfTrackedWindowValues,
    searchQuery,
    savedWindowIsOpening,
    IconExternal,
    IconX,
    preventLinkClickIfChromeSpeicalLink,
    onUntrackWindowButtonClicked,
    onOpenSavedWindowButtonClicked
}: any) {


    const searchTerm = searchQuery.replace("url:", "").trim()
    const trackedWindowWithTheUrl = arrayOfTrackedWindowValues.filter((trackedWindow: TrackedWindow) =>
        trackedWindow.tabs.some((tab: Tab) => tab.url.includes(searchTerm))
    )

    const numberOfTabWithUrl = trackedWindowWithTheUrl.map((trackedWindow: TrackedWindow) => {
        return trackedWindow.tabs.filter((tab: Tab) => tab.url.includes(searchTerm)).length
    }).reduce((a: number, b: number) => a + b, 0)



    if (searchQuery.trim().length <= 4 || trackedWindowWithTheUrl.length === 0) {
        return (
            <NoSearchQuery />
        )
    }


    

    return (

        <div className="space-y-6">


            <div className="px-6 py-4 rounded-lg bg-white/70 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 shadow-sm">
                <p className="text-lg text-gray-700 dark:text-gray-200">
                    Found <strong className="font-semibold">{numberOfTabWithUrl}</strong> tab{numberOfTabWithUrl === 1 ? "" : "s"} for URL search
                    <p className="ml-2 inline-block font-medium text-gray-800 dark:text-gray-100">"{searchTerm}"</p>
                </p>
            </div>





                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {trackedWindowWithTheUrl.map((trackedWindow: TrackedWindow) => {

                        const matches = trackedWindow.tabs.filter((tab: Tab) => tab.url.includes(searchTerm))
                        if (matches.length === 0) return null


                        return (
                            <div key={trackedWindow.windowName} className="backdrop-blur-lg p-4 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/30 shadow-xl max-h-[400px] flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 
                                    title={trackedWindow.windowName}
                                    className="font-semibold text-gray-800 dark:text-gray-100 truncate text-lg"
                                    >{trackedWindow.windowName}</h3>
                                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold 
                                        ${trackedWindow.isOpen ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-200 dark:border-green-700" : 
                                        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700"}`}>
                                        {trackedWindow.isOpen ? "Active" : "Saved"}
                                    </span>
                                </div>

                                <div className="space-y-1 max-h-[330px] overflow-y-auto flex-1">
                                    {matches.map((tab: Tab) => (
                                        <a
                                            key={tab.id}
                                            href={tab.url}
                                            title={tab.title}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e)=>preventLinkClickIfChromeSpeicalLink(e, tab)}
                                            draggable={false}
                                            className="flex items-center mb-1 text-gray-700 dark:text-gray-200 rounded-md 
                                            space-x-3 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 
                                            hover:bg-gray-200 dark:hover:bg-gray-700 w-full transition-colors duration-200"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden dark:border-gray-600/50">
                                                <img
                                                    draggable={false}
                                                    src={tab.favIconUrl || noImageImage}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = noImageImage;
                                                    }}
                                                    className="w-full h-full object-contain bg-gray-200 dark:bg-gray-700 p-[5px] rounded-xl"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-100">{tab.title}</p>
                                                <p className="text-[10px] md:text-sm truncate text-gray-500 dark:text-gray-400 font-medium">{tab.url}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>



                                <div className="flex space-x-3 mt-3">
                                    <button
                                        className="group flex items-center space-x-2 py-3 px-4 rounded-xl text-red-500
                                        dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all 
                                        duration-300 border border-red-200/50 dark:border-red-700/50 hover:border-red-300
                                        dark:hover:border-red-600 hover:shadow-md flex-1 justify-center font-medium  hover:scale-105
                                        "
                                        

                                        onClick={() => onUntrackWindowButtonClicked(trackedWindow.windowName)}
                                    >
                                        <IconX className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300 group-hover:scale-[1.2] " />
                                        <span className="text-sm">Untrack</span>
                                    </button>

                                    <button

                                        className={`group flex items-center space-x-2 py-3 px-4 rounded-xl transition-all 
                                        duration-300 flex-1 justify-center font-medium hover:shadow-md border border-blue-100
                                        hover:scale-105
                                        ${trackedWindow.isOpen
                                            ? `text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200
                                            dark:border-gray-700 bg-green-50 dark:bg-gray-800/50`
                                            : `text-blue-600 dark:text-blue-500 bg-indigo-50/80 hover:bg-blue-200 
                                            dark:hover:bg-blue-900/80 border dark:bg-blue-600/60 border-blue-200/20 
                                            dark:border-blue-700/50 hover:border-blue-600/80 dark:hover:border-blue-600 `}`
                                        }

                                        disabled={savedWindowIsOpening  || trackedWindow.isOpen}
                                        onClick={() => onOpenSavedWindowButtonClicked(trackedWindow.windowName)}
                                    >
                                        <IconExternal className="h-4 w-4 group-hover:scale-[1.2] transition-transform duration-300" />
                                        <span className="text-sm">
                                        {savedWindowIsOpening ? "Opening..." : trackedWindow.isOpen ? "Active" : "Open"}
                                        </span>
                                    </button>
                                </div>


                            </div>

                            
                        )
                    })}
                </div>

        </div>
    )
}