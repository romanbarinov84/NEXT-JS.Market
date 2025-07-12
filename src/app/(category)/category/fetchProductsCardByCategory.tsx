

const fetchProductsCardByCategory = async(category:string,
  options:{
    pagination:{startIdx:number;perPage:number}; }
 
) => {

     try{
        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
        url.searchParams.append("category",category);
        url.searchParams.append("startIdx",options.pagination.startIdx.toString());
        url.searchParams.append("perPage",options.pagination.perPage.toString());

        const res = await fetch(url.toString(),{next:{revalidate:3600}});

        if(!res.ok){
            throw  Error ("Помилка сервера при отриманні категорії товарів");

           
        }  
        
        const data = await res.json()
       console.log("📦 fetchProductsCardByCategory result:", data);

        return {
        items:data.products || data,
        totalCount:data.totalCount || data.length
    };
     }catch(error){
        throw  error
     }

    
}

export default fetchProductsCardByCategory;