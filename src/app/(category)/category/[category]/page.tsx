import { GenericProductsListPage } from "@/app/(products)/genericProductListPage/genericProductListPage";
import { Loader } from "@/components/Loader";
import { Suspense } from "react";
import { PATH_TRANSLATIONS } from "../../../../../utils/pathTranslations";
import fetchProductsCardByCategory from "../fetchProductsCardByCategory";



export async function generateMetaData({
  params,
}: {
  params: Promise<{category:string}>
}) {
  const {category} = await params;
  return {
    title:PATH_TRANSLATIONS[category] || category,
    description:`Категорії продуктів ${PATH_TRANSLATIONS[category] || category}`
  }
}



const categoryPage = async ({
  params,
  searchParams,
}: {
  searchParams:Promise<{page?:string;itemsPerPage?:string}>
  params: Promise<{category:string}>
}) => {

 const {category} = await params;

   
  return(
     <Suspense fallback={<Loader/>}>
    
          <GenericProductsListPage 
       searchParams={searchParams}
       props={{
        fetchData:({pagination:{startIdx, perPage}}) => 
          fetchProductsCardByCategory("category",{
            pagination:{startIdx,perPage},
          }),
        pageTitle:PATH_TRANSLATIONS[category],
        basePath:`/category/${category}`,
        errorMessage:"Помилка , невдалося завантажити акції",
        contentType:"category",
       }}
       />
         </Suspense>
  )
}



export default categoryPage;