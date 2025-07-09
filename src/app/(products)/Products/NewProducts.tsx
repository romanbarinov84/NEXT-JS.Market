import ErrorComponent from "@/components/ErrorComponents";
import { CONFIG } from "../../../../config/config";
import { fetchProductsByCategory } from "../fetchProducts";
import { ProductsSection } from "../ProductsSection";



export default async function NewProducts() {
  try {
    const products = await fetchProductsByCategory("actions",{randomLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    return (<ProductsSection 
     title="Новинки"
     viewAllButton={{text:"Усі новинки", href:"new"}}
     products={products}
     compact
     />)
  } catch(error){
            return (
            <ErrorComponent
             error={error instanceof Error ? error : new Error(String(error))}
             userMessage="Невдалося завантажити новинки"/>
            )
        }

  
}
