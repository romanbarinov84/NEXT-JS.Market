import Image from "next/image";

export function SpecialOffers() {
  return (
    <section className=" hidden sm:block   w-full py-6 rounded-2xl  ring ring-gray-900/5 focus:ring-2 focus:ring-blue-800 lg:overflow-hidden">
      <div className="container mx-auto flex justify-left p-2">
        <h1 className="text-2xl text-left text-shadow-lg/10 xl:text-4xl  font-bold mb-4 md:mb-8 text-[#535353]">
          Спеціальні пропозиції
        </h1>
      </div>
      <div className=" flex justify-center p-5 gap-x-0.5 md:flex-row  items-center xl:w-auto">
        <div className="flex flex-row gap-x-15">
          <div className="w-[250px] h-[100px] ml-5 bg-blue-50  rounded-xl shadow-(--shadow-article) flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer lg:w-[350px] lg:h-[220px] xl:w-[500px] xl:h-[250px]">
            <div className="text-[20px] text-red-600 leading-none font-bold lg:text-[50px] xl:text-[80px] mt-10">
              %
            </div>
            <div className="text-[30px] text-gray-700 mt-2 lg:text-[50px] xl:text-[90px]">discount</div>
          </div>
          <div className="w-[250px] h-[100px] ml-5 bg-green-300  rounded-xl shadow-(--shadow-article) flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer lg:w-[350px] lg:h-[220px] xl:w-[500px] xl:h-[250px]">
            <div className=" relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] ">
              <Image 
              src="/discountCardImg.png" 
              alt="discount-images" 
              fill
              className="object-contain" 
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 250px"/> 
              
            </div>
              <p className=" justify-center text-[20px] text-red-600 leading-none font-bold xl:text-[40px]"> Акційні товари!!!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
