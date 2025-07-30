"use client";

import { useState, useEffect } from "react";
import { CatalogProps } from "@/types/catalog";
import Link from "next/link";
import Image from "next/image";

const YourComponent = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/catalog");

        if (!res.ok) throw new Error("Ошибка запроса");

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

  return (
    <section className="px-[max(12px,calc((100%-1208px)/2))] mx-auto mb-20 ">
      <h1
        className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[60px] text-[#333] shadow-2xl"
      >
        Каталог
      </h1>

      {/* Отображение загрузки, ошибки и пустого массива */}
      {isLoading && <div className="text-center py-8">Загрузка...</div>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!isLoading && !error && categories.length === 0 && (
        <div className="text-red-500 text-center">Категории каталога не найдены</div>
      )}

      {/* Отображение категорий */}
      <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-100 rounded overflow-hidden min-h-50 h-full `}
          >
            <Link
              href={`category-${category.id}`}
              className="relative block h-full overflow-hidden group min-w-40 md:min-w-[224px] xl:min-w-[274px]"
            >
              <Image
                src={category.img}
                alt={category.title}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
              />

              
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(112,192,91,0.0)_0%,rgba(112,192,91,0.82)_82.813%)] h-[117px] top-auto group-hover:bg-[linear-gradient(180deg,rgba(255,102,51,0)_0%,rgba(255,102,51,1)_100%)] group-hover:h-[177px] transition-all duration-300"></div>


              <div className="absolute left-2.5 bottom-3 flex items-center justify-center">
                <span className="text-gray-300 text-lg font-bold">{category.title}</span></div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YourComponent;

