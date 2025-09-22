"use client";

import "rc-slider/assets/index.css";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { PriceRange, PriceFilterProps } from "@/types/priceTypes";
import PriceEnterHeader from "./PriceEnterHeader";
import PriceInputs from "./PriceInputs";
import PriceRangeSlider from "./PriceRangeSlider";
import { CONFIG } from "../../../../../../config/config";

export default function PriceFilter({ category,setIsFilterOpenAction }: PriceFilterProps) {
  const searchParams = useSearchParams();
  const urlPriceFrom = searchParams.get("priceFrom") || "";
  const urlPriceTo = searchParams.get("priceTo") || "";
  const router = useRouter();
  const urlInStock = searchParams.get("inStock") === "true";

  const [inputValues, setInputValues] = useState({
    from: urlPriceFrom,
    to: urlPriceTo,
  });

  const [priceRange, setPriceRange] = useState<PriceRange>(
    CONFIG.FALLBACK_PRICE_RANGE
  );

  const [inStock, setInStock] = useState(urlInStock);

  const fetchPriceData = useCallback(async () => {
    try {
      const currentCategory = category || searchParams.get("category");
      if (!currentCategory) return;
      const params = new URLSearchParams();
      params.set("category", currentCategory);
      params.set("getPriceRangeOnly", "true");

      const response = await fetch(`/api/category/${params.toString()}`);
      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
      const data = await response.json();
      const receivedRange = data.priceRange || CONFIG.FALLBACK_PRICE_RANGE;

      const roundedRange = {
        min: Math.floor(Number(receivedRange.min)),
        max: Math.floor(Number(receivedRange.max)),
      };

      setPriceRange(roundedRange);

      setInputValues({
        from: urlPriceFrom || roundedRange.min.toString(),
        to: urlPriceTo || roundedRange.max.toString(),
      });
    } catch {
      setPriceRange(CONFIG.FALLBACK_PRICE_RANGE);
      setInputValues({
        from: CONFIG.FALLBACK_PRICE_RANGE.min.toString(),
        to: CONFIG.FALLBACK_PRICE_RANGE.max.toString(),
      });
    }
  }, [category, searchParams, urlPriceFrom, urlPriceTo]);

  useEffect(() => {
    fetchPriceData();
  }, [fetchPriceData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    applyPriceFilter();
    if(setIsFilterOpenAction){
      setIsFilterOpenAction(false);
    }
    
  };

  const applyPriceFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    let fromValue = Math.max(
      priceRange.min,
      parseInt(inputValues.from) || priceRange.min
    );

    let toValue = Math.min(
      priceRange.max,
      parseInt(inputValues.to) || priceRange.max
    );

    if (fromValue > toValue) {
      [fromValue, toValue] = [toValue, fromValue];
    }

    params.set("priceFrom", fromValue.toString());
    params.set("priceTo", toValue.toString());
    params.set("inStock", inStock.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  }, [inputValues, priceRange, searchParams, router, inStock]);

  const sliderValues = [
    parseInt(inputValues.from) || priceRange.min,
    parseInt(inputValues.to) || priceRange.max,
  ];

  const handleInStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInStock(e.target.checked);
    },
    []
  );

  const handleSliderChange = useCallback((values: number | number[]) => {
    if (Array.isArray(values)) {
      setInputValues({
        from: values[0].toString(),
        to: values[1].toString(),
      });
    }
  }, []);

  const resetPriceFilter = useCallback(() => {
    setInputValues({
      from: String(priceRange.min),
      to: String(priceRange.max),
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceFrom");
    params.delete("priceTo");
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [priceRange.min, priceRange.max, router, searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-10 text-[#333] mt-10 xl:mt-0"
    >
      <PriceEnterHeader resetPriceFilter={resetPriceFilter}/>
      <PriceInputs inputValues={inputValues} priceRange={priceRange} handleInputChange={handleInputChange}/>
      <PriceRangeSlider priceRange={priceRange} sliderValues={sliderValues} handleSliderChange={handleSliderChange}/>

      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="inStock"
            checked={inStock}
            onChange={handleInStockChange}
            className="sr-only peer"
          />
          <div className="w-[46px] h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#70c05c] transition-colors duration-200">
            <div
              className={`absolute top-0.5 left-0 w-5 h-5 border-[0.5px] border-[#333]
             rounded-full shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_2px_6px_rgba(0,0,0,0.15)]
              transition-transform duration-300 ${
                inStock ? "transform translate-x-6" : "transform translate-x-0"
              } `}
            ></div>
          </div>
          <p className="text-[#333] pl-2">В наявності</p>
        </label>
      </div>
      <button
        type="submit"
        className="bg-[#ff6633] text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) h-10 rounded justify-center items-center duration-300 cursor-pointer "
      >
        Показати
      </button>
    </form>
  );
}
