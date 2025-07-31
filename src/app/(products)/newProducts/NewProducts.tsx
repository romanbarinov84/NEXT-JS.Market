import { CONFIG } from "../../../../config/config";
import fetchProductsByCategory from "../fetchProducts";
import ProductSection from "../ProductsSection";

export default async function Actions() {
  try {
     const {items} = await fetchProductsByCategory("new", {
      randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
    });

    return (
      <ProductSection
        title="Новинки"
        viewAllButton={{ text: "Усі новинки", href: "new" }}
        products={items}
        
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить новинки</div>
    );
  }
}
