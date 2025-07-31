
import fetchProductsByCategory from "../fetchProducts";
import GenericListPage from "../GenericListPage";

export const metadata = {
  title: "Акційні товари Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

export default function AllActions({
  searchParams,
}: {
  searchParams: { page?: string; itemsPerPage?: string }
}){
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: ({ pagination: { startIdx, perPage } }) => fetchProductsByCategory("actions", { pagination: { startIdx, perPage } }),
        pageTitle: "Усі акції",
        basePath: "/actions",
        errorMessage: "Помилка невдалося завантажити акції",
      }}
    />
  );
}
