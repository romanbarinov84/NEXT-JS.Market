

import { ProductCardProps } from "@/types/product";
import { shuffleArray } from "../../../utils/shuffleArray";
import { ViewAllButton } from "@/components/viewAllButton/ViewAllButton";
import ProductCard from "@/components/ProductCard";




export default async function AllActions() {
   let products: ProductCardProps[] = [];
     let error = null;

  try{
         //фетч запрос к роуту articles
         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=actions`);
         products = await res.json();

      products = shuffleArray(products)

       products = shuffleArray(products)

   }catch(err){
    console.error("Ошибка в компоненте AllActions",err)
    error = "Ошибка получения actions in AllActions";
   }

   if(error){
    return <div className="text-red-500 text-lg">Ошибка: {error}</div>
   }

  return (
    <section>
      <div className="flex flex-col px-[max(12px,calc((100%-1208) mt-10 justify-center w-full xl:max-w-[1208px] mx-auto">
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">Усі акції</h2>
         <ViewAllButton btnText="На головну" href="/"/>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
          {products.map((item) => (
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
}
