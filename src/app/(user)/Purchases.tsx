import fetchPurchases from "./fetchPurchases";
import ProductSection from "../(products)/ProductsSection";

const Purchases = async () => {
  try {
    const purchases = await fetchPurchases();
    return (
      <ProductSection
        title="Покупки"
        viewAllButton={{ text: "Усі покупки", href: "purchases" }}
        products={purchases}
        compact
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить покупки</div>
    );
  }
};

export default Purchases;
