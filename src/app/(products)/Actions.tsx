

import { ProductsSection } from "../(products)/ProductsSection";
import { CONFIG } from "../../../config/config";
import { fetchProductsByCategory } from "./fetchProducts";

export default async function Actions() {
  try {
    const products = await fetchProductsByCategory("actions",{randomLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    
    return (<ProductsSection 
     title="Усі акції"
     viewAllButton={{text:"Усі акції", href:"actions"}}
     products={products}
     compact
     />)
  } catch {
    return (
      <div className="text-red-500 py-8 ">Ошибка:не удалось загрузить акции</div>
    );
  }

  
}
