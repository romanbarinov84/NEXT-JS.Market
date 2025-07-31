const fetchPurchases = async (
  options?: {
    userPurchasesLimit?: number;
    pagination?: { startIdx: number; perPage: number };
  }
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/purchases`);

    if (options?.userPurchasesLimit) {
      url.searchParams.append("userPurchasesLimit", options.userPurchasesLimit.toString());
    } else if (options?.pagination) {
      url.searchParams.append(
        "startIdx",
        options.pagination.startIdx.toString()
      );
      url.searchParams.append("perPage", options.pagination.perPage.toString());
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok)
      throw new Error('Серверная ошибка получения Ваших покупок');

    const data = await res.json();

    return {
      items: data.products || data,
      totalCount: data.totalCount || data.length,
    };
  } catch (err) {
    console.error(`Ошибка в компоненте покупок`, err);
    throw err;
  }
};

export default fetchPurchases;