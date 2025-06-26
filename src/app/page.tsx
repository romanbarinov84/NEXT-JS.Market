
import Actions from "./(products)/Actions";
import { Maps } from "@/components/Maps/Maps";
import { SpecialOffers } from "@/components/offers/SpecialOffers";


import { Slider } from "@/components/slider/Slider";

import Articles from "./(articles)/Articles";
import { Purchases } from "../app/(user)/Purchases";
import NewProducts from "./(products)/Products/NewProducts";

export default function Home() {
  return (
    <main className="w-full mx-auto mb-20">
      <Slider />
      <div className="w-full flex flex-col gap-y-20 md:mb-25 xl:mb-30">
        <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30">
          <Actions />
          <NewProducts />
          <Purchases />
          <SpecialOffers />
          <Maps />
          <Articles />
        </div>
      </div>
    </main>
  );
}
