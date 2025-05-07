import { useState } from "react"





export default function VerticalLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
) {


   const [ activeWindow, setActiveWindow] = useState(0)


   return (

      <div className="gap-6 flex h-[650px]  p-10 " >

         <div className="bg-white h-[500px] p-5 space-y-3 rounded-xl shadow-xl lg:w-72">
            <div className="overflow-y-scroll w-full h-full flex flex-col space-y-3 ">

               {
                  // @ts-ignore
                  arrayOfTrackedWindowValues.map((window,index)=>(
                     
                     <button key={index} className={`w-full  hover:cursor-pointer min-w-36 p-5 max-w-80 
                     break-words rounded-md border-l-[5px]  border-b-[5px] border-b-gray-300 
                     flex  flex-col  items-start

                     ${window.isOpen ? 'border-l-green-400' : 'border-l-blue-400'}
                     ${index === activeWindow ? 'bg-gray-200' : 'hover:bg-gray-200'}
                     transition-all duration-[0.4s] relative

                     
                     `}
                     onClick={()=>setActiveWindow(index)}
                     >
                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-300 transition-colors duration-500
                           ${index === activeWindow ?  "bg-gray-400" : "bg-gray-300"}
                        `}
                        />
                        <p className="text-xl font-medium text-gray-600 mb-1">{window.windowName}</p>
                        <div className="flex flex-row space-x-1">
                           <div className="border-2 h-1 w-1 py-[5px] px-[8px] mt-[2px] rounded-md border-gray-400"></div>
                           <p className="text-gray-500">
                              {
                              window.tabs.length === 0 ? "0 tabs" : window.tabs.length === 1 ? "1 tab" : `${window.tabs.length} tabs`
                           }</p>
                        </div>
                        
                     </button>
                  ))
               }

            </div>
         </div>



         <div className=" shadow-2xl h-full rounded-xl p-5 space-y-1 flex flex-col 
            flex-grow  min-w-96
         ">

            <div className={`border-l-[5px]  bg-gray-50 py-2 px-6 flex justify-between rounded-md mb-5 shadow-md               
               ${arrayOfTrackedWindowValues[activeWindow].isOpen ? 'border-l-green-400' : 'border-l-blue-400'}
               `}>



                  <div>
                     <p className="text-2xl font-medium">{arrayOfTrackedWindowValues[activeWindow].windowName}</p>
                     <p className="text-gray-500 ">{arrayOfTrackedWindowValues[activeWindow].tabs.length === 1 ? '1 tab' : `${arrayOfTrackedWindowValues[activeWindow].tabs.length} tabs`}</p>
                  </div>
                  

                  <div className="flex justify-between space-x-4">

                     <button className={`flex items-center py-0 px-3  rounded-md space-x-1 ${arrayOfTrackedWindowValues[activeWindow].isOpen ? "bg-green-100" : "bg-blue-200"}
                        ${arrayOfTrackedWindowValues[activeWindow].isOpen ? "hover:cursor-not-allowed" : "hover:bg-blue-300"}
                     `}
                     disabled={arrayOfTrackedWindowValues[activeWindow].isOpen}
                     onClick={()=>onOpenSavedWindowClick(arrayOfTrackedWindowValues[activeWindow].isOpen, arrayOfTrackedWindowValues[activeWindow].windowName)}
                     >
                        <IconExternal className={` h-[18px] w-[18px] ${arrayOfTrackedWindowValues[activeWindow].isOpen ? "text-green-600" : "text-blue-500"}`}/>
                        <p className={` font-medium ${arrayOfTrackedWindowValues[activeWindow].isOpen ? "text-green-600" : "text-blue-500"}`}>{arrayOfTrackedWindowValues[activeWindow].isOpen ? "Already Open" : "Open Window"}</p>
                     </button>

                     <button className="flex bg-red-50 rounded-md py-1 px-3 items-center space-x-1 hover:bg-red-200"
                     onClick={()=>onUntrackWindowClick(arrayOfTrackedWindowValues[activeWindow].windowName)}
                     >
                        <IconX className="h-[18px] w-[18px] text-red-400"/>
                        <p className="text-red-400 font-medium" >Untrack</p>
                     </button>
                  
                  </div>
            </div>





            <div className="overflow-y-auto " key={activeWindow}>
               {
               // @ts-ignore
               arrayOfTrackedWindowValues[activeWindow].tabs.map((tab,index)=>(

                  <a href={tab.url} target="_blank"
                     className={` px-5 py-2 flex space-x-5 items-center rounded-md border-b-4 border-b-gray-200
                        border-l-4 relative group hover:pl-10 transition-all duration-500 
                        hover:cursor-pointer group border-l-gray-200 
                        
                     `}

                     style={{
                        animation: `expandHeight 0.5s ease-out ${index * 0.07}s forwards`,
                        opacity: 0,
                        maxHeight: 0,
                     }}


                     key={index}>

                        <img src={tab.favIconUrl} alt="Website Icon" className="w-10 h-10 rounded-md z-10" />

                           <div className="flex flex-col z-10 flex-1 min-w-0">
                              <p className="font-medium text-lg z-10 truncate">{tab.title}</p>
                              <p className="group-hover:text-blue-700 group-hover:underline underline-offset-4 truncate ">{tab.url}</p>
                           </div>

                        <div className="absolute h-full bg-gray-200 -left-6 w-0 transition-all group-hover:w-full z-0 rounded-md duration-300"></div>
                  </a>
               ))
               }
            </div>




         </div>    
      </div>
   )
}