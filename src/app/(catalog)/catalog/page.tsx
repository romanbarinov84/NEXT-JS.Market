import { Suspense } from "react";
import CatalogPage from "./CatalogPage";
import Loader from "@/components/Loader";

export const metadata = {
  title:"Каталог товарів Галя  Балувана Бровари"
};


export default function Catalog(){

    return(
        <>
        <Suspense fallback={<Loader/>}>

           <CatalogPage/>
        </Suspense>
       
        </>
    )
}


