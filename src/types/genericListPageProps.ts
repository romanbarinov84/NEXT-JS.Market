import { ProductCardProps } from "@/types/product";
import { Article } from "./articles";

type ContentItem = ProductCardProps | Article

export  interface GenericListPageProps{
    fetchData:() => Promise<ContentItem[]>;
    pageTitle:string;
    basePath:string;
    errorMessage:string;
    contentType?: "articles" | "products";
}
