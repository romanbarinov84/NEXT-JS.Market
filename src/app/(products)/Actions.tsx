import ErrorComponent from "@/components/errorComponent/ErrorComponent";
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
  }catch(error) {
      return (
        <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
         userMessage="Не удалось загрузить акции"/>
        
      );
    }
}
