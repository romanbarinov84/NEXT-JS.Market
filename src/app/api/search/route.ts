import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
import { SearchProduct } from "@/types/searchProduct";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    if (!query) {
      return NextResponse.json({ groupeProducts: [] });
    }

    const db = await getDb();
    const products = (await db
      .collection("products")
      .find({
        $or:[
           {title: { $regex: query, $options: "i" }},
            {description:{$regex:query,$options:"i"}},
        ]
       
      })

      .project({
        title: 1,
        prodCategories: 1,
        id: 1,
        categories: 1,
      })
      .toArray()) as SearchProduct[];

    if (!products.length) return NextResponse.json({ groupeProducts: [] });

    //Обьект для групировки продуктов по категориям
    const groupedByCategory: Record<string, SearchProduct[]> = {};
    for (const product of products) {
      for (const category of product.categories) {
        const normalizedCategory = category.toLowerCase();

        if (!groupedByCategory[normalizedCategory]) {
          groupedByCategory[normalizedCategory] = [];
        }
        groupedByCategory[normalizedCategory].push(product);
      }
    }

    const result = Object.entries(groupedByCategory).map(
      ([category, products]) => ({
        category,
        products,
      })
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Помилка пошуку:", error);
    return NextResponse.json({ error: "Помилка пошуку" }, { status: 500 });
  }
}
