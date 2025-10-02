import GenericListPage from "@/app/(products)/GenericListPage";
import { Suspense } from "react";
import { headers } from "next/headers";
import { PATH_TRANSLATIONS } from "../../../../utils/pathTranslations";
import Loader from "@/components/Loader";
import { getCustomSessionToken, getValidCustomSession } from "../../../../utils/validatons/auth-helpers";
import fetchFavorites from "./fetchFavorites";
import FilterButtons from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/FilterButtons";
import FilterControls from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/FilterControls";
import PriceFilter from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/PriceFilter";
import DropFilter from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/DropFilter";

async function getServerUserId() {
  try {
    const headersList = await headers();
    const cookies = headersList.get("cookie");
    const sessionToken = getCustomSessionToken(cookies);
    if (!sessionToken) return null;
    const session = await getValidCustomSession(sessionToken);
    return session?.userId || null;
  } catch {
    return null;
  }
}

const FavoritesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    itemsPerPage?: string;
    filter?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    inStock?: string;
  }>;
  params: Promise<{ category: string }>;
}) => {
  const category = "favorites";
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;
  const priceFrom = resolvedSearchParams.priceFrom;
  const priceTo = resolvedSearchParams.priceTo;
  const inStock = resolvedSearchParams.inStock === "true";

  const userId = await getServerUserId();

  return (
    <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col mx-auto">
      <h1 className="ml-3 xl:ml-0 text-4xl md:text-5xl text-left font-bold text-main-text mb-8 md:mb-10 xl:mb-15 max-w-[336px] md:max-w-max leading-[150%]">
        {PATH_TRANSLATIONS[category] || category}
      </h1>
      <DropFilter
        basePath={`/${category}`}
        category={category}
        userId={userId}
        apiEndpoint="users/favorites/products"
      />
      <div className="hidden xl:flex">
        <FilterButtons basePath={`/${category}`} />
      </div>
      <div className="flex flex-row gap-x-10 justify-between">
        <div className="hidden xl:flex flex-col w-[272px] gap-y-10">
          <div className="h-11 bg-[#f3f2f1] rounded text-base font-bold text-main-text flex items-center p-2.5">
            Фильтр
          </div>
          <PriceFilter
            basePath={`/${category}`}
            category={category}
            userId={userId}
            apiEndpoint="users/favorites/products"
          />
        </div>
        <div className="flex flex-col">
          <div className="hidden xl:flex">
            <FilterControls basePath={`/${category}`} />
          </div>

          <Suspense fallback={<Loader />}>
            <GenericListPage
              searchParams={Promise.resolve(resolvedSearchParams)}
              props={{
                fetchData: ({ pagination: { startIdx, perPage } }) =>
                  fetchFavorites({
                    pagination: { startIdx, perPage },
                    filter: activeFilter,
                    priceFrom,
                    priceTo,
                    inStock,
                    userId,
                  }),
                basePath: `/${category}`,
                contentType: "category",
                errorMessage: "Не удалось загрузить список избранного. Попробуйте позже.",
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;