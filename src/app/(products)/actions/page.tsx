import fetchProductsByCategory from "../fetchProducts";
import GenericProductListPage from "../genericProductListPage";



export const metadata = {
  title:"Акційні товари Галя балувана Бровари",
  description:"Домашні напівфабрикати Галя балувана Бровари",
}

export default async function AllActions({searchParams,}:{searchParams:Promise<{page?:string,itemsPerPage?:string}>}) {

  return(
    <GenericProductListPage 
    searchParams={searchParams}
    props={{
      fetchData:() => fetchProductsByCategory("actions"),
      pageTitle:"Усі акції",
      basePath:"/actions",
      errorMessage:"Помилка невдалося завантажити акції",
    }}
    />
  )
 
};

