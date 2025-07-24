import { ProductCardProps } from "@/types/product";
import ProductCard from "../ProductCard";
import { ViewAllButton } from "../viewAllButton/ViewAllButton";

export default async function NewProducts(){

    let products: ProductCardProps[] = [];
        let error = null;
   
     try{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/products?category=new`);
            products = await res.json();
      }catch(err){
       console.error("Ошибка в компоненте NewProducts",err)
       error = "Ошибка получения новых продуктов";
      }
   
      if(error){
       return <div className="text-red-500 text-lg">Ошибка: {error}</div>
      }


    return(
        <div>
              <section>
                  <div className="flex flex-col justify-center w-full xl:max-w-[1208px] mx-auto">
                    <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                      <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">Новинки</h2>
                      <ViewAllButton btnText="Усі новинки" href="new"/>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                      {products.slice(0,4).map((item, index) => (
                        <li
                          key={item._id}
                          className={`${index >= 4 ? "hidden" : ""}
                                     ${index >= 3 ? "md:hidden xl:block" : ""}
                                     ${index >= 4 ? "xl:hidden" : ""}`}
                        >
                          <ProductCard {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
        </div>
    )
}