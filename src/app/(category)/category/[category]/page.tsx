
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
     
    let category:string = "";

    try{
       category = (await params).category
    }catch(err){
        console.error("Ошибка получения категории",err)
    }
    return(
        <div>
        {category}
        </div>
    )
}