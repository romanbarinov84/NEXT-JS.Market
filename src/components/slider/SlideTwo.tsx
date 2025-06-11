import Image from "next/image"



export function SlideTwo(){

    return(
        <div className="mb-10 md:mb-15 xl:mb-20 h-20 md:h-40 xl:h-70 w-full relative">
        <Image src="/slider/sliderTwo.png" alt="SlideTwo-image" fill className="object-cover"/> 

        </div>
    )
}