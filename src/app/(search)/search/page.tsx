import { ProductsSection } from "@/app/(products)/ProductsSection";
import { Loader } from "@/components/Loader";
import { ProductCardProps } from "@/types/product";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


export  const SearchResult = () => {
     const searchParams = useSearchParams();
     const query = searchParams.get("q") || "";
     const [products,setProducts] = useState<ProductCardProps[]>([])
     const [isLoading,setIsLoading] = useState(true);//поиск сразу при заходе на странницу

    useEffect(() => {
        const fetchSearchResults = async () => {
            try{
              setIsLoading(true);
              const response = await fetch(`/api/search-full?query=${encodeURIComponent(query)}`);
              const data = await response.json()
              setProducts(data)

            }catch(error){
                console.error("Помилка при встановленні результатів:", error)
            }
            finally{
                setIsLoading(false);
            }
        }
        if(query){
            fetchSearchResults();
        }
    },[query]);

    if(isLoading) return <Loader/>

    return (
        <div className="px-[max(12px,calc((100%-1208px)/2))] text-[#232343]">
            <h1 className=" text-2xl xl:text-4xl text-left font-bold text-shadow-lg/10">Результат пошуку</h1>
            <p className="text-sm md:text-base xl:text-2xl">По запиту <span className="text-[#fe3366]">{query}</span></p>
            {products.length === 0 ? (<p>По вашому запиту нічого не знайдено</p>) : <ProductsSection title={""} products={products}/>}
        </div>
        
    )
}