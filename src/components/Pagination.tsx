"use client"

import { PaginationProps } from "@/types/paginationProps"
import Link from "next/link";

export default function Pagination({totalItems,currentPage,basePath,itemsPerPage,searchQuery}:PaginationProps){

    const totalPages = Math.ceil(totalItems / itemsPerPage) ;
    const params = new URLSearchParams(searchQuery);

    const createPageUrl = (page: number) => {
       const newParams = new URLSearchParams(params);
       newParams.set("page",page.toString());
       return `${basePath}?${newParams.toString()}`;

    }

    return(
        <div className="flex justify-center gap-4 mt-8 mb-12">
          <Link href={createPageUrl(currentPage - 1)} onClick={(e) => {if(currentPage === 1) e.preventDefault()}}>Назад</Link>
          <Link href={createPageUrl(currentPage + 1)} onClick={(e) =>{if(currentPage === totalPages)e.preventDefault()} }>Вперед</Link>
        </div>
    )
}