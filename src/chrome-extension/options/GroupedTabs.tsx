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




export default function GroupedTabs({trackedWindow, isCardsLayout, tabGroupsHidden, coloredTabGroups}: any)  {

    if (isCardsLayout && tabGroupsHidden) {
        return null
    }

    if (!isCardsLayout && tabGroupsHidden) {
        return null
    }

    return (

        <>
            {
            trackedWindow.groupedTabsInfo.length !== 0 ?

            <div className={`flex flex-col  ${isCardsLayout ? "mb-4" : "mx-4 mt-3"}   dark:border-gray-600/50`}>
                
                <p className={` ${isCardsLayout ? "text-[16px]" : "text-lg" } font-bold mb-2 text-gray-700/80 dark:text-gray-200`}>
                    Tab Groups
                </p>
                
                <div className="flex flex-row items-center gap-3 font-semibold text-[16px]
                 text-gray-600/90 dark:text-gray-400 overflow-x-auto">

                    {trackedWindow.groupedTabsInfo.map((tabGroup: any)=>(
                        <div
                        key={tabGroup.id}
                        className={`
                            rounded-lg py-0.5 px-2 text-nowrap flex items-center h-fit
                            
                            ${isCardsLayout ? "font-medium" : ""}
                            ${coloredTabGroups ? groupColorMap[tabGroup.color] : "bg-gray-200 dark:bg-gray-700/80"}

                            `}
                        >
                            {tabGroup.title === "" ? "<unnamed>" : tabGroup.title}
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