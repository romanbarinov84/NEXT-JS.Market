
import Image from "next/image";
import { ProductCard } from "../ProductCard/ProductCard";
import dataBase from "@/data/dataBase.json"



export function Purchases(){
    const userPurchases = dataBase.users[0].purchases.map((purchase) => {
        const product = dataBase.products.find(
            (product) => product.id === purchase.id
        );
        if(!product) return undefined;
        const {discountPercent, ...rest} = product;
        void discountPercent
        return rest
    }).filter((item) => item !== undefined)
    return(
        <div>
            <section>
                      <div className="flex flex-col justify-center xl:max-w-[1208px] ">
                        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                            <h2 className="text-2xl xl:text-4xl text-shadow-lg/10  text-left font-bold text-[#535353]">Мої покупки</h2>
                            <button className="flex flex-row items-center gap-x-2 cursor-pointer">
                                <p className="text-base text-center text-[#606060] text-shadow-lg/10  hover:text-[#bfbfbf]">
                                   Усі мої покупки
                                </p>
                                <Image src="/Shape (Stroke).svg" alt="ActionsImg" width={25} height={25} sizes="25px"/>
                            </button>
                        </div>
                        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
                            {userPurchases/*.slice(0,8)*/.map((item,index) => (
                                <li key={item.id} 
                                className= {`${index >= 4 ? "hidden" : ""}
                                 ${index >= 3 ? "md:hidden xl:block" : ""}
                                 ${index >= 4 ? "xl:block" : ""}
                                 `} 
            
                                >
                                    <ProductCard {...item}/>
                                    </li>                 
                            ))}
                            
                        </ul>
                      </div>
                    </section>
        </div>
    )
}