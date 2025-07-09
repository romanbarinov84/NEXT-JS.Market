import Image from "next/image";
import { SearchInputProps } from "@/types/SearchInputProps";


export default function SearchInput({handleSearch,query,handleInputFocus,handleInputBlur,setQuery }:SearchInputProps){
    
    return(
        <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={query}
            placeholder="пошук товару"
            className="w-full h-10 p-2 py-4 px-14   outline-none text-[#8f8f8f] text-base "
            onFocus={handleInputFocus}
            onChange={(e) => setQuery(e.target.value)}
            name="search"
            onBlur={handleInputBlur}
          />
          <button
            className="absolute top-2 right-2 w-6 h-6 cursor-pointer "
            type="submit"
          >
            <Image
              src="/icons/free-icon-loupe-9970873.png"
              alt="Search-button"
              width={40}
              height={40}
              className="absolute  top-0 right-2 "
            />
          </button>
        </form>
        </>
    )
}