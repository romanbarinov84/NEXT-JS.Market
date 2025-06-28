import { Article } from "@/types/articles";
import Image from "next/image";


export const ArticleCard = ({img,title,createdAt,text}:Article) => {

    return(
        <>
         <article className="bg-white  h-full flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl duration-500">
              <div className="relative h-48 w-full">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw (max-width:1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-2.5 flex-1 flex flex-col gap-y-2.5 leading-1.5">
                <time className="text-[8px] text-[#606060]">
                  {new Date(createdAt).toLocaleDateString("ua-UA")}
                </time>
                <h3 className="text-[#434343] text-base font-bold xl:text-lg">
                  {title}
                </h3>
                <p className="text-[#808080] line-clamp-3 text-xs xl:text-base">
                  {text}
                </p>
                <button className="rounded mt-auto w-37.5 h-10 bg-[#e5ffde] text-base text-[#6ce9a0] shadow-lg hover:shadow-xl hover:text-white duration-500 cursor-pointer">
                  Подробиці
                </button>
              </div>
            </article>
        </>
    )
}