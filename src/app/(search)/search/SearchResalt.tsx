"use client";

import ProductSection from "@/app/(products)/ProductsSection";
import Loader from "@/components/Loader";
import { ProductCardProps } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchRes() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/search-full?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка запроса");
        setProducts(data);
      } catch (error) {
        console.error("Не удалось получить результаты", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))] text-[text-main-text] ">
        <h1 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg mb-6">
          Список товарів
        </h1>
        <p>
          По запиту <span className="text-[#ff6633]">{query}</span>
        </p>
        {products.length === 0 ? (
          <p>Нічого не знайденно</p>
        ) : (
          <ProductSection
            title={""}
            products={products}
            applyIndexStyles={false}
          />
        )}
      </div>
    </>
  );
}
