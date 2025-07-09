
import { Suspense } from "react";
import { fetchProductsByCategory } from "../fetchProducts";
import { GenericProductsListPage } from "../genericProductListPage/genericProductListPage";
import { Loader } from "@/components/Loader";


export default async function AllNew({searchParams}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>;
  }) {

   return (
     <Suspense fallback={<Loader/>}>
      <GenericProductsListPage
   searchParams={searchParams}
   props={{
    fetchData:() => fetchProductsByCategory("new"),
    pageTitle:"Усі новинки",
    basePath:"/new",
    errorMessage:"Помилка , невдалося завантажити новинки",
   }}
   />
     </Suspense>
   
  )

  
}