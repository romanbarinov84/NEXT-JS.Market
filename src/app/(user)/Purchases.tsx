


import { fetchProductsByCategory } from "../(products)/fetchProducts";
import { ProductsSection } from "../(products)/ProductsSection";
import { CONFIG } from "../../../config/config";


export async function Purchases() {
 

  try {
     const products = await fetchProductsByCategory("actions",{randomLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    
    return (<ProductsSection
      title=" Mої покупки"
     viewAllButton={{text:"Усі покупки", href:"purchases"}}
     products={products}
     compact
       />)

       
    
  } catch  {
   return (
      <div className="text-red-500 py-8">Ошибка:не удалось загрузить ваши покупки</div>
      
    );
  }


  
}
