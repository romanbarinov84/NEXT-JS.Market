import { CONFIG } from "../../../config/config";
import fetchProductsByCategory from "./fetchProducts";
import ProductSection from "./ProductsSection";

export default async function Actions() {
  try {
    const {items} = await fetchProductsByCategory("actions", {
      randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });
   
    return (
      <ProductSection
        title="Акції"
        viewAllButton={{ text: "Усі акції", href: "/actions" }}
        products={items}
        
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить акции</div>
    );
  }
}
