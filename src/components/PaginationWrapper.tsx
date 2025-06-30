"use client";
import { useEffect, useState } from "react";
import { CONFIG } from "../../config/config";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { debounce } from "../../utils/debounce";
import { Pagination } from "./Pagination";

function getItemsPerPageByWith(contentType?:string) {
const width = window.innerWidth;
  if(contentType){
    return width < 640 ? 1 : 3;
  }
  
  if (width < 768) return 2;
  if (width < 1280) return 3;
  return 4;
}

export const PaginationWrapper = ({
  totalItems,
  currentPage,
  basePath,
  contentType,
}: {
  totalItems: number;
  currentPage: number;
  basePath: string;
  contentType?:string;
}) => {

   const [itemsPerPage,setItemsPerPage] = useState(contentType === "article" ? 1 : CONFIG.ITEMS_PER_PAGE);
   const searchParams = useSearchParams();
   const router = useRouter();

   useEffect(() => {
    const updateItemsPerPage = () => {
        const newItemsPerPage = getItemsPerPageByWith(contentType);
        if(newItemsPerPage === itemsPerPage) return;
        setItemsPerPage(newItemsPerPage)

        const params = new URLSearchParams(searchParams.toString());
        params.set("itemsPerPage",newItemsPerPage.toString())
        //что бы при изменении экрана не оказалась пустая странница
        params.set("page","1")

        router.replace(`${basePath}?${params.toString()}`, {scroll:false});
    };
    updateItemsPerPage();

    const handleResize = debounce(updateItemsPerPage, 200);

    window.addEventListener("resize",handleResize);
    return () => window.removeEventListener("resize",handleResize);
   },[itemsPerPage,searchParams,basePath,router,contentType]);

  return <div>
    <Pagination 
      totalItems={totalItems}
      currentPage={currentPage}
      basePath={basePath}
      itemsPerPage={itemsPerPage}
      searchQuery={searchParams.toString()}
      />
  </div>;
};
