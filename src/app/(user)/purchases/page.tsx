import GenericListPage from "@/app/(products)/GenericListPage";
import fetchPurchases from "../fetchPurchases";

export default async function AllNew({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: () => fetchPurchases(),
        pageTitle: "Усі покупки",
        basePath: "/purchases",
        errorMessage: "Помилка невдалося завантажити покупки",
      }}
    />
  );
}
