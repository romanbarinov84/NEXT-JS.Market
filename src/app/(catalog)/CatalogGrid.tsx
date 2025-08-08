import { CatalogGridProps } from "@/types/catalogGridProps";
import GridCategoryBlock from "./GridCategoryBlock";





export default function CatalogGrid({isEditing,draggedCategory,categories,hoveredCategoryId,handleDragStart,handleDragOver,handleDragLeave,handleDrop}:CatalogGridProps){

    return(
        <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 xl:gap-6 mb-6 ">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${category.mobileColSpan} ${category.tabletColSpan} ${
              category.colSpan
            } bg-gray-100 rounded overflow-hidden min-h-50 h-full 
             ${isEditing ? "border-3 border-dashed border-gray-300" : " "}
             ${
               hoveredCategoryId === category._id
                 ? "border-3 border-red-800"
                 : " "
             }
             
             `}
            onDragOver={(e) => handleDragOver(e, category._id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, category._id)}
          >
            <div
              className={`h-full w-full  ${
                draggedCategory?._id === category._id ? "opacity-50" : " "
              }`}
              draggable={isEditing}
              onDragStart={() => handleDragStart(category)}
            >
              <GridCategoryBlock
                id={category.id}
                slug={category.slug}
                title={category.title}
                img={category.img}
              />
            </div>
          </div>
        ))}
      </div>
    )
}