"use client";

import { useState } from "react";
import { LogoBlock } from "./LogoBlock";
import { SearchBlock } from "./SearchBlock";
import { UserBlock } from "./UserBlock";
import Link from "next/link";
import { Category } from "@/types/categories";

export function Header() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearchFocused,setIsSearchFocused] = useState(false);

  const fetchCategories = async () => {
    if (categories.length > 0) return;
    try {
      const response = await fetch(`/api/catalog`);
      const data = await response.json();
      console.log(data);

      setCategories(data);
    } catch (error) {
      console.error("Помилка завантаження категоріїЖ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMenu = () => {
    if(!isSearchFocused){
         setIsCatalogOpen(true);
    fetchCategories();
    }
   
  };


  const handleSearchFocusAction = (focused:boolean) => {
   setIsSearchFocused(focused);
   if(focused){
    setIsCatalogOpen(false);
   }
  }
  

  
   


  return (
    <header
      className="bg-[#ee6dd] w-full relative z-50 text-2xl rounded-2xl flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap:10 justify-between p-3 mb-3 md:shadow-(--shadow-default)"
      onMouseLeave={() => setIsCatalogOpen(false)} >
      
   
      <div className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-(--shadow-default) md:shadow-none">
        <LogoBlock />
        <div className="flex items-center w-full" onMouseEnter={openMenu} >
          <SearchBlock onFocusChangeAction={handleSearchFocusAction}/>
        </div>
      </div>

      <nav
        aria-label="Main menu"
        className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-(--shadow-default) md:shadow-none"
      >
        <UserBlock />
      </nav>

      {isCatalogOpen && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-[#82b638] shadow-blue-300 z-50 rounded-2xl">
          <div className="mx-auto px-4 py-3">
            {isLoading ? (
              <div className="py-2 text-center ">Завантаження...</div>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block   text-white text-base hover:text-[#eeb033]"
                    onClick={() => setIsCatalogOpen(false)}
                  >
                    {category.title}
                  </Link>
                ))}
                
                    <button className="absolute top-2 right-2 w-8 h-8 border border-white text-white flex items-center justify-center rounded text-sm leading-none p-0 m-0 hover:bg-white hover:text-black transition" 
                      onClick={() => setIsCatalogOpen(false)}>X</button>
               
              </div>
            ) : (
              <div className="py-2 text-center">
                Доступні категорії відсутні
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
