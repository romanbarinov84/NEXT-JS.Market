
import GenericListPage from "@/app/(products)/GenericListPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchCategory from "../fetchCategory";


export async function geberateMetaData({params}:{ params: Promise<{ category: string }>}) {
  const {category} = await params;
  return{
   title: PATH_TRANSLATIONS[category] || category,
   description:`Описание категории продукта ${PATH_TRANSLATIONS[category] || category} `
  }
}

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams:Promise<{page?:string;perPage?:string}>
  params: Promise<{ category: string }>;
}) {
  const {category} = await params;

 
  return (

    <Suspense fallback={<Loader/>}>

      <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: ({ pagination: { startIdx, perPage } }) => fetchCategory(category, { pagination: { startIdx, perPage } }),
        pageTitle: PATH_TRANSLATIONS[category] || category,
        basePath: `/category/${category}`,
        errorMessage: "Ошибка: не удалось загрузить категорию продукта",
        contentType:"category",
      }}
    />
    </Suspense>
  )
   
}
