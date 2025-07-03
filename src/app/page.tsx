
import Actions from "./(products)/Actions";
import { Maps } from "@/components/Maps/Maps";
import { SpecialOffers } from "@/components/offers/SpecialOffers";
import { Slider } from "@/components/slider/Slider";
import Articles from "./(articles)/Articles";
import { Purchases } from "../app/(user)/Purchases";
import NewProducts from "./(products)/Products/NewProducts";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";




export default function Home() {
  return (
    <main className="w-full mx-auto mb-20">
      <Suspense fallback={<Loader text="слайдера"/>}>
         <Slider />
      </Suspense>
 
      <div className="w-full flex flex-col gap-y-20 md:mb-25 xl:mb-30">
        <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30">
        {[
          {component: <Actions />,text:"акцій"},
          {component: <NewProducts />,text:"новинок"},
          {component: <Purchases />,text:"покупок"},
          {component: <SpecialOffers />,text:"пропозицій"},
          {component: <Maps />,text:"карт"},
          {component: <Articles />,text:"постів"},
        ].map((item,index) => (
          <Suspense key={index} fallback={<Loader text={item.text}/>}>
            {item.component}
          </Suspense>
        ))}
          
          
          
         
          
          
        </div>
      </div>
    </main>
  )};