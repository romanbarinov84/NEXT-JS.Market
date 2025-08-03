
"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { SearchProduct } from "@/types/searchProduct";

export default function InputBlock() {

  const [isOpen,setIsOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [groupedProducts,setGroupedProducts] = useState<{category:string;products:SearchProduct[]}[]>([]);

  useEffect(() => {
    const fetchSearchData = async() => {
      if(query.length > 1 ){
        try{
       setIsLoading(true)
       const response = await fetch(`*api/search?query=${query}`);
       const data = await response.json();
        setGroupedProducts(data)
        }catch(err){
          console.error("Ошибка не найден продукт или категория",err)
        }finally{
          setIsLoading(false);
        }
      }else{
        setGroupedProducts([]);
      }
    }
    const debounceTimer = setTimeout(fetchSearchData,300);
    return () => clearTimeout(debounceTimer);
  },[query])
  
   const handleInputFocus = () => {
      setIsOpen(true)
   }
   
   const resetSearch = () => {
    setIsLoading(false);
    setQuery("")
   }

  return (
    <div>
      <div className="min-w-[261px] relative flex-grow">
        <div className="relative rounded border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-[150%]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 rounded p-2 py-2 px-4
             outline-none text-[#8f8f8f] text-base "
             onFocus={handleInputFocus}
             onBlur={() => setIsOpen(false)}
             onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Image
          src="/LoupeHeadInput.svg"
          alt="LoupeIcon"
          width={24}
          height={24}
          className="hidden md:block absolute top-2 right-2 cursor-pointer"
        />

        {isOpen && (
          <div className="absolute -mt-1 left-0 right-0 z-10 max-h-[300px] overflow-y-auto bg-white rounded-b border-2 border-(--color-primary) border-t-0 shadow-inherit ">
            {isLoading  ? (<Loader/>) : groupedProducts.length > 0  ? (
               <div className="px-2 flex flex-col gap 3 ">
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="flex items-start justify-between gap-x-4 hover:bg-gray-400 rounded p-1 
              cursor-pointer hover:text-white"
              onClick={resetSearch}
              >
                <div>text link of cat</div>
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
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                    
                  </Link>
                </li>
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                  </Link>
                </li>
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                  </Link>
                </li>
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                  </Link>
                </li>
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                  </Link>
                </li>
                <li className="p-1 hover:bg-gray-200 ">
                  <Link
                    href="#"
                    className="hover:text-white break-words cursor-pointer"
                    onClick={resetSearch}
                  >
                    Food and dishes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
            ): query.length > 1 ? (<div className="text-red-500">Ничего не найденно</div>) : (<div className="text-green-400">Введите 2 и более символов для поиска </div>)}
         
        </div>
        ) }

        
      </div>
    </div>
  );
}
