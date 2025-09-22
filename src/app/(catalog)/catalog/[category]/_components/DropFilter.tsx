"use client";

import { useState } from "react";
import Image from "next/image";
import FilterButtons from "./FilterButtons";
import FilterControls from "./FilterControls";
import PriceFilter from "./PriceFilter";

export default function DropFilter({
  basePath,
  category,
}: {
  basePath: string;
  category: string;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="ml-3 xl:hidden h-8 p-2 rounded text-xs flex justify-center items-center duration-300 gap-x-2 bg-(--color-primary) text-white hover:shadow-(--shadow-button-default) active-(--shadow-button-active)"
      >
        Фильтр
      </button>
      <div
        className={`xl:hidden flex flex-col gap-y-10 fixed top-0 left-0 h-screen w-full max-w-90 bg-white z-50 p-4 overflow-y-auto shadow-(--shadow-button-default) text-[text-main-text] transform-origin-left transition-all duration-300 ease-in-out ${
          isFilterOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      >
        <div className="flex justify-between items-center bg-gray-200 h-11 p-1 rounded text-base font-bold">
          <h3 className="flex justify-start items-center">Фильтр</h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="cursor-pointer "
          >
            <Image src="/X_SVG.svg" alt="iconX" width={24} height={24} />
          </button>
        </div>
        <FilterButtons basePath={basePath} />
        <FilterControls basePath={basePath} />
        <PriceFilter
          basePath={basePath}
          category={category}
          setIsFilterOpenAction={setIsFilterOpen}
        />
      </div>
    </div>
  );
}
