import { ProductCard } from "@/components/ProductCard/ProductCard"
import ViewAllButton from "@/components/ViewAllButton"
import { ProductsSectionProps } from "@/types/productsSection"

export const ProductsSection = ({title,viewAllButton,products,compact = false}: ProductsSectionProps) => {
    return (
         <section>
              <div 
              className={`flex flex-col  ${ !compact ? "px-[max(12px,calc((100%-1208px)/2))] mt-20" : "" }`}
                
                    >
                <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
                  <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg/10  text-[#535353]">
                    {title}
                  </h2>
                  {viewAllButton && ( <ViewAllButton btnText={viewAllButton.text} href={viewAllButton.href} />)}
                 
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
                  {products /*.slice(0,8)*/
                    .map((item,index) => (
                      <li key={item._id}
                      className={compact ? `${index >= 3 ? "hidden" : ""}
                      ${index >=3 ? "md:hidden xl:block" : ""}
                      ${index >=4 ? "xl:hidden" : ""}` : ""  }>
                     
                      
                        <ProductCard {...item} />
                      </li>
                    ))}
                </ul>
              </div>
            </section>
    )
}