
import { ArticlesSection } from "./ArticlesSection";
import { fetchArticles } from "./fetchArticles";





const Articles = async () => {
  const articles = await fetchArticles();

    try {
       return (<ArticlesSection 
     title="Усі пости"
     viewAllButton={{text:"Усі пости", href:"articles"}}
     articles={articles}
     compact
     />
    );
    } catch {
     return <div className="text-red-500 py-8"> error : не вдалося загрузити пости</div>;
  }
 
 

}





export default Articles;
