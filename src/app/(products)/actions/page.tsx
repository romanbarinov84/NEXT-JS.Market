import fetchProductsByCategory from "../fetchProducts";
import GenericListPage from "../GenericListPage";

export const metadata = {
  title: "Акційні товари Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

export default async function AllActions({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: () => fetchProductsByCategory("actions"),
        pageTitle: "Усі акції",
        basePath: "/actions",
        errorMessage: "Помилка невдалося завантажити акції",
      }}
    />
  );
}
