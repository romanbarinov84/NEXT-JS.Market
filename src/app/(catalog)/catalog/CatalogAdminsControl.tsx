import { CatalogAdminControlsProps } from "@/types/catalogAdminControlProps";




export default function CatalogAdminsControl({ handleToggleEditing, resetLayout,isEditing }:CatalogAdminControlsProps){

    return(
        <div className="flex justify-end ">
                  <button
                    onClick={handleToggleEditing}
                    className="border border-(--color-primary) hover:text-white hover:bg-[#ff6633] hover:border-transparent active:shadow-(--shadow-button-active) w-1/4 h-10 rounded p-2 justify-center items-center text-(--color-primary) transition-all duration-300 cursor-pointer select-none"
                  >
                    {isEditing ? "Закінчити редагування " : "Редагувати"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={resetLayout}
                      className="ml-3 p-2 text-xs justify-center items-center active:shadow-(--shadow-button-active) border-none rounded cursor-pointer transition-colors duration-300 bg-[#f3f2f1] hover:shadow-(--shadow-button-default)"
                    >
                      Скинути
                    </button>
                  )}
                </div>
    )
}