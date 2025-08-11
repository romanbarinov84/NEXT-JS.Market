const fetchCategory = async (
  category: string,
  options: {
    pagination: { startIdx: number; perPage: number }; }
 
) => {

  try {
     const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
    url.searchParams.append("category", category);
    url.searchParams.append("startIdx",options.pagination.startIdx.toString());
    url.searchParams.append("perPage",options.pagination.perPage.toString());

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Ошибка получения продуктов ${category}`);
    }

    const data = await res.json();

    return {
      items: data.products || data,
      totalCount: data.totalCount || data.length,
    };
  } catch (err) {
    throw err;
  }
};

export default fetchCategory;
