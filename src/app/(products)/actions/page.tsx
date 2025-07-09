

import { Suspense } from "react";
import { fetchProductsByCategory } from "../fetchProducts";
import { GenericProductsListPage } from "../genericProductListPage/genericProductListPage";
import { Loader } from "@/components/Loader";

export default async function AllActions({searchParams}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>;
  }) {

   return (
     <Suspense fallback={<Loader/>}>

      <GenericProductsListPage 
   searchParams={searchParams}
   props={{
    fetchData:() => fetchProductsByCategory("actions"),
    pageTitle:"Усі акції",
    basePath:"/actions",
    errorMessage:"Помилка , невдалося завантажити акції",
   }}
   />
     </Suspense>
   )

  
}
