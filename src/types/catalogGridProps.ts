import { CatalogProps } from "./catalog"

export interface CatalogGridProps{
    isEditing:boolean;
    draggedCategory:CatalogProps | null;
    categories:CatalogProps[];

    hoveredCategoryId:string | null;
    handleDragStart:(category:CatalogProps) => void;
    handleDragOver:(e:React.DragEvent,categoryId:string) => void;
    handleDragLeave:() => void;
    handleDrop:(e:React.DragEvent,targetCategoryId:string) => void;
}