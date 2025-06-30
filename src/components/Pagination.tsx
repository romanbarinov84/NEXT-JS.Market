"use client";
import { PaginationProps } from "@/types/paginationProps";
import Link from "next/link";

const createPageUrl = (
  basePath: string,
  params: URLSearchParams,
  page: number
) => {
  const newParams = new URLSearchParams(params);
  newParams.set("page", page.toString());
  return `${basePath}?${newParams.toString()}`;
};

//функция отображения странниц
const getVisiblePages = (totalPages: number, currentPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPages - 2);
  let end = Math.min(totalPages, currentPages + 2);

  if (currentPages <= 3) {
    end = 5;
  } else if (currentPages >= totalPages - 2) {
    start = totalPages - 4;
  }
  const pages: (number | string)[] = [];

  if (start > 1) {
    pages.push(1);
  }
  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }
  if (end < totalPages) {
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination = ({
  totalItems,
  currentPage,
  basePath,
  itemsPerPage,
  searchQuery,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const params = new URLSearchParams(searchQuery);
  const visiblePages = getVisiblePages(totalPages, currentPage);

  const buttonBase = "px-4 py-2 rounded duration-100";
  const buttonActive = "bg-[#ff6633] text-white hover:bg-[#70c05b]";
  const buttonDisabled = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex justify-center gap-4 mt-8 mb-12">
      <Link
        href={createPageUrl(basePath, params, 1)}
        aria-disabled={currentPage === 1}
        tabIndex = {currentPage === 1 ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === 1 ? buttonDisabled : buttonActive
        }`}
        
      >
        &lt;&lt;
      </Link>

      <Link
        href={createPageUrl(basePath, params, currentPage - 1)}
        aria-disabled={currentPage === 1}
         tabIndex = {currentPage === 1 ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === 1 ? buttonDisabled : buttonActive
        }`}
      >
        &lt;
      </Link>

      {visiblePages.map((page, index) => {
        if (page === "...") {
          return <span key={`elipsis-${index}`}>...</span>;
        }
        return (
          <Link
            key={page}
            href={createPageUrl(basePath, params, page as number)}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageUrl(basePath, params, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
         tabIndex = {currentPage === totalPages ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === totalPages ? buttonDisabled : buttonActive
        }`}
      >
        &gt;
      </Link>

      <Link
        href={createPageUrl(basePath, params, totalPages)}
        aria-disabled={currentPage === totalPages}
         tabIndex = {currentPage === totalPages ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === totalPages ? buttonDisabled : buttonActive
        }`}
      >
        &gt;&gt;
      </Link>
    </div>
  );
};
