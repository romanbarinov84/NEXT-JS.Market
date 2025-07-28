import ArticlesSection from "./ArticlesSection";
import fetchArticles from "./fetchArticles";

export default async function Articles() {
  try {
    const articles = await fetchArticles();
    return (
      <ArticlesSection
        title="Пости"
        viewAllButton={{ text: "Усі пости", href: "/articles" }}
        articles={articles}
        compact
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить пости</div>
    );
  }
}
