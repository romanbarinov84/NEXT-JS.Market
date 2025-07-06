"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function InputBlock() {
  const [isOpen,setIsOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [groupedProducts,setGroupedProducts] = useState([]);

  useEffect(() => {
   const fetchSearchData = async () =>{
      if(query.length > 1){
        try{
         setIsLoading(true);
         const response = await fetch(`*api/search?query=${query}`);
         const data = await response.json();
         setGroupedProducts(data);
         return data;
        }catch(error){
         console.error("not find product or category",error);
        }
        finally{
        setIsLoading(false);
      }
      }else{
        setGroupedProducts([]);
      }
      
   }
   const debounceTimer = setTimeout(fetchSearchData, 300);
   return () => clearTimeout(debounceTimer);  //запрос выполнится только после паузы в печати
  },[query]);

  const handleInputFocus = () => {
    setIsOpen(true);
  }

 const resetSearch = () =>{
  setIsOpen(false);
  setQuery("")
 }

  return (
    <div className="relative flex  min-w-[261px] flex-grow">
      <div className="relative rounded border-1 border-(--color-primary) shadow-(--shadow-button-default)leading-[150%]">
        <input
          type="text"
          placeholder="пошук товару"
          className="w-full h-10 p-2 py-4 px-14   outline-none text-[#8f8f8f] text-base "
          onFocus={handleInputFocus}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Image
          src="/icons/free-icon-loupe-9970873.png"
          alt="Search-button"
          width={40}
          height={40}
          className="absolute  top-0 right-2 "
        />

        {isOpen && (
            <div className="absolute -mt-0.5 left-0 right-0 z-10 max-h-[300px] overflow-y-auto bg-white rounded-b border-1  border-(--color-primary) border-t-0 shadow-inherit text-gray-500">
              {isLoading ? (<div className=" p-4 text-center text-orange-400">Пошук...</div>) : groupedProducts.length > 0 ? (

                  <div className="p-2 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-start gap-x-4 hover:bg-gray-200 rounded p-1"
                onClick={resetSearch}
              >
                <div className="break-words">link to category</div>
                <Image
                  src="/menu-burger.svg"
                  alt="Search-button"
                  width={20}
                  height={20}
                  className=" flex-shrink-0 absolute  top-2 right-2 "
                />
              </Link>
              <ul className="flex flex-col gap-2">
                <li className="p-1 hover:bg-gray-200 rounded">
                  <Link href="#" className="break-words cursor-pointer
                  "  onClick={resetSearch}></Link>
                </li>
               
              </ul>
            </div>
          </div>
              ): query.length > 1 ? (<div className="text-center p-4 text-red-400">Нічого не знайденно</div> ) : (<div className="p-4 text-center text-green-300">Введіть більше 2 символів</div>)}
        
        </div>
        ) }
      
      </div>
    </div>
  );
}
