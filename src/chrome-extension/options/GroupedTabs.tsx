// @ts-nocheck
import { TrackedWindow } from "../../types"


const groupColorMap: Record<string, string> = {
  grey: "bg-gray-300",
  blue: "bg-blue-300",
  red: "bg-red-300",
  yellow: "bg-yellow-300",
  green: "bg-green-300",
  pink: "bg-pink-300",
  purple: "bg-purple-300",
  cyan: "bg-cyan-300",
  orange: "bg-orange-300"
}




export default function GroupedTabs({trackedWindow, isCardsLayout}) {

    return (

        <>
            {
            trackedWindow.groupedTabsInfo.length !== 0 ?

            <div className={`flex flex-col pb-4 ${isCardsLayout ? "border-b-0" : "border-b-2 mx-4"} border-gray-300  dark:border-gray-600/50`}>
                
                <p className={`text-lg ${isCardsLayout ? "font-semibold" :"font-bold " } mb-2 text-gray-600/90 dark:text-gray-200`}>
                    Tab Groups
                </p>
                
                <div className="flex flex-row items-center gap-3 font-semibold text-[16px]
                 text-gray-600/80 overflow-x-auto">

                    {trackedWindow.groupedTabsInfo.map((tabGroup, index)=>(
                        <div
                        key={index}
                        className={`${groupColorMap[tabGroup.color]} rounded-lg py-0.5 px-1.5 text-nowrap flex items-center h-fit`}
                        >
                            {tabGroup.title === "" ? <strong>*unnamed*</strong> : tabGroup.title}
                        </div>
                    ))}

                </div>
            </div>
            :
            null
                
            }
        </>

    )
    
}