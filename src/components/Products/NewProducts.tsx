import { ProductCardProps } from "@/types/product";
import { ProductCard } from "../ProductCard/ProductCard";




export async function NewProducts(){
    let products:ProductCardProps[] = [];
    let error = null;

    try {
    const res = await fetch(
      `${process.env.DELIVERY_SHOP_DB_URL!}/api/products?category=new`);
    
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
          <div className="flex flex-col justify-center xl:max-w-[1208px] ">
            <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                <h2 className="text-2xl xl:text-4xl text-left font-bold text-[#535353] text-shadow-lg/10 ">Новинки</h2>
                
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
                {products/*.slice(0,8)*/.map((item,index) => (
                    <li key={item._id} 
                    className= {`${index >= 4 ? "hidden" : ""}
                     ${index >= 3 ? "md:hidden xl:block" : ""}
                     ${index >= 4 ? "xl:block" : ""}
                     `} 

                    >
                        <ProductCard {...item}/>
                        </li>                 
                ))}
                
            </ul>
          </div>
        </section>
    )
}