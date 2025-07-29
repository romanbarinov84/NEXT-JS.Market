"use client";

import { useState, useEffect } from "react";
import { CatalogProps } from "@/types/catalog";
import Link from "next/link";

const YourComponent = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/catalog");
        const data = await res.json();
        setCategories(data);
      } catch {
        setError("Не удалось загрузить категории");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  <div>
    {!categories.length && (
      <div className="text-red-500">Категории каталога ненайденны</div>
    )}
    {isLoading && <div className="text-center py-8">Загрузка...</div>}
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>;

  return (
    <section className="px-[max(12px,calc((100%-1208px)/2))] mx-auto mb-20">
      <h1
        className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl mb:text-5xl xl:text-[60px] text-[#333]
            shadow-2xl"
      >
        Каталог
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-100 rounded overflow-hidden min-h-50 h-full`}
          >
            <div className="h-full w-full">
                <Link href={`category-${category.id}`}>
                {category.title}
                </Link>
                </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YourComponent;
