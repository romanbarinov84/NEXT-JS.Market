
import { GenericProductsListPage } from "@/app/(products)/genericProductListPage/genericProductListPage";
import { fetchArticles } from "../fetchArticles";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export default async function AllActions({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
    <Suspense fallback={<Loader/>}>
      <GenericProductsListPage
      searchParams={searchParams}
      props={{
        fetchData: () => fetchArticles(),
        pageTitle: "Усі пости",
        basePath: "/articles",
        errorMessage: "Помилка , невдалося завантажити пости",
        contentType: "articles"
      }}
    />
    </Suspense>
    
  );
}
