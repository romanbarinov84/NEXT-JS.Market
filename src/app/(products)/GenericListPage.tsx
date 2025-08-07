import PaginationWrapper from "@/components/PaginationWrapper";
import { ArticleCardProps } from "@/types/articles";
import { ProductCardProps } from "@/types/product";
import ProductSection from "./ProductsSection";
import { GenericListPageProps } from "@/types/GenericListPageProps";
import ArticlesSection from "../(articles)/ArticlesSection";
import { CONFIG } from "../../../config/config";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";

const GenericListPage = async ({
  searchParams,
  props,
}: {
  searchParams: Promise <{ page?: string; itemsPerPage?: string }>; // Обычный объект, не Promise
  props: GenericListPageProps;
}) => {
  const params = await searchParams;
  const page =  params?.page;
  const itemsPerPage =  params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;

  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;

  try {
    const {items, totalCount} = await props.fetchData({ pagination: { startIdx, perPage } });

    const totalPages = Math.ceil(totalCount / perPage)

    return (
      <>
        {!props.contentType ? (
          <ProductSection
            title={props.pageTitle}
            products={items as ProductCardProps[]}
          />
        ) : (
          <ArticlesSection
            title={props.pageTitle}
            articles={items as ArticleCardProps[]}
          />
        )}

        {totalPages > 1 && (
          <PaginationWrapper
            totalItems={totalCount}
            currentPage={currentPage}
            basePath={props.basePath}
            contentType={props.contentType}
          />
        )}
      </>
    );
  } catch(error) {
      return (
        <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
         userMessage="Не удалось загрузить generic"/>
        
      );
    }
};

export default GenericListPage;
