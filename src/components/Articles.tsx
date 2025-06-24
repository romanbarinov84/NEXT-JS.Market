import { Article } from "@/types/articles";

import Image from "next/image";
import Link from "next/link";
;

const Articles = async () => {
  let articles: Article[] = [];
  let error = null;

  try {
    const res = await fetch(
      `${process.env.DELIVERY_SHOP_DB_URL!}/api/articles`
    );
    articles = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "неизвестная ошибка";
    console.error("Ошибка в компоненте Articles", err);
  }

  if (error) {
    return <div className="text-red-500 py-8"> error : {error}</div>;
  }

  return (
    <section>
      <div className="flex flex-col justify-center xl:max-w-[1208px]">
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl xl:text-4xl text-left font-bold  text-[#606060] text-shadow-lg/10">
            Пости
          </h2>
          <button className="flex flex-row items-center gap-x-2 cursor-pointer">
            <Link
              href="#"
              className="text-base text-center text-shadow-lg/10 text-[#606060] hover:text-[#d2cfcf]"
            >
              До постів
            </Link>
            <Image
              src="/shevron-right.svg"
              alt="shevronRight-image"
              width={24}
              height={24}
              sizes="24px"
            />
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <li key={article._id} className="h-75 md:h-105">
            <article className="bg-white h-full flex flex-col rounded overflow-hidden shadow-lg hover:shadow-xl duration-500">
              <div className="relative h-48 w-full">
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw (max-width:1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-2.5 flex-1 flex flex-col gap-y-2.5 leading-1.5">
                <time className="text-[8px] text-[#606060]">
                  {new Date(article.createdAt).toLocaleDateString("ua-UA")}
                </time>
                <h3 className="text-[#434343] text-base font-bold xl:text-lg">
                  {article.title}
                </h3>
                <p className="text-[#808080] line-clamp-3 text-xs xl:text-base">
                  {article.text}
                </p>
                <button className="rounded mt-auto w-37.5 h-10 bg-[#e5ffde] text-base text-[#6ce9a0] shadow-lg hover:shadow-xl hover:text-white duration-500 cursor-pointer">
                  Подробиці
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Articles();
