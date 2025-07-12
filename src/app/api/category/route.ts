import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
import { CONFIG } from "../../../../config/config";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const startIdx = parseInt(url.searchParams.get("startIdx") || "0");
    const perPage = parseInt(
      url.searchParams.get("perPage") || CONFIG.ITEMS_PER_PAGE_CATEGORY.toString()
    );

    if (!category) {
      return NextResponse.json(
        { message: "Параметр категории обязателен" },
        { status: 400 }
      );
    }

    const query = {
      categories: { $in: [category] },  // чтобы искать по массиву категорий
    };

    const totalCount = await db.collection("products").countDocuments(query);

    const products = await db
      .collection("products")
      .find(query)
      .sort({ _id: 1 })
      .skip(startIdx)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
