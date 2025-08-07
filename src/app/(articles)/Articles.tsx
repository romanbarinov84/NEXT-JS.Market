import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import { CONFIG } from "../../../config/config";
import ArticlesSection from "./ArticlesSection";
import fetchArticles from "./fetchArticles";

export default async function Articles() {
  try {
    const {items} = await fetchArticles({articlesLimit:CONFIG.ITEMS_PER_PAGE_MAIN_ARTICLES});
    return (
      <ArticlesSection
        title="Пости"
        viewAllButton={{ text: "Усі пости", href: "/articles" }}
        articles={items}
       
      />
    );
  } catch(error) {
    return (
      <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
       userMessage="Не удалось загрузить статьи"/>
      
    );
  }
}
