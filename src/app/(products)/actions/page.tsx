

import fetchProductsByCategory from "../fetchProducts";
import GenericListPage from "../GenericListPage";

export const metadata = {
  title: "Акційні товари Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

const AllActions = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: ({ pagination: { startIdx, perPage } }) => fetchProductsByCategory("actions", { pagination: { startIdx, perPage } }),
        pageTitle: " Все акции",
        basePath: "/actions",
        errorMessage: "Ошибка: не удалось загрузить акции",
      }}
    />
  );
};

export default AllActions;
