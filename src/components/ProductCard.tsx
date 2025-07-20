import Image from "next/image"
import {ProductCardProps} from "@/types/product"
import { formatPrice } from "../../utils/formatPrice";
import StarRating from "./starReiting/StarRating";

    const cardDiscountPercent = 6;

export default function ProductCard({img,description,basePrice,discountPercent,rating}:ProductCardProps){


    
    const calculateFinalPrice = (price:number,discount:number): number => {
        return discount > 0 ? price * (1 - discount / 100) : price;
    };

    const calculatePriceByCard = (price:number,discount:number): number => {
        return calculateFinalPrice(price,discount);
    };

    const finalPrice = calculateFinalPrice(basePrice,discountPercent);

    const priceByCard = calculatePriceByCard(finalPrice,cardDiscountPercent);

   

    return(
        <div className="flex flex-col justify-between  w-40 rounded overflow-hidden bg-white 
         md:w-[224px] xl:w-[272px] align-top p-0 hover:shadow-(--shadow-article)">

            <div className=" relative w-40 h-40 md:-[224px] xl:w-[272px]">
             <Image 
             src={img}
             alt="productImg"
              fill
              className="object-cover "
              sizes="(max-width:768) 160px, (max-width:1200px) 224px, 272px"
              priority/>

              <button className="w-8 h-8 bg-[rgb(243,242,241)] hover:bg-[#ff6633] absolute top-2 
               right-2 opacity-40 rounded cursor-pointer duration-300 flex items-center justify-center">
                <Image 
                src="/iconHeartCard.svg" 
                alt="icon-heart"
                width={24}
                height={24}
                sizes="24px"/>
               </button>
                  
                  {discountPercent > 0 && (  <div className="absolute bg-[#ff6633] py-1 px-2 rounded text-white bottom-2 left-2.5">
                -{discountPercent}%
               </div>)}
             
            </div>
            <div className="flex flex-col justify-between p-2 gap-y-2">
                <div className="flex flex-row justify-between items-end">
                    <div className="flex flex-col gap-x-1">
                        <div className="flex flex-row  text-sm md:text-lg font-bold">
                            <span>{formatPrice(priceByCard)} uah</span>
                           
                        </div>

                        {cardDiscountPercent > 0 && (<p className="text-[#bfbfbf] text-[8px] md:text-xs">{"Зі скидкою"}</p>)}
                        </div>
                        
                    

                    {finalPrice !== basePrice && cardDiscountPercent > 0 && ( <div className="flex flex-col gap-x-1">
                        <div className="flex flex-row gap-x-1 text-xs md:text-base text-[#606060]
                         ">
                            <span>{finalPrice}</span>
                            <span>{"uah"}</span>
                            </div>
                            <p className=" text-[#bfbfbf] text-[8px] md:text-xs">Звичайна</p>
                    </div>)}
                   
                </div>
                <div className="h-13 text-xs md:text-base text-[#191919] line-clamp-3 
                 md:line-clamp-2 leading-[1.5] text-shadow-lg">
                    {description}
                 </div>
                 {rating > 0 && <StarRating rating={rating}/>}
                 <button className="border border-(--color-primary) hover:text-white hover:bg-[#ff6633]
                  hover:border-transparent active:shadow-(--shadow-button-active) w-full h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 
                   cursor-pointer select-none">
                    До кошика
                   </button>
            </div>
        </div>
    );
}