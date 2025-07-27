import ArticlesSection from "../ArticlesSection";
import fetchArticles from "../fetchArticles";


export const metadata = {
  title:"Пости на сайті Галя балувана Бровари",
  description:"Домашні напівфабрикати Галя балувана Бровари",
}


export default async function AllArticles() {
  try {
    const articles = await fetchArticles();
    return (
      <ArticlesSection
        title="Пости"
        viewAllButton={{ text: "На головну", href: "/" }}
        articles={articles}
      
      />
    );
  } catch {
    return (
      <div className="text-red-500">Ошибка: не удалось загрузить пости</div>
    );
  }
}
