import { ViewAllButton } from "@/components/viewAllButton/ViewAllButton";
import ProductCard from "@/components/ProductCard";
import { ProductsSectionProps } from "@/types/productsSection";


export default function ProductSection({title,viewAllButton,products,}:ProductsSectionProps){
   
    return(
        <div>
            <section>
      <div className="flex flex-col  px-[max(12px,calc((100%-1208px)/2))]  mt-20 justify-center w-full xl:max-w-[1208px] mx-auto mt-5">
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">{title}</h2>
          {viewAllButton && (<ViewAllButton btnText={viewAllButton.text} href={viewAllButton.href}/>)}
         
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
        </div>
    )
}