import GenericListPage from "@/app/(products)/GenericListPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchCategory from "../fetchCategory";
import FilterButtons from "../FilterButtons";

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
  searchParams: Promise<{ page?: string; perPage?: string }>;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-5 md:mb-25 xl:mb-10 ">
      <h1 className="mb-4 md:mb-3 text-shadow-lg font-bold xl:mb-3 flex flex-row text-4xl md:text-5xl xl:text-[40px] text-[#333] ">{PATH_TRANSLATIONS[category] || category}</h1>

     <FilterButtons basePath={`/category/${category}`}/>

      <Suspense fallback={<Loader />}>
      <GenericListPage
        searchParams={Promise.resolve(resolvedSearchParams)}
        props={{
          fetchData: ({ pagination: { startIdx, perPage } }) =>
            fetchCategory(category, { pagination: { startIdx, perPage } }),
          pageTitle: "",
          basePath: `/category/${category}`,
          errorMessage: "Ошибка: не удалось загрузить категорию продукта",
          contentType: "category",
        }}
      />
    </Suspense>
    </div>
    
  );
}
