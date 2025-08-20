import { SearchInputProps } from "@/types/searchInputProps";
import Image from "next/image";


export default function SearchInput({query,setQuery,handleSearch,handleInputBlur,handleInputFocus}:SearchInputProps){

    return(
        <>
         <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="relative rounded border-2 border-(--color-primary) shadow-(--shadow-button-default) leading-[150%]">
            <input
              type="text"
              value={query}
              placeholder="Search"
              className="w-full h-10 rounded p-2 py-2 px-4
             outline-none text-[#8f8f8f] text-base caret-[var(--color-primary]"
              onFocus={handleInputFocus}
              onChange={(e) => setQuery(e.target.value)}
              name="search"
              onBlur={handleInputBlur}
            />
          </div>
          <button
            type="submit"
            className="hidden md:block absolute top-2 right-2 cursor-pointer"
          >
            <Image
              src="/LoupeHeadInput.svg"
              alt="LoupeIcon"
              width={24}
              height={24}
            />
          </button>
        </form>
        </>
    )
}