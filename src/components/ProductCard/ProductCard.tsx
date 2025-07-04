import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { formatPrice } from "../../../utils/formatPrice";
import { StarRating } from "../StarRating";
const cardDiscountPercent = 6; //процент по карте если расчитаются картой

export function ProductCard({
  img,
  description,
  basePrice,
  discountPercent = 0,
  rating,
  categories,
}: ProductCardProps) {
  const calculateFinalPrice = (price: number, discount: number): number => {
    return discount > 0 ? price * (1 - discount / 100) : price;
  };
  const calculatePriceByCard = (price: number, discount: number): number => {
    return calculateFinalPrice(price, discount);
  };

  const isNewProduct = categories.includes("new")

  const finalPrice = isNewProduct ? basePrice : calculateFinalPrice(basePrice, discountPercent);

  const priceByCard = isNewProduct ? basePrice : calculatePriceByCard(finalPrice, cardDiscountPercent);

  const ratingValue = rating || 0;

  return (
    <div className="flex flex-col justify-between w-40 rounded overflow-hidden bg-white md:w-[224px] xl:w-[272px] align-top p-0 hover:shadow-(--shadow-article) duration-300">
      <div className="relative w-40 h-40 md:w-[224px] xl:w-[272px]">
        <Image
          src={img}
          alt="ProductCardImg"
          fill
          className="object-contain"
          sizes="(max-width:768px) 160px, (max-width:1200px) 224px,272px"
        />
        <button className="w-8 h-8 p-2 bg-[#f3f2f1] hover:bg-[#fcd5ba] absolute top-5 right-2 opacity-50 rounded cursor-pointer duration-300">
          <Image
            src="/icons/heart.svg"
            alt="IconHeart"
            width={24}
            height={24}
            sizes="24px"
          />
        </button>
        {discountPercent > 0 && (
          <div className="absolute bg-[#ff6633] py-1 px-2 rounded text-white bottom-2 left-2.5">
            -{discountPercent}%
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between p-2 gap-y-4">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col gap-x-2">
            <div className="flex flex-row gap-x-2 text-sm md:text-lg font-bold">
              <span className="text-[#4356fe]">{formatPrice(priceByCard)}</span>
              <span className="text-[#fe546d]">грн</span>
            </div>
            {cardDiscountPercent > 0 && (
              <p className="text-[#bfbfbf] text-[8px] md:text-xs">
                
              </p>
            )}
          </div>
          {finalPrice !== basePrice && (
            <div className="flex flex-col gap-x-2">
              <div className="flex flex-row gap-x-1 text-xs md:text-base text-[#606060]">
                <span className="text-[#fe6633]">
                  {formatPrice(finalPrice)}
                </span>
                <span>грн</span>
              </div>

              <p className="text-[#bfbfbf] text-[8px] md:text-xs text-right">Звичайна</p>
            </div>
          )}
        </div>
        <div className="h-13.5 text-xs md:text-base text-[#414141]  line-clamp-3 md:line-clamp-2 leading-[1.5]">
          {description}
        </div>
        {ratingValue !== undefined && <StarRating rating={ratingValue} />}
        <button className="border border-(--color-primary) hover:text-green-700 hover:[#ff6633] hover:border-green-400 hover:shadow-sm active:shadow-(--shadow-button-active) w-full h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none">
          {" "}
          Додати до кошика
        </button>
      </div>
    </div>
  );
}
