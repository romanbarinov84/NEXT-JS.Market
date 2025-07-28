import fetchProductsByCategory from "../fetchProducts";
import ProductSection from "../ProductsSection";


export const metadata = {
  title:"Акційні товари Галя балувана Бровари",
  description:"Домашні напівфабрикати Галя балувана Бровари",
}

export default async function AllActions({searchParams,}:{searchParams:Promise<{page?:string,itemsPerPage?:string}>}) {
   try {
    const products = await fetchProductsByCategory("actions");

    return (
      <ProductSection
        title="Усі акції"
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

