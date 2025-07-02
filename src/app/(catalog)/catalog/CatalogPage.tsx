"use client";

import { CatalogProps } from "@/types/catalog";
import { useEffect, useState } from "react";
import GridCategoryBlock from "../GridCategoryBlock";




export default function CatalogPage() {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [isEditing,setIsEditing] = useState(false);
  const [draggedCategory,setDraggedCategory] = useState<CatalogProps | null>(null);
  const [error,setError] = useState<string | null >(null);
  const [isLoading,setIsLoading] = useState(true);
  const isAdmin = true;
  const [hoveredCategoryId,setHoveredCategoryId] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("api/catalog");
      if (!response.ok) throw new Error(`Ошибка ответа : ${response.status}`);

      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a,b) => a.order - b.order))
    } catch (error) {
        console.error("Невдалося загрузити каталог", error);
        setError("Невдалося загрузити каталог");
    }
    finally{
   setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateOrderInDB = async() =>{
    try{
       const response = await fetch("api/catalog",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(
          categories.map((category,index) => ({
            _id:category._id,
            order:index + 1,
            title:category.title,
            img: category.img,
            colSpan:category.colSpan,
            tabletColSpan:category.tabletColSpan,
            mobileColSpan:category.mobileColSpan,
          }))
        ),
       });
       if(!response.ok) throw new Error("Помилка при відновленню порядку каталогу");

       const result = await response.json();
       if(result.success){
        console.log("порядок успішно відновленний");
       }
    }catch(error){
        console.error("Помилка при сбереженні єлементів каталогу в базі данних", error);
        setError("Помилка збереження порядку в базі данних");
    }
  }

  const handleToggleEditing = async() => {
    if(isEditing){
      await updateOrderInDB() //Функция сохранения изменений в базе
    }
     setIsEditing(!isEditing);
  }

  const handleDragStart = (category:CatalogProps) =>{
    if(isEditing) {
         setDraggedCategory(category)
    }
  }

  const handleDragOver = (e: React.DragEvent,categoryId:string) => {
    e.preventDefault();
    if(draggedCategory && draggedCategory._id !== categoryId){
        setHoveredCategoryId(categoryId)
    }
  }

  const handleDragLeave = ()=>{
    setHoveredCategoryId(null)
  };

  const handleDrop = (e:React.DragEvent,targetCategoryId:string) => {
   e.preventDefault();
   if(!isEditing || !draggedCategory) return ;

   setCategories((prevCategories) => {
    const draggedIndex = prevCategories.findIndex(
      (c) => c._id === draggedCategory._id);//индекс перетаскиваемого элемента

    const targetIndex = prevCategories.findIndex(
      (c) => c._id === targetCategoryId);//индекс куда перетаскиваем

      if(draggedIndex === -1 || targetIndex === -1) return prevCategories;

      const newCategories = [...prevCategories];

      const draggedItem = newCategories[draggedIndex];
      const targetItem = newCategories[targetIndex];

      const draggedSizes = {
        mobileColSpan: draggedItem.mobileColSpan,
        tabletColSpan: draggedItem.tabletColSpan,
        colSpan:draggedItem.colSpan,
      }
      const targetSizes = {
        mobileColSpan: targetItem.mobileColSpan,
        tabletColSpan: targetItem.tabletColSpan,
        colSpan:targetItem.colSpan,
      };

      newCategories[draggedIndex] = {...targetItem,...draggedSizes};
      newCategories[targetIndex] = {...draggedItem,...targetSizes};

      return newCategories;
   });
   setDraggedCategory(null);
   setHoveredCategoryId(null);
  }

  const resetLayout = () => {
    fetchCategories()
  }

  if(isLoading) {
    return <div className="text-center py-8 text-[#3838ff]">Загрузка каталога...</div>
  }
  if(error) {
       throw new Error(error);
  }

  if(!categories.length){
    return <div className="text-center py-8 text-[#09f56c]">Категорія каталогу не знайденна</div>
  }



  return (
    <>

     <section className="w-full max-w-[1208px] px-[max(12px,calc((100%-1208px)/2))] mx-auto">
        {isAdmin && (
            <div className=" flex justify-end mb-4">
                <button onClick={handleToggleEditing} className="border border-[#00f100] bg-(--color-primary) shadow-(--shadow-button-default) justify-center items-center duration-300 cursor-pointer select-none
                   hover:text-white hover:bg-orange-400 hover:border-orange-800 p-2 rounded-2xl ">
                    {isEditing ? "Закінчити редагування" : "Змінити положення"}</button>
                    {isEditing && (
                        <button  className="border border-[#00f100] bg-(--color-primary) rounded-2xl hover:text-white hover:bg-orange-400 p-2" onClick={resetLayout}>Скинути</button>
                       
                    )}
                  
            </div>
        )}
       <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl mb:text-5xl">
        <h1>Каталог</h1>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {categories.map((category) => (
            <div key={category._id} className={`p-2 bg-[#fefefe] shadow rounded-xl text-center font-semibold hover:shadow-xl hover:shadow-[#e7dfe4] ${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} ${isEditing ? "border-2 border-dashed border-gray-400" : " "}
            ${hoveredCategoryId === category._id ? " border-4 border-red-400" : " "} 
            `}
              onDragOver = {(e) => handleDragOver(e,category._id)}
              onDrop = {(e) => handleDrop(e,category._id)}
              onDragLeave={(handleDragLeave)}> 

                <div className= {`relative h-48 w-full ${draggedCategory?._id === category._id ? "opacity-50" : " "}` }
                draggable={isEditing} 
         
                onDragStart={() => handleDragStart(category)}>

           <GridCategoryBlock 
           id={category.id} 
           title={category.title} 
           img={category.img}/>
                </div>
               
        
           </div>
          
        ))}
       </div>
       
  </section>
  
  </>
  )
};
