
import { CONFIG } from "../../../../config/config";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { ArticlesSection } from "@/app/(articles)/ArticlesSection";
import { GenericListPageProps } from "@/types/GenericProductListPageProps";
import { ProductCardProps } from "@/types/product";
import { Article } from "@/types/articles";
import ErrorComponent from "@/components/ErrorComponents";
import ProductsSection from "../ProductsSection";

export const GenericProductsListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page = params?.page;
  const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;

  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;

<<<<<<< HEAD
     const currentPage = Number(page) || 1 ; // текущая страница, по умолчанию 1
     const perPage = Number(itemsPerPage);  // количество товаров на странице
     const startIdx = (currentPage - 1) * perPage; // индекс начала текущей страницы
     
     
     try{
     const items = await props.fetchData(); // загрузка всех товаров
     const paginatedItems = items.slice(startIdx,startIdx + perPage);  // обрезка массива
     
     return(
        <>
        {!props.contentType ? (
             <ProductsSection 
        title={props.pageTitle} 
        products={paginatedItems as ProductCardProps[]}
        />
        ) : ( <ArticlesSection
        title={props.pageTitle} 
        articles={paginatedItems as Article[]}
        />)}
       
         
        {paginatedItems > 1 && (<PaginationWrapper 
         totalItems={paginatedItems}
         currentPage={currentPage}
         basePath={props.basePath}
         contentType={props.contentType}
         />)}
        </>
    )
     }catch(error){
            return (
            <ErrorComponent
             error={error instanceof Error ? error : new Error(String(error))}
             userMessage="Невдалося завантажити акції"/>
            )
        }
     
=======
  try {
    const { items, totalCount } = await props.fetchData({
      pagination: { startIdx, perPage },
    });
>>>>>>> 9ae2c7a8effdbebc4745c3f76eae9b6c93d161b1

    return (
      <>
        {!props.contentType || props.contentType === "category" ? (
          <ProductsSection
            title={props.pageTitle}
            products={items as ProductCardProps[]}
          />
        ) : (
          <ArticlesSection
            title={props.pageTitle}
            articles={items as Article[]}
          />
        )}

        {totalCount > perPage && (
          <PaginationWrapper
            totalItems={totalCount}
            currentPage={currentPage}
            basePath={props.basePath}
            contentType={props.contentType}
          />
        )}
      </>
    );
  } catch (error) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error(String(error))}
        userMessage={props.errorMessage}
      />
    );
  }
};
