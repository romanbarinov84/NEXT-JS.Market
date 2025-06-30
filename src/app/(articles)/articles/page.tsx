
import { GenericProductsListPage } from "@/app/(products)/genericProductListPage/genericProductListPage";
import { fetchArticles } from "../fetchArticles";

export default async function AllActions({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
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
  );
}
