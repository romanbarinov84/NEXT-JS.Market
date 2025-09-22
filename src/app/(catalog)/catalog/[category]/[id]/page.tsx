import ErrorComponent from "@/components/errorComponent/ErrorComponent";

export default async function ProductPage({params}:{params:Promise<{id:string}>}){
     
    let productId:string = "";

    try{
       productId = (await params).id
    }catch(error) {
        return (
          <ErrorComponent error={error instanceof Error ? error : new Error(String(error))}
           userMessage="Не удалось загрузить данные о продукте"/>
          
        );
      }
    return(
        <div>
        {productId}
        </div>
    )
}