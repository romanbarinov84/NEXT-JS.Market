
import { ProductCardProps } from "@/types/product";
import { Article } from "./articles";

type ContentItem = ProductCardProps | Article

interface PaginatedResponse {
    items: ContentItem[];
    totalCount:number;
}

export  interface GenericListPageProps{
    fetchData:(options:{
        pagination:{startIdx:number; perPage:number};
    }) => Promise<PaginatedResponse>;
    pageTitle:string;
    basePath:string;
    errorMessage:string;
    contentType?: string;
}
