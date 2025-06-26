
import { fetchProductsByCategory } from "../fetchProducts";
import { ProductsSection } from "../ProductsSection";

export default async function AllActions() {
  try {
    const products = await fetchProductsByCategory("actions");
    return (<ProductsSection 
     title="Усі акції"
     viewAllButton={{text:"На головну", href:"/"}}
     products={products}
     />)
  } catch {
    return (
      <div className="text-red-500 py-8">Ошибка:не удалось загрузить акции</div>
    );
  }

  
}
