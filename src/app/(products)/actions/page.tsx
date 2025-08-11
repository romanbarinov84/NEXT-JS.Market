

import { Suspense } from "react";
import fetchProductsByCategory from "../fetchProducts";
import GenericListPage from "../GenericListPage";
import Loader from "@/components/Loader";

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
    <Suspense fallback={<Loader/>}>

      <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: ({ pagination: { startIdx, perPage } }) => fetchProductsByCategory("actions", { pagination: { startIdx, perPage } }),
        pageTitle: " Все акции",
        basePath: "/actions",
        errorMessage: "Ошибка: не удалось загрузить акции",
        
      }}
    />
    </Suspense>
    
  );
};

export default AllActions;
