import { Settings as SettingsIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Theme } from "../../types"





export default function Settings({
    theme,
    hideTabGroupsCards,
    hideTabGroupsTable,
    coloredTabGroups,
    zoomLevel,
    onChangeThemeButtonClicked,
    onToggleTabGroupsButtonClicked,
    onToggleColoredTabGroupsButtonClicked,
    onZoomLevelChange

}: any) {

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [spinLayoutIcon, setSpinLayoutIcon] = useState(false)
    const [zoomLevelInSettings, setZoomLevelInSettings] = useState(zoomLevel)

    const settingsRef = useRef<HTMLDivElement>(null)
    const timeOutRef = useRef<NodeJS.Timeout | null>(null)


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setSettingsOpen(false)
            }
        }

        if (settingsOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [settingsOpen])



    function onSettingsButtonClicked() {
        setSettingsOpen(!settingsOpen)
        setSpinLayoutIcon(!spinLayoutIcon)
        setTimeout(() => setSpinLayoutIcon(false), 400)
    }    



    function onZoomLevelChangeInSettings(newZoomLevel: number) {
        let roundedZoomLevel = Math.round(newZoomLevel * 10) / 10

        setZoomLevelInSettings(roundedZoomLevel)

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }

        timeOutRef.current = setTimeout(() => {
            onZoomLevelChange(roundedZoomLevel)
        }, 400)
    }
        



    
    return (
    <div ref={settingsRef} className="relative inline-block group">
        <button
        disabled={spinLayoutIcon}
        onClick={onSettingsButtonClicked}
        className={`
            flex items-center justify-center
            w-10 h-10 sm:w-12 sm:h-12
            rounded-xl bg-white/60 hover:bg-gray-200
            dark:bg-gray-800/60 dark:hover:bg-gray-700/80
            backdrop-blur-sm border border-white/20 dark:border-gray-700/30
            shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer
            ${spinLayoutIcon ? "shrink-and-grow" : ""}
        `}
        >
        <SettingsIcon
            className={`${spinLayoutIcon ? "spin-once" : ""}
            h-6 w-6 text-gray-600 dark:text-gray-400
            group-hover:rotate-90 transition-transform duration-300
            `}
        />
        </button>



        <div
        className={`
            absolute right-0 top-full mt-2
            h-[300px] w-[270px]
            bg-white dark:bg-gray-800
            rounded-lg shadow-lg
            transition-all duration-300 z-50 p-4
            flex flex-col items-center gap-4
            border border-gray-200 dark:border-gray-700 border-t-2
            text-gray-800 dark:text-gray-200
            ${settingsOpen 
                ? "opacity-100 scale-100 pointer-events-auto" 
                : "opacity-0 scale-90 pointer-events-none"}
        `}
        >
            <div className="flex flex-row items-center justify-between w-full
            bg-gray-200 rounded-md px-3 py-2 dark:bg-gray-700
            ">
                <p className="text-sm">Theme (Dark mode)</p>
                <button
                    onClick={onChangeThemeButtonClicked}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300
                        ${theme === Theme.dark ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full 
                        shadow transition-transform duration-300
                        ${theme === Theme.dark ? "translate-x-5" : "translate-x-0"}`}
                    />
                </button>
            </div>

            <div className="flex flex-row items-center justify-between w-full
            bg-gray-200 rounded-md px-3 py-2 dark:bg-gray-700
            ">
                <p className="text-sm">Hide tab groups (cards)</p>
                <button
                    onClick={() => onToggleTabGroupsButtonClicked("cards")}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300
                        ${hideTabGroupsCards ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full 
                        shadow transition-transform duration-300
                        ${hideTabGroupsCards ? "translate-x-5" : "translate-x-0"}`}
                    />
                </button>
            </div>

            <div className="flex flex-row items-center justify-between w-full
            bg-gray-200 rounded-md px-3 py-2 dark:bg-gray-700
            ">
                <p className="text-sm">Hide tab groups (table)</p>
                <button
                    onClick={() => onToggleTabGroupsButtonClicked("table")}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300
                        ${hideTabGroupsTable ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full 
                        shadow transition-transform duration-300
                        ${hideTabGroupsTable ? "translate-x-5" : "translate-x-0"}`}
                    />
                </button>
            </div>

            <div className="flex flex-row items-center justify-between w-full
            bg-gray-200 rounded-md px-3 py-2 dark:bg-gray-700
            ">
                <p className="text-sm">Colored tab groups</p>
                <button
                    onClick={onToggleColoredTabGroupsButtonClicked}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300
                        ${coloredTabGroups ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full 
                        shadow transition-transform duration-300
                        ${coloredTabGroups ? "translate-x-5" : "translate-x-0"}`}
                    />
                </button>
            </div>


            


            <div className="flex flex-row items-center justify-between w-full
            bg-gray-200 rounded-md px-3 py-2 dark:bg-gray-700
            ">
                <p className="text-sm">Page scale</p>

                <div className="flex items-center gap-2">


                    <button
                        onClick={() => onZoomLevelChangeInSettings(Math.max(-1, zoomLevelInSettings - 0.1))}
                        disabled={zoomLevelInSettings <= -1}
                        className="w-6 h-6 flex items-center justify-center rounded 
                        bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500
                        disabled:opacity-40 disabled:cursor-not-allowed
                        transition-colors duration-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="w-6 text-center text-sm font-medium">{zoomLevelInSettings}</span>

                    <button
                        onClick={() => onZoomLevelChangeInSettings(Math.min(1, zoomLevelInSettings + 0.1))}
                        disabled={zoomLevelInSettings >= 1}
                        className="w-6 h-6 flex items-center justify-center rounded 
                        bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500
                        disabled:opacity-40 disabled:cursor-not-allowed
                        transition-colors duration-200"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>


                </div>
            </div>






        </div>


    </div>
    )
}