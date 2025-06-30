

import { fetchProductsByCategory } from "../fetchProducts";
import { GenericProductsListPage } from "../genericProductListPage/genericProductListPage";

export default async function AllActions({searchParams}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>;
  }) {

   return (<GenericProductsListPage 
   searchParams={searchParams}
   props={{
    fetchData:() => fetchProductsByCategory("actions"),
    pageTitle:"Усі акції",
    basePath:"/actions",
    errorMessage:"Помилка , невдалося завантажити акції",
   }}
   />)

  
}
