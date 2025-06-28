import { Article } from "@/types/articles";




export const fetchArticles = async() => {

 try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
      {next: {revalidate:3600}}
    );
    if(!res.ok) throw new Error(`Ошибка получения статей `)

    const articles:Article[] = await res.json();
    return articles;

  } catch (err) {
    console.error("Ошибка в компоненте Articles", err);
    throw err;
  }

}