"use client"
import {motion} from "framer-motion"
import SliderOne from "./SliderOne";
import SliderTwo from "./SliderTwo";

export default function Slider(){
     const slides = [
        <SliderOne key="slide-1"/>,
        <SliderTwo key="slide-2"/>
     ]
    return(
        <div className="relative h-20 md:h-40 xl:h-50 w-full mb-10 md:mb-5 xl:mb-35">
        {slides.map((slide,index) => (
            <motion.div key={`slide-${index}`}
            initial={{opacity:0}}
            animate={{opacity:[0,1,1,0]}}
            transition={{
                duration:5,
                repeat:Infinity,
                repeatDelay:slides.length * 5 - 5,
                delay:index * 5
            }}
            className="absolute w-full h-full"
            >
             {slide}
            </motion.div>
        ))}
        </div>
    )
}