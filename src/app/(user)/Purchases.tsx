import fetchPurchases from "./fetchPurchases";
import ProductSection from "../(products)/ProductsSection";
import { CONFIG } from "../../../config/config";

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
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить покупки</div>
    );
  }
};

export default Purchases;
