'use client';

import GenericListPage from "@/app/(products)/GenericListPage";
import fetchPurchases from "../fetchPurchases";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const AllPurchases = ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <GenericListPage
        searchParams={searchParams}
        props={{
          fetchData: ({ pagination: { startIdx, perPage } }) =>
            fetchPurchases({ pagination: { startIdx, perPage } }),
          basePath: "/purchases",
          contentType: "purchases", // 👈 если у тебя в GenericListPage ожидается
          pageTitle: "Все покупки",  // 👈 если прописан в типах
          errorMessage: "Ошибка: не удалось загрузить покупки",
        }}
      />
    </Suspense>
  );
};

export default AllPurchases;
