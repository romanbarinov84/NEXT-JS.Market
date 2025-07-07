

const categoryPage = async ({params}: {params: Promise<{category:string}>}) => {
  let category: string = "";

  try{
    category = (await params).category
  }catch(error){
    console.error("Помилка завантаження категорії",error)
  }
  return(
    <div>
      Сторінка категорії:{category}
    </div>
  )
}

export default categoryPage;