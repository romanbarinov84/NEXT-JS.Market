
export function Maps(){

    return(
          <div className="flex flex-col justify-center xl:max-w-[1208px] ">
            <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                <h3 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg/10  text-[#535353]">Карта магазинів</h3>
            </div>
           
      <div className=" shadow-full hidden sm:block sm:w-[100%] sm:h-[150px] md:w-[80%] md:h-[250px] lg:w-[80%] lg:h-[400px]  xl:w-[80%] xl:h-[400px]  shadow-xl border border-gray-400">
         
      <iframe src="https://www.google.com/maps/d/embed?mid=15kkuVCgV5HxlWUXN8eblgimtJd3UHsY&ehbc=2E312F" width="100%" height="100%"></iframe>
    </div>
          </div>
    
       
    )
}