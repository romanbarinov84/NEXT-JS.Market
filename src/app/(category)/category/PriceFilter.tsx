"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CONFIG } from "../../../../config/config";
import { PriceRange, PriceFilterProps } from "@/types/priceTypes";


export default function PriceFilter({ basePath, category }: PriceFilterProps) {
  const searchParams = useSearchParams();
  const urlPriceFrom = searchParams.get("priceFrom") || "";
  const urlPriceTo = searchParams.get("priceTo") || "";
  const router = useRouter();

  const [inputValues, setInputValues] = useState({
    from: urlPriceFrom,
    to: urlPriceTo,
  });

  const [priceRange, setPriceRange] = useState<PriceRange>(
    CONFIG.FALLBACK_PRICE_RANGE
  );

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
      const recievedRange = data.priceRange || CONFIG.FALLBACK_PRICE_RANGE;

      setPriceRange({
        min: Math.floor(parseInt(recievedRange.min)),

        max: Math.floor(parseInt(recievedRange.max)),
      });

      setInputValues({
        from: urlPriceFrom || recievedRange.min.toString(),
        to: urlPriceTo || recievedRange.max.toString(),
      });
    } catch{
      setPriceRange(CONFIG.FALLBACK_PRICE_RANGE);
      setInputValues({
        from: CONFIG.FALLBACK_PRICE_RANGE.min.toString(),
        to: CONFIG.FALLBACK_PRICE_RANGE.max.toString(),
      });
    }
  }, [category,searchParams,urlPriceFrom,urlPriceTo]);

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

      router.push(`?${params.toString()}`, { scroll: false });
  }, [inputValues, priceRange, searchParams, router, basePath]);

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
  }, [basePath, priceRange.max, priceRange.min, router, searchParams]);



  

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-10 text-[#333] mt-10 xl:mt-0"
    >
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

      <button
        type="submit"
        className="bg-[#ff6633] text-white hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) h-10 rounded justify-center items-center duration-300 cursor-pointer "
      >
        Показати
      </button>
    </form>
  );
}
