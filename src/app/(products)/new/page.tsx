import fetchProductsByCategory from "../fetchProducts";
import GenericListPage from "../GenericListPage";

export const metadata = {
  title: "Нові товари Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

export default async function AllNew({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: () => fetchProductsByCategory("new"),
        pageTitle: "Усі новинки",
        basePath: "/new",
        errorMessage: "Помилка невдалося завантажити новинки",
      }}
    />
  );
}
