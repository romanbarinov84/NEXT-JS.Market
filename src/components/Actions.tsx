import ViewAllButton from "./ViewAllButton";
import { ProductCard } from "./ProductCard/ProductCard";
import { ProductCardProps } from "@/types/product";
import { getProductsByCategory } from "@/app/api/products/route";
import { shuffleArray } from "../../utils/shaffleArray";


export default async function Actions(){
    let products:ProductCardProps[] = [];
    let error = null;

    try{
   products = (await getProductsByCategory("actions"))as unknown as ProductCardProps[];
   products = shuffleArray(products)
    }
    
    catch(err){
       error = err instanceof Error ? err.message : "неизвестная ошибка";
       console.error("Ошибка в компоненте Actions", err)
    }

    if(error){
        return <div className="text-red-500 py-8"> error : {error}</div>
    }
   
    return(
        <section>
          <div className="flex flex-col justify-center xl:max-w-[1208px] ">
            <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg/10  text-[#535353]">Акції</h2>
                <ViewAllButton btnText="Усі акції"/>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
                {products/*.slice(0,8)*/.map((item,index) => (
                    <li key={item.id} 
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