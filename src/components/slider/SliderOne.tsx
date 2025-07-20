import Image from "next/image"

export default function SliderOne(){

    return(
        <div className="relative  bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden h-20 md:h-40 xl:h-82" >
             <Image 
             src="/slider/slide-1.jpg" 
             alt="Слайд" 
             fill
             priority
             className=" object-cover" />
               
            <div className="absolute inset-0 justify-between">
               <div className="flex flex-row gap-x-2 xl:gap-x-4  z-10 relative justify-center items-center mt-15">
                
                <div className="relative hidden md:block md:h-33 xl:w-175 xl:h-50 top-7 ml-160">
                     <h2 className="text-lg md:text-2xl xl:text-6xl font-bold  text-white  "
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>Безкоштовна доставка по місту Бровари</h2>
                </div>
                  
               </div>
            </div>
        </div>
    )
}