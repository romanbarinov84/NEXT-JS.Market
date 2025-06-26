
import ViewAllButton from "@/components/ViewAllButton";

import { ProductCardProps } from "@/types/product";
import { ProductCard } from "./ProductCard/ProductCard";



export default async function AllActions(){
    let products:ProductCardProps[] = [];
    let error = null;

    try {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=actions`
);
    
    products = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "неизвестная ошибка";
    console.error("Ошибка в компоненте Articles", err);
  }

  if (error) {
    return <div className="text-red-500 py-8"> error : {error}</div>;
  }

   
    return(
        <section>
          <div className=" px-[max(12px,calc((100%-1208px)/2))] flex flex-col justify-center xl:max-w-[1208px] mt-20 ml-8 mb-20  ">
            <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg/10  text-[#535353]">Акції</h2>
                <ViewAllButton btnText="Усі акції" href="/actions"/>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
                {products/*.slice(0,8)*/.map((item) => (
                    <li key={item._id}  >
                    <ProductCard {...item}/>
                        </li>  
                                ))}
                
            </ul>
          </div>
        </section>
    )
}    
                                       
    