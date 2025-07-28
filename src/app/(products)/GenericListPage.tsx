import { GenericListPageProps } from "@/types/GenericListPageProps";
import ProductSection from "./ProductsSection";
import { CONFIG } from "../../../config/config";
import PaginationWrapper from "@/components/PaginationWrapper";
import ArticlesSection from "../(articles)/ArticlesSection";
import { ProductCardProps } from "@/types/product";
import { ArticleCardProps } from "@/types/articlesListPageProps";

export default async function GenericListPage({
  searchParams,
  props,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
  props: GenericListPageProps;
}) {
  const params = await searchParams;
  const page = params?.page;
  const itemsPerPage = params?.itemsPerPage || CONFIG.ITEMS_PER_PAGE;
  const currentPage = Number(page) || 1;
  const perPage = Number(itemsPerPage);
  const startIdx = (currentPage - 1) * perPage;

  try {
    const items = await props.fetchData();
    const paginatedItems = items.slice(startIdx, startIdx + perPage);
    return (
      <div>
        {!props.contentType ? (
          <ProductSection
          title={props.pageTitle}
          viewAllButton={{ text: "На головну", href: "/" }}
          products={paginatedItems as ProductCardProps[]}
        />
        ) : (
            <ArticlesSection
          title={props.pageTitle}
          viewAllButton={{ text: "На головну", href: "/" }}
          articles={paginatedItems as ArticleCardProps[]}
        />
        )}
        
      

        {items.length > perPage && (
          <PaginationWrapper
            totalItems={items.length}
            currentPage={currentPage}
            basePath={props.basePath}
            contentType={props.contentType}
          />
        )}
      </div>
    );
  } catch {
    return <div className="text-red-500">{props.errorMessage}</div>;
  }
}
