
import Image from "next/image";

import dataBase from "@/data/dataBase.json";
import ProductCard from "../ProductCard";


export default function Purchases(){

    const userPurchases = dataBase.users[0].purchases.map((purchase) =>
    {
        const product = dataBase.products.find(
            (product) => product.id === purchase.id
        );
        if(!product) return undefined;
        const {discountPercent, ...rest} = product;
        void discountPercent
        return rest
    }
  ).filter((item) => item !== undefined);

    return(
        <div>
              <section>
                  <div className="flex flex-col justify-center w-full xl:max-w-[1208px] mx-auto">
                    <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                      <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">Покупки</h2>
                      <button className="flex flex-row items-center gap-x-2 cursor-pointer">
                        <p
                          className="text-base text-center text-[#5e5e5e] hover:text-[#bfbfbf]"
                          style={{ textShadow: "2px 2px 4px rgba(69, 69, 69, 0.6)" }}
                        >
                          Усі покупки
                        </p>
                         
                          
                           <Image
                          src="/ActionsShevronRight.svg"
                          alt="Arrow"
                          width={24}
                          height={24}
                          className="w-6  h-auto group-hover:opacity-80 transition-opacity"
                        />
                        
                        
                      </button>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                      {userPurchases.slice(0,4).map((item, index) => (
                        <li key={`${item.id}-${index}`}
                          
                          className={`${index >= 4 ? "hidden" : ""}
                                     ${index >= 3 ? "md:hidden xl:block" : ""}
                                     ${index >= 4 ? "xl:hidden" : ""}`}
                        >
                          <ProductCard {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
        </div>
    )
}

