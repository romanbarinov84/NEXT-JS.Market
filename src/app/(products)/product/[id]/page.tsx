
export default async function ProductPage({params}:{params:Promise<{id:string}>}){
     
    let productId:string = "";

    try{
       productId = (await params).id
    }catch(err){
        console.error("Ошибка получения категории",err)
    }
    return(
        <div>
        {productId}
        </div>
    )
}