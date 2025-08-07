import fetchPurchases from "./fetchPurchases";
import ProductSection from "../(products)/ProductsSection";
import { CONFIG } from "../../../config/config";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";

const Purchases = async () => {
  try {
    const {items} = await fetchPurchases({userPurchasesLimit:CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS});
    return (
      <ProductSection
        title="Покупки"
        viewAllButton={{ text: "Усі покупки", href: "purchases" }}
        products={items}
    
      />
    );
  } catch(error) {
      return (
        <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
         userMessage="Не удалось загрузить ваши покупки"/>
        
      );
    }
};

export default Purchases;
