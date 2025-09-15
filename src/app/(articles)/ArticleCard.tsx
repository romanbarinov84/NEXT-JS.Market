import { ArticleCardProps } from "@/types/articles";
import Image from "next/image";

export default function ArticleCard({
  img,
  title,
  createdAt,
  text,
}: ArticleCardProps) {
  return (
    <article
      className="bg-white h-full flex flex-col  rounded overflow-hidden
                     shadow-(--shadow-card) hover:shadow-(--shadow-article) duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          quality={85}
          sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, (max-width:1024px)33vw,25vw"
        />
      </div>
      <div className="p-2.5 flex-1 flex flex-col gap-y-2.5 leading-[1.5]">
        <time className="text-[8px] text-[#8f8f8f]">
          {new Date(createdAt).toLocaleDateString("uk-UA")}
        </time>
        <h3 className="text-[text-main-text] text-base font-bold xl:text-lg">
          {title}
        </h3>
        <p className="text-[text-main-text] line-clamp-3 text-xs xl:text-base">
          {text}
        </p>
        <button className="rounded mt-auto w-37 h-10 bg-[#e5ffde] text-base text-[#70c0ce] hover:bg-[#--color-primary] hover:shadow(--shadow-button-default) hover:text-white active:shadow-(--shadow-button-active) duration-300 cursor-pointer">
          Подробиці...
        </button>
      </div>
    </article>
  );
}
