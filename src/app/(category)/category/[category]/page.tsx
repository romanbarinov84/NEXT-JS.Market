import GenericListPage from "@/app/(products)/GenericListPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchCategory from "../fetchCategory";
import FilterButtons from "../FilterButtons";

import FilterControls from "../FilterControls";
import PriceFilter from "../PriceFilter";
import DropFilter from "../DropFilter";

export async function generateMetaData({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: PATH_TRANSLATIONS[category] || category,
    description: `Описание категории продукта ${
      PATH_TRANSLATIONS[category] || category
    } `,
  };
}

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string;
    perPage?: string;
    filter?: string | string[];
    priceFrom?:string;
    priceTo?:string;
    inStock?:string;
  }>;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;
  const priceFrom = resolvedSearchParams.priceFrom;
  const priceTo = resolvedSearchParams.priceTo;
  const inStock = resolvedSearchParams.inStock === "true";

  return (
    <div className="flex flex-col mx-auto  px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-5 md:mb-25 xl:mb-10  ">
      <h1 className=" ml-3 xl:ml-0 mb-3 md:mb-5 xl:mb-10  mb-4 md:mb-3 text-shadow-lg font-bold xl:mb-3 flex flex-row text-4xl md:text-5xl xl:text-[40px] text-[#333] md:max-w-max leading-[150%] ">
        {PATH_TRANSLATIONS[category] || category}
      </h1>
       <DropFilter basePath={`/category/${category}`} category={category}/>
       <div className=" hidden xl:flex flex-wrap gap-4 mb-6 items-center">
          <FilterButtons basePath={`/category/${category}`} />
       </div>
     
      <div className="flex flex-row gap-x-5 justify-between">
        <div className="hidden xl:flex flex-col w-[272px] gap-y-6 ">
          <div className="h-11 bg-white rounded text-base font-bold text-[#333] flex items-center p-2.5">
            FILTER
          </div>
          <div className="bg-white p-2 rounded ">
            <PriceFilter
              basePath={`/category/${category}`}
              category={category}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="hidden xl:flex   <ul
            className={`grid ${gridClasses} gap-4 md:gap-6 xl:gap-10 justify-items-center`}
          >">
         
            <FilterControls
            basePath={`/category/${category}`}
            
          />
          </div>
          
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <GenericListPage
          searchParams={Promise.resolve(resolvedSearchParams)}
          props={{
            fetchData: ({ pagination: { startIdx, perPage } }) =>
              fetchCategory(category, {
                pagination: { startIdx, perPage },
                filter: activeFilter,
                priceFrom,
                priceTo,
                inStock,
              }),

            basePath: `/category/${category}`,
            errorMessage: "Ошибка: не удалось загрузить категорию продукта",
            contentType: "category",
          }}
        />
      </Suspense>
    </div>
  );
}
