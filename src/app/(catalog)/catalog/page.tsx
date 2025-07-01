"use client";

import { CatalogProps } from "@/types/catalog";
import { useEffect, useState } from "react";
import GridCategoryBlock from "../GridCategoryBlock";


export default function CatalogPage() {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [isEditing,setIsEditing] = useState(false);
  const [draggetCategory,setDraggetCategory] = useState<CatalogProps | null>(null);
  const [error,setError] = useState<string | null >(null);
  const [isLoading,setIsLoading] = useState(false);
  const isAdmin = true;

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/catalog");
      if (!response.ok) throw new Error(`Ошибка ответа : ${response.status}`);

      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a,b) => a.order - b.order))
    } catch (error) {
        console.error("Невдалося загрузити каталог", error);
        setError("Невдалося загрузити каталог");
    }
    finally{
   setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleEditing = async() => {
     setIsEditing(!isEditing);
  }

  const handleDragStart = (category:CatalogProps) =>{
    if(isEditing) {
         setDraggetCategory(category)
    }
  }

  const resetLayout = () => {
    fetchCategories()
  }

  if(isLoading) {
    return <div className="text-center py-8 text-[#3838ff]">Загрузка каталога...</div>
  }
  if(error) {
    return <div className="text-center py-8 text-[#ec1313]">Помилка завантаженна...{error}</div>
  }

  if(!categories.length){
    return <div className="text-center py-8 text-[#09f56c]">Категорія каталогу не знайденна</div>
  }



  return (
     <section className="w-full max-w-[1208px] px-[max(12px,calc((100%-1208px)/2))] mx-auto">
        {isAdmin && (
            <div className=" flex justify-end mb-4">
                <button onClick={handleToggleEditing} className="border border-[#00f100] bg-(--color-primary) shadow-(--shadow-button-default) justify-center items-center duration-300 cursor-pointer select-none
                   hover:text-white hover:bg-orange-400 hover:border-orange-800 p-2 rounded-2xl ">
                    {isEditing ? "Закінчити редагування" : "Змінити положення"}</button>
                    {isEditing && (
                        <button  className="border border-[#00f100] bg-(--color-primary) rounded-2xl hover:text-white hover:bg-orange-400 p-2" onClick={resetLayout}>Скинути</button>
                       
                    )}
                  
            </div>
        )}
       <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl mb:text-5xl">
        <h1>Каталог</h1>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {categories.map((category) => (
            <div key={category._id} className={`p-2 bg-[#fefefe] shadow rounded-xl text-center font-semibold hover:shadow-xl hover:shadow-[#e7dfe4] ${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan}`}>
                <div className=" relative h-48 w-full" 
                draggable={isEditing} onDragStart={() => handleDragStart(category)}>
           <GridCategoryBlock 
           id={category.id} 
           title={category.title} 
           img={category.img}/>
                </div>
               
        
           </div>
          
        ))}
       </div>
       
  </section>
  
  )
};
