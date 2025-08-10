
import GenericListPage from "@/app/(products)/GenericListPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchCategory from "../fetchCategory";


export async function generateMetaData({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const category = await params;
  return {
    title: PATH_TRANSLATIONS[category.category] || category.category,
    description:`Описание категории товаров : ${PATH_TRANSLATIONS[category.category] || category.category}`
  };
}
export default async function CategoryPage({searchParams,params}:{
  searchParams:Promise<{page?:string;itemsPerPage?:string;}>
  params:Promise<{category:string}>}){
     
    const {category} = await params;

    return (
    <Suspense fallback={<Loader/>}>

      <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: ({ pagination: { startIdx, perPage } }) => fetchCategory("category", { pagination: { startIdx, perPage } }),
        pageTitle: PATH_TRANSLATIONS[category] || category,
        basePath: `/category/${category}`,
        contentType:"category",
        errorMessage: 'Категория не найденна',
      }}
    />
    </Suspense>
    
  );
}