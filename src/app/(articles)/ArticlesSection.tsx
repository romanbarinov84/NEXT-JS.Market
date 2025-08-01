import { ViewAllButton } from "@/components/viewAllButton/ViewAllButton";
import ArticleCard from "./ArticleCard";
import { ArticlesSectionProps } from "@/types/articlesSection";

export default function ArticlesSection({
  title,
  viewAllButton,
  articles,

}: ArticlesSectionProps) {
  return (
    <section>
      <div
          className="flex flex-col px-[max(12px,calc((100%-1208px)/2))] mt-20 justify-center w-full xl:max-w-[1208px] mx-auto mt-5 mb-10"
      >
        <div className="mb-4 md:mb-8 xl:mb-10 flex flex-row justify-between">
          <h2 className="text-2xl xl:text-4xl text-left font-bold text-shadow-lg">
            {title}
          </h2>
          {viewAllButton && (<ViewAllButton btnText={viewAllButton.text} href={viewAllButton.href}/>)}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <li
              key={article._id}
              className={`h-75 md:h-105 ${
                 index >= 3
                  ? "hidden md:hidden  xl:hidden"
                  : ""
              }`}
            >
              <ArticleCard {...article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
