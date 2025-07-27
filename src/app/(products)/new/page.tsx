import fetchProductsByCategory from "../fetchProducts";
import ProductSection from "../ProductsSection";

export const metadata = {
  title:"Нові товари Галя балувана Бровари",
  description:"Домашні напівфабрикати Галя балувана Бровари",
}

export default async function AllNew() {
   try {
    const products = await fetchProductsByCategory("new");

    return (
      <ProductSection
        title="Усі новинки"
        viewAllButton={{ text: "На головну", href: "/" }}
        products={products}
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить акции</div>
    );
  }
};

