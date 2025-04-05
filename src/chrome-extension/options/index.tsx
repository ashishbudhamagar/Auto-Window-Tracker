

import { useEffect, useState } from "react";
import "../global.css";












const Options = () => {


 const [trackedWindows, setTrackedWindows] = useState<Record<string, Array<any>>>({});






 useEffect(()=>{


   // @ts-ignore
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
     if (message.signal !== 'changeOptions') return
     setTrackedWindows(message.trackedWindows)


   })


   chrome.runtime.sendMessage({signal: "getDataForOptions"}, (responseTrackedWindows)=>{
     setTrackedWindows(responseTrackedWindows)
   })
 },[])




 function onSavedWindowClicked(isOpen: boolean, windowName: string) {


   if (isOpen === true) {
     alert("Cannot open opened window")
     return
   }


   let openedWindowDetails = null
   for (let [key,trackedWindow] of Object.entries(trackedWindows)) {
     // @ts-ignore
     if (trackedWindow.windowName === windowName) {
       openedWindowDetails = trackedWindows[key]
       break
     }
   }
  
   // @ts-ignore
   chrome.windows.create( { url: openedWindowDetails.tabs.map(ele=> ele.url), focused: true, type: 'normal'}, (newCreatedWindow)=>{




     let tabGroups : any = []
     let groupIndex = -1
     let lastGroupId = -1
     let newListOfTabs = newCreatedWindow?.tabs
    
     // @ts-ignore
     openedWindowDetails.tabs.forEach((ele, index)=>{
      
       if (ele.groupId !== -1) {
         if (lastGroupId !== ele.groupId) {
           groupIndex++
           tabGroups[groupIndex] = []
         }


         tabGroups[groupIndex].push(newListOfTabs?.[index]?.id)
         lastGroupId = ele.groupId
       }
     })
    
     // @ts-ignore
     chrome.tabGroups.query({}, (tabGroups) => {


       console.log("{GROUP=========")
       console.log(tabGroups)


       tabGroups.forEach((listOfGroupedTabs : any)=>{
         chrome.tabs.group(
           {
             tabIds: listOfGroupedTabs,
             createProperties: {
               windowId: newCreatedWindow?.id
             }
           }
         )
       })
     });
   })
 }




return (
  <div className="h-[80%] w-[100%]">




    <div className="h-full w-full bg-gray-500 p-10">




      {
        Object.values(trackedWindows).map((ele:any,index)=>(
          <button
          className= {`
             mb-5 p-5 w-full




             ${ele.isOpen ? "bg-red-400" : "bg-gray-400"}








          `}
          key={index}
          onClick={()=>onSavedWindowClicked(ele.isOpen, ele.windowName)}
        
          >{ele.windowName}</button>
        ))
      }




    </div>
  </div>
)
};




export default Options;




