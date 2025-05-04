


export default function CardLayout(
   {  
      // @ts-ignore
      arrayOfTrackedWindowValues, onOpenSavedWindowClick, onUntrackWindowClick, IconExternal, IconX
   }
 ) {



   return (

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-52">

      {

        arrayOfTrackedWindowValues.map((window : any, index: number)=>(


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
                      <a href={tab.url} className="hover:text-blue-700 hover:underline underline-offset-4" target="_blank" key={index}>
                        {
                          <div className="flex items-center space-x-2">
                            <img src={tab.favIconUrl} alt="Website Icon" className="w-5 h-5 rounded-md" onError={(e)=>{
                              e.currentTarget.onerror = null
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
   )
}