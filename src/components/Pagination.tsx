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

const getVisiblePages = (totalPages: number, currentPage: number) => {
  if (totalPages < 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    end = 5;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 4;
  }
  const pages: (number | string)[] = [];

  if (start > 1) pages.push(1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");

  if (end < totalPages) pages.push(totalPages);

  return pages;
};

export default function Pagination({
  totalItems,
  currentPage,
  basePath,
  itemsPerPage,
  searchQuery,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const params = new URLSearchParams(searchQuery);
  const visiblePages = getVisiblePages(totalPages, currentPage);

  const buttonSize =
    "w-5 h-5 md:w-10 flex items-center justify-center rounded duration-300";
  const buttonBase = "px-4 py-2 rounded duration-300";
  const buttonActive = "bg-[#ff6633] text-white hover:bg-[#70c05d]";
  const buttonDisabled = "opacity-50 cursor-not-allowed";
  const pageButtonClass = `border border-[#ff6633] ${buttonSize}`;

  return (
    <div className="flex justify-center md:mb-25 xl:mb-40 gap-4 pb-10 mt-8 mb-12">
      <Link
        href={createPageUrl(basePath, params, 1)}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === 1 ? buttonDisabled : buttonActive
        }`}
      >
        На першу
      </Link>

      <Link
        href={createPageUrl(basePath, params, currentPage - 1)}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === 1 ? buttonDisabled : buttonActive
        }`}
      >
        Назад
      </Link>

      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <Link
            key={page}
            href={createPageUrl(basePath, params, page as number)}
            className={`${pageButtonClass} ${
              currentPage === page ? buttonActive : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageUrl(basePath, params, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === totalPages ? buttonDisabled : buttonActive
        }`}
      >
        Вперед
      </Link>

      <Link
        href={createPageUrl(basePath, params, totalPages)}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
        className={`${buttonBase} ${
          currentPage === totalPages ? buttonDisabled : buttonActive
        }`}
      >
        На останню
      </Link>
    </div>
  );
}
