import Link from "next/link";
import Image from "next/image";
import { categoryBlockProps } from "@/types/categoryBlockProps";



export default function GridCategoryBlock({id,title,img}:categoryBlockProps){

    return(
        <>
                  <Link href={`category-${id}`} className="block relative h-full w-full overflow-hidden group">

                 <Image  src={img.trim()} 
                alt={title} 
                fill 
                sizes="(max-width:768px) 100vw,
                (max-width:1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90 group-hover:saturate-100 "/>
                 
                


                <div className="absolute left-2.5 bottom-2.5 flex items-center justify-center">
                     <span className="text-white  text-lg font-bold" 
                     style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)" }}
                     >{title}</span>
                </div>
               
                </Link>
        </>
    )
}