"use client";

import { useEffect, useRef, useState } from "react";

import { SearchProduct } from "@/types/searchProduct";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInpur";
import SearchResults from "./searchResults";

export function HighLightText({
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

export default function InputBlock({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
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
          setError("Ненайден продукт или категория");
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
    onFocusChangeAction(true);
  };

  const resetSearch = () => {
    setIsLoading(false);
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
  };

  return (
    <div>
      <div className="min-w-[261px] relative flex-grow" ref={searchRef}>
        <SearchInput
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          handleInputBlur={handleInputBlur}
          handleInputFocus={handleInputFocus}
        />

        {isOpen && (
          <div className="absolute -mt-1 left-0 right-0 z-10 max-h-[300px] overflow-y-auto bg-white rounded-b border-2 border-(--color-primary) border-t-0 shadow-inherit ">
            {error && (
              <div className="p-2 text-red-500 text-sm">
                {error}
                <button
                  onClick={() => setError(null)}
                  className="rounded p-2 bg-red-400 text-white"
                >
                  Повторить
                </button>
              </div>
            )}
            <SearchResults
              query={query}
              groupedProducts={groupedProducts}
              isLoading={isLoading}
              resetSearch={resetSearch}
              
            />
          </div>
        )}
      </div>
    </div>
  );
}
