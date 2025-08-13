import Link from "next/link";
import Image from "next/image";
import { FilterControlsProps } from "@/types/filterControlProps";



export default function FilterControls({
  activeFilter,
  basePath,
  searchParams = {},
}: FilterControlsProps){
        
    function buildClearFiltersLink(
 
){
  const params = new URLSearchParams();

  if(searchParams.page){
    params.set("page",searchParams.page);
  }
  if(searchParams.perPage){
    params.set("perPage",searchParams.perPage);
  }

  params.delete("filter");

  return `${basePath}?${params.toString()}`
}
    return(

        
        <>
        <div className="hidden  xl:flex flex-row flex-wrap gap-y-3 gap-x-6 mb-6">
        <div
          className={`h-8 p-2 rounded text-xs justify-center items-center duration-300 
         cursor-pointer gap-x-2 ${
           !activeFilter || activeFilter.length === 0
             ? "bg-[#f3f2f1] text-[#333]"
             : "bg-(--color-primary) text-white"
         }`}
        >
          {(() => {
            const activeFilterCount = activeFilter
              ? Array.isArray(activeFilter)
                ? activeFilter.length
                : 1
              : 0;
            return activeFilterCount === 0
              ? "Філтри :"
              : activeFilterCount === 1
              ? "Фільтр 1"
              : `Фільтри ${activeFilterCount}`;
          })()}
        </div>
        <div
          className={`h-8 p-2 rounded text-xs flex justify-center items-center duration-300 
         cursor-pointer gap-x-2 ${
           !activeFilter || activeFilter.length === 0
             ? "bg-[#f3f2f1] text-[#333]"
             : "bg-(--color-primary) text-white"
         }`}
        >
          <Link href={buildClearFiltersLink()}>Отчистити фільтр
          </Link>
          <Image src="/X_SVG.svg" alt="X icon" width={20} height={20} 
          style={!activeFilter || activeFilter.length === 0 ? {} : {filter:"brightness(0) invert(1)"}}/>
        </div>
      </div>
        </>
    )
}