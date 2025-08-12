"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FILTERS = [
  { key: "our-production", label: "Товари нашого виробництва" },
  { key: "healthy-food", label: "Діетичні продукти" },
  { key: "non-gmo", label: "На 100 відсотків натуральне" },
];

const FilterButtons = ({basePath}: {basePath:string}) => {

   const searchParams = useSearchParams();
   const currentFilters = searchParams.getAll("filter");

   const buildFilterLink = (filterKey:string) => {
    const params = new URLSearchParams();

    if(currentFilters.includes(filterKey)){
        params.delete("filter");
        currentFilters.filter((f) => f !== filterKey).forEach((f) => params.append("filter",f))
    }else{
        params.append("filter",filterKey)
    }

    params.delete("page");

   return `${basePath}?${params.toString()}`;
   }
   

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      {FILTERS.map((filter) => (
        <Link key={filter.key} href={buildFilterLink(filter.key)}
         className={`h-8 p-2 text-xs flex justify-center items-center duration-300
          cursor-pointer bg-[#f3f2f1] text-[#333] hover:text-[#ff6633] hover:shadow-lg active:shadow-(
           --shadow-button-active)`}>
          {filter.label}
        </Link>
      ))}
    </div>
  );
};

export default FilterButtons;
