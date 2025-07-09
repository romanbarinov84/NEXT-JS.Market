"use client";

import { SearchProduct } from "@/types/searchProduct";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { PATH_TRANSLATIONS } from "../../../../utils/pathTranslations";
import HighLineText from "../HighLightText";

import { useRouter } from "next/navigation";
import MiniLoader from "../../MiniLoader";
import SearchInput from "./SearchInput";

export function InputBlock({onFocusChangeAction}: {onFocusChangeAction:(focused:boolean) => void}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [groupedProducts, setGroupedProducts] = useState<
    { category: string; products: SearchProduct[] }[]
  >([]);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();
          console.log(data);
          setGroupedProducts(data);
        } catch (error) {
          console.error("not find product or category", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGroupedProducts([]);
      }
    };
    const debounceTimer = setTimeout(fetchSearchData, 300);
    return () => clearTimeout(debounceTimer); //запрос выполнится только после паузы в печати
  }, [query]);

  const handleInputFocus = () => {
    setIsOpen(true);
    onFocusChangeAction(true);
  };

  const resetSearch = () => {
    setIsOpen(false);
    setQuery("");
   
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      resetSearch();
    }
  };

  const handleInputBlur = () => {
    onFocusChangeAction(false);
  }

  return (
    <div className="relative flex  min-w-[261px] flex-grow" ref={searchRef}>
      <div className="relative rounded border-1 border-(--color-primary) shadow-(--shadow-button-default)leading-[150%]">
        <SearchInput handleSearch={handleSearch} query={query} handleInputFocus={handleInputFocus}  handleInputBlur ={handleInputBlur } setQuery={setQuery}/>

        {isOpen && (
          <div className="absolute -mt-0.5 left-0 right-0 z-100 max-h-[300px] overflow-y-auto bg-white rounded-b border-1  border-(--color-primary) border-t-0 shadow-inherit text-gray-500">
            {isLoading ? (
              <MiniLoader/>
            ) : groupedProducts.length > 0 ? (
              <div className="p-2 flex flex-col gap-2">
                {groupedProducts.map((group) => (
                  <div key={group.category} className="flex flex-col gap-2">
                    <Link
                      href={`/category/${encodeURIComponent(
                        PATH_TRANSLATIONS[group.category] || group.category
                      )}`}
                      className="flex items-start gap-x-4 text-orange-500 hover:bg-orange-200 rounded p-1"
                      onClick={resetSearch}
                    >
                      <div className="break-words">
                        <HighLineText
                          text={
                            PATH_TRANSLATIONS[group.category] || group.category
                          }
                          highLight={query}
                        />
                      </div>
                      <Image
                        src="/menu-burger.svg"
                        alt="Search-button"
                        width={20}
                        height={20}
                        className=" flex-shrink-0 absolute  top-5 right-12 "
                      />
                    </Link>
                    <ul className="flex flex-col gap-2">
                      {group.products.map((product) => (
                        <li
                          key={product.id}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Link
                            href={`/product/${product.title}`}
                            className="break-words cursor-pointer"
                            onClick={resetSearch}
                          >
                            <HighLineText
                              text={product.title}
                              highLight={query}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="text-center p-4 text-red-400">
                Нічого не знайденно
              </div>
            ) : (
              <div className="p-4 text-center text-green-300">
                Введіть більше 2 символів
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
