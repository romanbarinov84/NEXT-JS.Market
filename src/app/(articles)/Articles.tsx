
import ErrorComponent from "@/components/ErrorComponents";
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
    } catch(error) {
     return (<ErrorComponent error={error instanceof Error ? error : new Error(String(error))} userMessage="Не вдалося загрузити пости"/>)
  }
 
 

}





export default Articles;
