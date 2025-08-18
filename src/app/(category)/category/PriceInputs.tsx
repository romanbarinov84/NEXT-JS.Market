

interface PriceInputsProps {
     inputValues: {
    from: string;
    to: string;
  };
      priceRange: {
    min: number;
    max: number;
  };
      handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PriceInputs({inputValues,priceRange,handleInputChange}:PriceInputsProps){

    return(
        <>
        <div className="flex flex-row items-center justify-between gap-2">
        <input
          type="number"
          name="from"
          value={inputValues.from}
          placeholder={`${priceRange.min}`}
          min={priceRange.min}
          max={priceRange.max}
          onChange={handleInputChange}
          className="w-[124px] h-10 border border-[#bfbfbf] rounded bg-[#eee] py-2 px-4 "
        />

        <input
          type="number"
          name="to"
          value={inputValues.to}
          onChange={handleInputChange}
          min={priceRange.min}
          max={priceRange.max}
          placeholder={`${priceRange.max}`}
          className="w-[124px] h-10 border border-[#bfbfbf] rounded bg-[#eee] py-2 px-4"
        />
      </div>
        </>
    )
}