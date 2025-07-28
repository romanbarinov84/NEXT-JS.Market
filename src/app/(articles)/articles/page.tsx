import GenericListPage from "@/app/(products)/GenericListPage";
import fetchArticles from "../fetchArticles";

export const metadata = {
  title: "Пости на сайті Галя балувана Бровари",
  description: "Домашні напівфабрикати Галя балувана Бровари",
};

export default async function AllArticles({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemsPerPage?: string }>;
}) {
  return (
    <GenericListPage
      searchParams={searchParams}
      props={{
        fetchData: () => fetchArticles(),
        pageTitle: "Усі пости",
        basePath: "/articles",
        errorMessage: "Помилка невдалося завантажити пости",
        contentType:"articles",
      }}
    />
  );
}
