import ErrorComponent from "@/components/errorComponent/ErrorComponent";

export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
     
    let category:string = "";

    try{
       category = (await params).category
    }catch(error) {
        return (
          <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
           userMessage="Ошибка получения категорий"/>
          
        );
      }
    return(
        <div>
        {category}
        </div>
    )
}