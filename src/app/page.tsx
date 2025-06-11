import { Actions } from "@/components/Actions";
import { Slider } from "@/components/slider/Slider";


export default function Home() {
  return (
    <main className="w-full mx-auto mb-20">
    
    <Slider/>
    <div className="w-full flex flex-col gap-y-20 md:mb-25 xl:mb-30">
    <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30">
      <Actions/>
    </div>
    </div>
    </main>
  );
}
