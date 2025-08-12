
import Maps from "@/components/maps/Maps";
import NewProducts from "@/app/(products)/newProducts/NewProducts";

import Slider from "@/components/slider/Slider";
import SpecialOffers from "@/components/SpecialOffers";
import Actions from "./(products)/Actions";
import Purchases from "./(user)/Purchases";
import Articles from "./(articles)/Articles";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main className="w-fu mx-auto md-20 ">
      <Suspense fallback={<Loader text=" слайдера" />}>
        <Slider />
      </Suspense>

      <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 ">

      {[
        {component:<Actions/>,text:"акцій"},
        {component: <NewProducts/>,text:"новинок"},
        {component:<Purchases />,text:"покупок"},
        {component:<SpecialOffers/>, text:"скидок"},
        {component:<Maps/>, text:"карт"},
        {component:<Articles />,text:"постів"},
        
      ].map((item,index) => (
        <Suspense key={index} fallback={<Loader text={item.text}/>}>
          {item.component}
        </Suspense>
      ))}
        
       
        
        
        
        
        
      </div>
    </main>
  );
}
