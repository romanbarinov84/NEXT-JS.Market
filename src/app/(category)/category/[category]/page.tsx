import GenericListPage from "@/app/(products)/GenericListPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchCategory from "../fetchCategory";
import FilterButtons from "../FilterButtons";

import FilterControls from "../FilterControls";

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
  }>;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;

  return (
    <div className="flex flex-col mx-auto  px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-5 md:mb-25 xl:mb-10  ">
      <h1 className=" ml-3 xl:ml-0 mb-3 md:mb-5 xl:mb-10  mb-4 md:mb-3 text-shadow-lg font-bold xl:mb-3 flex flex-row text-4xl md:text-5xl xl:text-[40px] text-[#333] md:max-w-max leading-[150%] ">
        {PATH_TRANSLATIONS[category] || category}
      </h1>

      <FilterButtons basePath={`/category/${category}`} />
      <div className="flex flex-row gap-x-5 justify-between">
        <div className="hidden xl:flex flex-col w-[272px] gap-y-6 ">
          aaaa
          <div className="h-11 bg-white rounded text-base font-bold text-[#333] flex items-center p-2.5">
            FILTER
          </div>
        </div>
        <div className="flex flex-col">
          ssssss
          <FilterControls
            activeFilter={resolvedSearchParams.filter}
            basePath={`/category/${category}`}
            searchParams={{
              page: resolvedSearchParams.page,
              perPage: resolvedSearchParams.perPage,
            }}
          />
          card
          <Suspense fallback={<Loader />}>
            <GenericListPage
              searchParams={Promise.resolve(resolvedSearchParams)}
              props={{
                fetchData: ({ pagination: { startIdx, perPage } }) =>
                  fetchCategory(category, {
                    pagination: { startIdx, perPage },
                    filter: activeFilter,
                  }),

                basePath: `/category/${category}`,
                errorMessage: "Ошибка: не удалось загрузить категорию продукта",
                contentType: "category",
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
