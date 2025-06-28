

import { ProductsSection } from "../(products)/ProductsSection";
import { fetchPurchases } from "./fetchPurchases";

export async function Purchases() {
 

  try {
    const purchases = await fetchPurchases();
    return (<ProductsSection
      title=" Mої покупки"
     viewAllButton={{text:"Усі покупки", href:"purchases"}}
     products={purchases}
     compact
       />)
    
  } catch  {
   return (
      <div className="text-red-500 py-8">Ошибка:не удалось загрузить ваши покупки</div>
    );
  }


  
}
