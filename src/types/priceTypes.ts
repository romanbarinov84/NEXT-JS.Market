 export type PriceRange = {
  min:number;
  max:number;
  
}

 export interface PriceFilterProps {
  basePath: string;
  category: string;
  setIsFilterOpenAction?:(value:boolean) => void;
}