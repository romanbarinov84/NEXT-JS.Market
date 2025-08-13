import { ViewAllButton } from "@/components/viewAllButton/ViewAllButton";
import ProductCard from "@/components/ProductCard";
import { ProductsSectionProps } from "@/types/productsSection";

export default function ProductSection({
  title,
  viewAllButton,
  products,
  applyIndexStyles = true,
  contentType,
}: ProductsSectionProps & {
  applyIndexStyles?: boolean;
  contentType?: string;
}) {


   const gridClasses = contentType === "category" ? "grid grid-cols-3 gap-4 md:grid-cols-3" : "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3xl:gap-4 "

  return (
    <div>
      <section>
        <div className="flex flex-col  px-[max(12px,calc((100%-1208px)/2))]  mt-5 justify-center w-full xl:max-w-[1208px] mx-auto mt-5">
          <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
            <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">
              {title}
            </h2>
            {viewAllButton && (
              <ViewAllButton
                btnText={viewAllButton.text}
                href={viewAllButton.href}
              />
            )}
          </div>
          {products && products.length > 0 ? (<ul className={`${gridClasses} md:gap-6 xl:gap-8`}>
            {products.slice(0,6).map((item, index) => (
              <li
                key={item._id}
                className={
                  applyIndexStyles
                    ? index >= 4
                      ? "md:hidden xl:block"
                      : ""
                    : ""
                }
              >
                <ProductCard {...item} />
              </li>
            ))}
          </ul>) : (<div className="text-lg text-red-400">Продукти не знайденні</div>)}
          
        </div>
      </section>
    </div>
  );
}
