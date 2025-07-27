import fetchProductsByCategory from "../fetchProducts";
import ProductSection from "../ProductsSection";



export default async function Actions() {
   try {
    const products = await fetchProductsByCategory("new");

    return (
      <ProductSection
        title="Новинки"
        viewAllButton={{ text: "Усі новинки", href: "new" }}
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

