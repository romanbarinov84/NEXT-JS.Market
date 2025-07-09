

import { ProductsSection } from "../ProductsSection";
import {CONFIG} from "../../../../config/config";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { ArticlesSection } from "@/app/(articles)/ArticlesSection";
import { GenericListPageProps } from "@/types/GenericProductListPageProps";
import { ProductCardProps } from "@/types/product";
import { Article } from "@/types/articles";
import ErrorComponent from "@/components/ErrorComponents";






export const GenericProductsListPage = async({searchParams,props}: {searchParams:Promise<{page? : string; itemsPerPage?:string}>
    props:GenericListPageProps;
}) => {

     const params = await searchParams;
     const page = params?.page;
     const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
     

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
       
         
        {items.length > perPage && (<PaginationWrapper 
         totalItems={items.length}
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
     

     
    
}