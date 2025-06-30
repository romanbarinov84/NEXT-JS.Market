
import { GenericProductsListPage } from "@/app/(products)/genericProductListPage/genericProductListPage";
import { fetchPurchases } from "../fetchPurchases";




export default async function AllActions({searchParams}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>;
  }) {

   return (<GenericProductsListPage
   searchParams={searchParams}
   props={{
    fetchData:() => fetchPurchases(),
    pageTitle:"Усі покупки",
    basePath:"/purchases",
    errorMessage:"Помилка , невдалося завантажити покупки",
   }}
   />)

  
}