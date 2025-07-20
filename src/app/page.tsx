import Actions from "@/components/actions/Actions";
import Slider from "@/components/slider/Slider";



export default function Home() {
  return(

     <main className="w-fu mx-auto md-20">
       <Slider/>
       <div className="px-[max(12px,calc((100%-1208) / 2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 ">
       <Actions/>
       </div>
       
     </main>
  )
    
}
