import GenericListPage from "@/app/(products)/GenericListPage";

import { Suspense } from "react";

import FilterButtons from "../../../(category)/category/FilterButtons";
import FilterControls from "../../../(category)/category/FilterControls";
import PriceFilter from "../../../(category)/category/PriceFilter";
import DropFilter from "../../../(category)/category/DropFilter";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import Loader from "@/components/Loader";
import fetchCategory from "../../../(category)/category/fetchCategory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: PATH_TRANSLATIONS[category] || category,
    description: `Описание категории товаров "${
      PATH_TRANSLATIONS[category] || category
    }" магазина "Северяночка"`,
  };
}

const CategoryPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string;
    itemsPerPage?: string;
    filter?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    inStock?: string;
  }>;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;
  const priceFrom = resolvedSearchParams.priceFrom;
  const priceTo = resolvedSearchParams.priceTo;
  const inStock = resolvedSearchParams.inStock === "true";

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col mx-auto">
      <h1 className="ml-3 xl:ml-0 text-4xl md:text-5xl text-left font-bold text-[text-main-text] mb-8 md:mb-10 xl:mb-15 max-w-[336px] md:max-w-max leading-[150%]">
        {PATH_TRANSLATIONS[category] || category}
      </h1>
      <DropFilter basePath={`/category/${category}`} category={category} />
      <div className="hidden xl:flex">
        <FilterButtons basePath={`/category/${category}`} />
      </div>
      <div className="flex flex-row gap-x-10 justify-between">
        <div className="hidden xl:flex flex-col w-[272px] gap-y-10">
          <div className="h-11 bg-[#f3f2f1] rounded text-base font-bold text-[text-main-text] flex items-center p-2.5">
            Фильтр
          </div>
          <PriceFilter basePath={`/category/${category}`} category={category} />
        </div>
        <div className="flex flex-col">
          <div className="hidden xl:flex">
            <FilterControls basePath={`/category/${category}`} />
          </div>

          <Suspense fallback={<Loader />}>
            <GenericListPage
              searchParams={searchParams}
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
                contentType: "category",
                errorMessage: "Ошибка: не удалось загрузить категорию продукта", // 👈 ОБЯЗАТЕЛЬНО
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
