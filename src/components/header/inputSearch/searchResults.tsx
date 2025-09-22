import Image from "next/image"
import { PATH_TRANSLATIONS } from "../../../../utils/pathTranslations";
import Loader from "@/components/Loader";
import Link from "next/link";
import { HighLightText } from "./InputBlock";
import { SearchResultProps } from "@/types/searchResultsProps";

export default function SearchResults({query,groupedProducts,isLoading,resetSearch}:SearchResultProps){
     
   
    return(
        <>
           {isLoading ? (
              <Loader />
            ) : groupedProducts.length > 0 ? (
              <div className="px-2 flex flex-col gap 3 ">
                {groupedProducts.map((group) => (
                  <div key={group.category} className="flex flex-col gap-3">
                    <Link
                      href={`/catalog/${encodeURIComponent(group.category)}`}
                      className="flex items-start justify-between gap-x-4 bg-[#ff6633] text-white rounded p-1 
              cursor-pointer hover:text-white"
                      onClick={resetSearch}
                    >
                      <div>
                        <HighLightText
                          text={
                            PATH_TRANSLATIONS[group.category] || group.category
                          }
                          highlight={query}
                        />
                      </div>
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
                      {group.products.map((product, index) => (
                        <li
                          key={`${group.category}-${product.id}-${index}`}
                          className="p-1 hover:bg-gray-200 hover:text-white"
                        >
                          <Link
                            href={`/catalog/${encodeURIComponent(group.category)}/${product.id}?
                              desc=${encodeURIComponent(product.title.substring(0,50))}`}
                            className="cursor-pointer"
                          >
                            <HighLightText
                              text={product.title}
                              highlight={query}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="text-blue-300">Ничего не найденно</div>
            ) : (
              <div className="text-green-400">
                Введите 2 и более символов для поиска{" "}
              </div>
            )}
        </>
    )
}