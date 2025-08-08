"use client";

import { useState, useEffect } from "react";
import { CatalogProps } from "@/types/catalog";

import Loading from "./Loading";
import CatalogGrid from "../CatalogGrid";

const CatalogPage = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedCategory, setDraggedCategory] = useState<CatalogProps | null>(
    null
  );
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAdmin = true;

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/catalog");
      if (!response.ok)
        throw new Error(`Ошибка ответа сервера: ${response.status}`);

      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Ошибка при изменении каталога категорий:", error);
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Не удалось загрузить каталог категорий",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateOrderInDB = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("api/catalog", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(
          categories.map((category, index) => ({
            _id: category._id,
            order: index + 1,
            title: category.title,
            img: category.img,
            colSpan: category.colSpan,
            tabletColSpan: category.tabletColSpan,
            mobileColSpan: category.mobileColSpan,
          }))
        ),
      });
      if (!response.ok) {
        throw new Error("Ошибка при обновлении порядка каталога");
      }
      const result = await response.json();
      if (result.success) {
        console.log("Порядок успешно обновлен в MongoDB");
      }
    } catch (error) {
      console.error("Ошибка при изменении каталога категорий:", error);
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Не удалось изменить каталог категорий",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEditing = async () => {
    if (isEditing) {
      await updateOrderInDB();
    }
    setIsEditing(!isEditing);
  };

  const resetLayout = () => {
    fetchCategories();
  };

  const handleDragStart = (category: CatalogProps) => {
    if (isEditing) {
      setDraggedCategory(category);
    }
  };

  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggedCategory && draggedCategory._id !== categoryId) {
      setHoveredCategoryId(categoryId);
    }
  };

  const handleDragLeave = () => {
    setHoveredCategoryId(null);
  };

  const handleDrop = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    if (!isEditing || !draggedCategory) return;

    setCategories((prevCategories) => {
      const draggedIndex = prevCategories.findIndex(
        (c) => c._id === draggedCategory._id
      );
      const targetIndex = prevCategories.findIndex(
        (c) => c._id === targetCategoryId
      );
      if (draggedIndex === -1 || targetIndex === -1) return prevCategories;

      const newCategories = [...prevCategories];

      const draggedItem = newCategories[draggedIndex];
      const targetItem = newCategories[targetIndex];

      const draggedSizes = {
        mobileColSpan: draggedItem.mobileColSpan,
        tabletColSpan: draggedItem.tabletColSpan,
        colSpan: draggedItem.colSpan,
      };
      const targetSizes = {
        mobileColSpan: targetItem.mobileColSpan,
        tabletColSpan: targetItem.tabletColSpan,
        colSpan: targetItem.colSpan,
      };

      newCategories[draggedIndex] = { ...targetItem, ...draggedSizes };
      newCategories[targetIndex] = { ...draggedItem, ...targetSizes };

      return newCategories;
    });

    setDraggedCategory(null);
    setHoveredCategoryId(null);
  };

  if (error) {
    throw error;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-[max(12px,calc((100%-1208px)/2))] pb-20 ">
      {isAdmin && (
        <div className="flex justify-end ">
          <button
            onClick={handleToggleEditing}
            className="border border-(--color-primary) hover:text-white hover:bg-[#ff6633] hover:border-transparent active:shadow-(--shadow-button-active) w-1/4 h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none"
          >
            {isEditing ? "Закінчити редагування " : "Редагувати"}
          </button>
          {isEditing && (
            <button
              onClick={resetLayout}
              className="ml-3 p-2 text-xs justify-center items-center active:shadow-(--shadow-button-active) border-none rounded cursor-pointer transition-colors duration-300 bg-[#f3f2f1] hover:shadow-(--shadow-button-default)"
            >
              Скинути
            </button>
          )}
        </div>
      )}
      <h1 className="mb-4 md:mb-8 font-bold xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[60px] text-[#333] shadow-2xl">
        Каталог
      </h1>

      {isLoading && <Loading />}
      {!isLoading && !error && categories.length === 0 && (
        <div className="text-red-500 text-center">
          Категории каталога не найдены
        </div>
      )}

      <CatalogGrid  isEditing={isEditing} draggedCategory={draggedCategory} categories={categories} hoveredCategoryId={hoveredCategoryId} handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} handleDrop={handleDrop}/>
    </section>
  );
};

export default CatalogPage;
