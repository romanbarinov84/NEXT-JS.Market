
import ProductCard from "@/components/ProductCard";
import { ViewAllButton } from "@/components/viewAllButton/ViewAllButton";
import { ProductCardProps } from "@/types/product";


const AllUserPurchases = async () => {
  let purchases: ProductCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/users/purchases`
    );
    purchases = await res.json();
  } catch (err) {
    error = "Ошибка получения купленных продуктов AllUserPurchases";
    console.error("Ошибка в компоненте AllUserPurchases:", err);
  }

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
    <section>
      <div className="flex flex-col px-[max(12px,calc((100%-1208) mt-10 justify-center w-full xl:max-w-[1208px] mx-auto">
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between text-[#414141]">
          <h2 className="text-2xl xl:text-4xl text-left font-bold">
           Усі Покупки
          </h2>
          <ViewAllButton btnText="На головну" href="/" />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-10 justify-items-center">
          {purchases.map((item) => (
            <li
              key={item._id}
              
            >
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AllUserPurchases;
