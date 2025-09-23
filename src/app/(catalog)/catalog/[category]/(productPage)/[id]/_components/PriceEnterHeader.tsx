"use client"

interface PriceFilterHeaderProps {
    resetPriceFilter:() => void;
}


export default function PriceEnterHeader({resetPriceFilter}:PriceFilterHeaderProps){

    return(
        <>
        <div className="flex flex-row justify-between items-center">
        <p className="text-[#333] text-base">Price</p>
        <button
          type="button"
          onClick={resetPriceFilter}
          className="text-xs rounded bg-[#f3f2f1] h-8 p-2 cursor-pointer"
        >
          Видалити
        </button>
      </div>
        </>
    )
}