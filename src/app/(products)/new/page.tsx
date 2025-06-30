
import { fetchProductsByCategory } from "../fetchProducts";
import { GenericProductsListPage } from "../genericProductListPage/genericProductListPage";


export default async function AllNew({searchParams}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>;
  }) {

   return (<GenericProductsListPage
   searchParams={searchParams}
   props={{
    fetchData:() => fetchProductsByCategory("new"),
    pageTitle:"Усі новинки",
    basePath:"/new",
    errorMessage:"Помилка , невдалося завантажити новинки",
   }}
   />)

  
}