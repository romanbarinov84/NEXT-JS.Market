import { GenericProductListPageProps } from "@/types/GenericProductListPageProps"
import ProductSection from "./ProductsSection"
import { CONFIG } from "../../../config/config"



export default async function GenericProductListPage({searchParams,props}:{
    searchParams:Promise<{page?:string,itemsPerPage?:string}>
      props:GenericProductListPageProps
    }){

        const params = await searchParams;
        const page = params?.page;
        const itemsPerPage  = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
        const currentPage = Number(page) || 1;
        const perPage = Number(itemsPerPage);
        const startIdx = (currentPage - 1) * perPage;
        
      

        try{
        const products = await props.fetchData();
        const paginatedProducts = products.slice(startIdx, startIdx + perPage);
          return(
        <div>
           <ProductSection title={props.pageTitle} viewAllButton={{text:"На головну", href:"/"}}
            products={paginatedProducts}
            />
        </div>
    )
        }catch{
           return <div className="text-red-500">{props.errorMessage}</div>
        }

  
}