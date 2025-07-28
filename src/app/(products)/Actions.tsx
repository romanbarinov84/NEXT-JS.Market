import { shuffleArray } from "../../../utils/shuffleArray";
import fetchProductsByCategory from "./fetchProducts";
import ProductSection from "./ProductsSection";


export default async function Actions() {
   try {
    let products = await fetchProductsByCategory("actions");
     products = shuffleArray(products)
    return (
      <ProductSection
        title="Акції"
        viewAllButton={{ text: "Усі акції", href: "actions" }}
        products={products}
        compact
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить акции</div>
    );
  }
};

