import Image from "next/image";

export default function SpecialOffers() {
  return (
    <div className="relative  bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden h-20 md:h-40 xl:h-82">
      <Image
        src="/Galya-Baluvana.jpg"
        alt="OffersImage"
        fill
        priority
        className=" object-cover"
      />

      <div className="absolute inset-0  justify-center items-center">
        <div className="flex flex-row gap-x-2 xl:gap-x-4  z-10 relative justify-center items-center mt-15">
          <h2
            className="text-lg md:text-2xl xl:text-6xl font-bold  text-white  "
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
          >
            Показуємо виробництво
          </h2>
         
        </div>
     
       <p className="text-s md:text-xl xl:text-xl font-bold text-wrap text-[#333] "  >
            Кожен може побачити процес приготування страв на власні очі, адже
            цехи розташовані безпосередньо у магазинах за склом
          </p> 
          </div>
    </div>
  );
}
