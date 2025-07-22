import Image from "next/image";
import articlesDataBase from "@/data/articlesDataBase.json";
import Link from "next/link";


export default function Articles(){
    const articles = articlesDataBase;

    return(

        <section>
             <div className="flex flex-col justify-center xl:max-w-[1208px] mx-auto">
         <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
            <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">Пости</h2>
            <Link href="#" className="flex flex-row items-center gap-x-2 cursor-pointer">
            <p className="text-base text-center text-[#333] hover:text-[#bfbfbf] duration-300">
                До статей
            </p>
            <Image 
            src="/ActionsShevronRight.svg" 
            alt="ShevronRight"
            width={24}
            height={24}
            sizes="24px"/>
            </Link>
         </div>
           
           <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {articles.slice(0,3).map((article) => (
                <li key={article.id} className="h-75 md:h-105">
                    <article className="bg-white h-full flex flex-col rounded overflow-hidden
                     shado-(--shadow-card) hover:shadow-(--shadow-article) duration-300">
                        <div className="relative h-48 w-full">
                            <Image 
                            src={article.img} 
                            alt={article.title}
                            fill 
                             className="object-cover"
                             quality={85}
                             sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, (max-width:1024px)33vw,25vw"/>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col gap-y-2.5 leading-[1.5]">
                            <time className="text-[8px] text-[#8f8f8f]">
                                {new Date(article.createdAt).toLocaleDateString("uk-UA")}
                            </time>
                            <h3 className="text-[#414141] text-base font-bold xl:text-lg">
                                {article.title}
                            </h3>
                            <p className="text-[#414141] line-clamp-3 text-xs xl:text-base">
                                {article.text}
                            </p>
                            <button className="rounded mt-auto w-37 h-10 bg-[#e5ffde] text-base text-[#70c0ce] hover:bg-[#--color-primary] hover:shadow(--shadow-button-default) hover:text-white active:shadow-(--shadow-button-active) duration-300 cursor-pointer">
                                Подробиці...
                            </button>
                        </div>
                     </article>
                </li>
            ))}
           </ul>
        </div>
        </section>
       
    )
}