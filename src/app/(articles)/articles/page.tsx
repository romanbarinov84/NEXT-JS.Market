import GenericListPage from "@/app/(products)/GenericListPage";
import fetchArticles from "../fetchArticles";

export const metadata = {
  title: "Пости на сайті Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

const AllArticles = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) => {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{fetchData: ({ pagination: { startIdx, perPage } }) => fetchArticles({ pagination: { startIdx, perPage } }),
        pageTitle: " Все статьи",
        basePath: "/articles",
        errorMessage: "Ошибка: не удалось загрузить статьи",
        contentType: "articles",
      }}
    />
  );
};

export default AllArticles;