import Image from "next/image";
import { CONFIG } from "../../../../../../../../config/config";

interface ProductOfferProps {
  discountedPrice: number;
  cardPrice: number;
}

const ProductOffer = ({ discountedPrice, cardPrice }: ProductOfferProps) => {
  return (
    <div className="flex flex-row justify-between gap-2 leading-1.5 h-19 mb-4">
      <div className="flex flex-col justify-end">
        <p className="text-[#606060] text-xl md:text-lg xl:text-2xl mb-1.5">
          {discountedPrice.toFixed(2)} грн
        </p>
        <p className="text-[#bfbfbf] text-[8px] md:text-xs">Звичайна ціна</p>
      </div>

      <div className="flex flex-col justify-end">
        <p className="text-main-text text-2xl xl:text-4xl font-bold mb-1.5 text-right">
          {cardPrice.toFixed(2)} грн
        </p>
        <div className="flex flex-row gap-x-1 items-center relative">
          <p className="text-[#bfbfbf] text-[8px] md:text-xs">
           З картою магазину
          </p>
          <div className="group relative cursor-help">
            <Image
              src="/bonusIcon.png"
              alt="Информация"
              width={16}
              height={16}
              className="select-none opacity-70"
            />
            <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-white border border-gray-200 shadow-lg rounded-md text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              Скидка {CONFIG.CARD_DISCOUNT_PERCENT}% по картці лояльності!
              «Галя Балувана». Отримайте карту лояльності у касира !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
