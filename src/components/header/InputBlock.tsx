"use client";
import { PATH_TRANSLATIONS } from "../../../utils/pathTranslations";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { SearchProduct } from "@/types/searchProduct";
import { useRouter } from "next/navigation";

function HighLightText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  if (!highlight.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function InputBlock() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groupedProducts, setGroupedProducts] = useState<
    { category: string; products: SearchProduct[] }[]
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const response = await fetch(`api/search?query=${query}`);
          const data = await response.json();
          setGroupedProducts(data);
        } catch (err) {
          console.error("Ошибка не найден продукт или категория", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGroupedProducts([]);
      }
    };
    const debounceTimer = setTimeout(fetchSearchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const resetSearch = () => {
    setIsLoading(false);
    setQuery("");
  };

  const handleSearch = () => {

    if(query.trim()){
      router.push(`/search?q=${encodeURIComponent(query)}`);
      resetSearch()
    }
  };

  return (
    <div>
      <div className="min-w-[261px] relative flex-grow" ref={searchRef}>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSearch();
        }}>
          <div className="relative rounded border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-[150%]">
            <input
              type="text"
              value={query}
              placeholder="Search"
              className="w-full h-10 rounded p-2 py-2 px-4
             outline-none text-[#8f8f8f] text-base "
              onFocus={handleInputFocus}
              onChange={(e) => setQuery(e.target.value)}
              name="search"
            />
          </div>
         <button type="submit" className="hidden md:block absolute top-2 right-2 cursor-pointer">
            <Image
            src="/LoupeHeadInput.svg"
            alt="LoupeIcon"
            width={24}
            height={24}
            
          />
         </button>
        
        </form>

        {isOpen && (
          <div className="absolute -mt-1 left-0 right-0 z-10 max-h-[300px] overflow-y-auto bg-white rounded-b border-2 border-(--color-primary) border-t-0 shadow-inherit ">
            {isLoading ? (
              <Loader />
            ) : groupedProducts.length > 0 ? (
              <div className="px-2 flex flex-col gap 3 ">
                {groupedProducts.map((group) => (
                  <div key={group.category} className="flex flex-col gap-3">
                    <Link
                      href={`/category/${encodeURIComponent(group.category)}`}
                      className="flex items-start justify-between gap-x-4 bg-[#ff6633] text-white rounded p-1 
              cursor-pointer hover:text-white"
                      onClick={resetSearch}
                    >
                      <div>
                        <HighLightText
                          text={
                            PATH_TRANSLATIONS[group.category] || group.category
                          }
                          highlight={query}
                        />
                      </div>
                      <Image
                        src="/burger-icon.svg"
                        alt="burger-icon"
                        width={24}
                        height={24}
                        sizes="24px"
                        className="flex-shrink-0"
                      />
                    </Link>
                    <ul className="flex flex-col gap-3">
                      {group.products.map((product, index) => (
                        <li
                          key={`${group.category}-${product.id}-${index}`}
                          className="p-1 hover:bg-gray-200 hover:text-white"
                        >
                          <Link
                            href={`/product/${product.id}`}
                            className="cursor-pointer"
                          >
                            <HighLightText
                              text={product.title}
                              highlight={query}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="text-red-500">Ничего не найденно</div>
            ) : (
              <div className="text-green-400">
                Введите 2 и более символов для поиска{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
