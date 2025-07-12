
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

  try {
    const { items, totalCount } = await props.fetchData({
      pagination: { startIdx, perPage },
    });

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
