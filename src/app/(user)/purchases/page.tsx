
import ProductSection from "@/app/(products)/ProductsSection";
import fetchPurchases from "../fetchPurchases";


export default async function AllNew() {
   try {
    const purchases = await fetchPurchases();

    return (
      <ProductSection
        title="Усі покупки"
        viewAllButton={{ text: "На головну", href: "/" }}
        products={purchases}
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить акции</div>
    );
  }
};

