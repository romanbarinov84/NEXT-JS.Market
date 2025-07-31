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
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить пости</div>
    );
  }
}
