
import Footer from "@/components/footer/Footer";
import Maps from "@/components/maps/Maps";
import NewProducts from "@/app/(products)/newProducts/NewProducts";

import Slider from "@/components/slider/Slider";
import SpecialOffers from "@/components/SpecialOffers";
import Actions from "./(products)/Actions";
import Purchases from "./(user)/Purchases";
import Articles from "./(articles)/Articles";

export default function Home() {
  return (
    <main className="w-fu mx-auto md-20">
      <Slider />
      <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 ">
        <Actions />
        <NewProducts />
        <Purchases />
        <SpecialOffers />
        <Maps />
        <Articles />
        <Footer />
      </div>
    </main>
  );
}
