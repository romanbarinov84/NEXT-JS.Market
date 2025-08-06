import { Suspense } from "react";
import SearchRes from "./SearchResalt";
import Loader from "@/components/Loader";


export default function SearchResult(){

    return (
        <>
         <Suspense fallback={<Loader text="Загрузка результатов поиска..." />}>
      <SearchRes />
    </Suspense>
        </>
    )
}