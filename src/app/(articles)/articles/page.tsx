


import { ArticlesSection } from "../ArticlesSection";

import { fetchArticles } from "../fetchArticles";


const AllArticles = async () => {
 

  try {
     const articles = await fetchArticles();
    return (
     
   <ArticlesSection 
    title="Усі пости"
     viewAllButton={{text:"На головну", href:"/"}}
     articles={articles}
     compact
   />
  );
    
  } catch  {
    return <div className="text-red-500 py-8"> error : невдалося загрузити пости</div>;
  }

 
  
};

export default AllArticles;
