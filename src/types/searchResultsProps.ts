import { SearchProduct } from "./searchProduct";


export interface SearchResultProps{
    isLoading:boolean;
    query:string;
    groupedProducts:{category:string;products:SearchProduct[]}[];
    resetSearch:() => void;
}