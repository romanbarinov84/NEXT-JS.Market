"use client";

import HeaderUserBlock from "./userBlock/UserBlock";
import LogoBlock from "./LogoBlock";
import NavBlock from "./NavBlock";
import SearchBlock from "./SearchBlock";
import { useRef, useState } from "react";
import Link from "next/link";
import { Category } from "@/types/categories";
import Loader from "../Loader";

export default function Header() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const searchBlockRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused,setIsSearchFocused] = useState(false);

  const fetchCategories = async () => {
    if (categories.length > 0) return;

    try {
      const response = await fetch("/api/catalog");
      const data = await response.json();
      console.log(data)
      return setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категории", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMenu = () => {
    if(!isSearchFocused){
       setIsCatalogOpen(true);
    fetchCategories();
    }
   
  }

  const handleMouseMove = (e:React.MouseEvent) => {
     if(!searchBlockRef.current || !isCatalogOpen || isSearchFocused) return

     const isInsideMenu = menuRef.current?.contains(e.target as Node);
     if(isInsideMenu) return

     const searchBlockRect = searchBlockRef.current.getBoundingClientRect();
     if(e.clientX < searchBlockRect.left || e.clientX > searchBlockRect.right){
      setIsCatalogOpen(false)
     }
  }

  const handleSearchFocusAction = (focused:boolean) => {
   setIsSearchFocused(focused)
   if(focused){
    setIsCatalogOpen(false)
   }
  }

  return (
    <div>
      <header className="bg-white w-full md:shadow-(--shadow-default) relative z-50 flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap-10  md:p-2 justify-center" onMouseLeave={() => setIsCatalogOpen(false)}
        onMouseMove={handleMouseMove}>
        <div className="flex w-full mt-2 flex-row gap-4 xl:gap-10 py-2 px-4 items-center md:shadow-(--shadow-default)">
          <LogoBlock />
          <div className="flex items-center" onMouseEnter={openMenu} ref={searchBlockRef}
           >
              <SearchBlock onFocusChangeAction={handleSearchFocusAction}/>
          </div>

          {isCatalogOpen && (
              <div ref={menuRef} className="hidden md:block absolute top-full left-0 w-full bg-white shadow-( --shadow-article) md:shadow-none z-50">
            <div className="mx-auto px-4 py-6">
              {isLoading ? (<Loader/>) : categories.length > 0 ? ( <div className="grid grid-cols-2 xl:grid grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link key={category.id}
                  href={`/category/${category.id}`}
                  className="block px-4 py-2 text-[#333] hover:text-[#ff6633] font-bold duration-300"
                  onClick={() => setIsCatalogOpen(false)}
                >
                  {category.title}
                </Link>
                ))}
              
                
              </div>) : (<div className="py-2 text-center">Нет доступных категорий</div>) }
             
            </div>
          </div>
          )}
        
        
          <HeaderUserBlock />
        </div>
      </header>
      <NavBlock />
    </div>
  );
}
