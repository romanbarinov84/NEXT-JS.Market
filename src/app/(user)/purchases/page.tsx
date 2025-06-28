import { fetchProductsByCategory } from "@/app/(products)/fetchProducts";
import { ProductsSection } from "@/app/(products)/ProductsSection";



export default async function Allnew() {
  try {
    const products = await fetchProductsByCategory("purchases");
    return (<ProductsSection 
     title="Усі мої покупки"
     viewAllButton={{text:"На головну", href:"/"}}
     products={products}
     />)
  } catch {
    return (
      <div className="text-red-500 py-8">Ошибка:не удалось загрузить акции</div>
    );
  }

  
}
