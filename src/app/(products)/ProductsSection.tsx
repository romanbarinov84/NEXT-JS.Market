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


  const gridClasses =
    contentType === "category"
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <div>
      <section>
       <div className="flex flex-col px-[max(12px,calc((100%-1208px)/2))]">
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
          {products && products.length > 0 ? (  <ul
            className={`grid ${gridClasses} gap-4 md:gap-6 xl:gap-10 justify-items-center`}
          >
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
