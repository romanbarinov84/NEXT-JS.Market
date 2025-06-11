import Image from "next/image"

export function SlideOne(){

    return(
        <div
            className="relative bg-[url('/slider/pattern2.png')] bg-repeat bg-contain overflow-hidden flex justify-center h-30 md:h-40 xl:h-70">
            <div className="absolute inset-0 bg-white/60"></div>

            <div className="flex flex-row gap-x-2 xl:gap-x-4 items-center z-10 relative">
                <div className="relative hidden md:block md:w-60 md:h-33 xl:w-75 xl:h-50 xl:w-100 top-7">
                 <Image src="/slider/img.png" alt="Logo-slide" fill sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"/>
                </div>
                <h2 className="text-lg md:text-2xl xl:text-4xl font-black text-[#333]">
                    Доставка по місту Бровари безкоштовна
                </h2>
            </div>
        
          
        </div>
    )
}