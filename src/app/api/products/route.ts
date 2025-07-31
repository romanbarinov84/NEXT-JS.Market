import { CONFIG } from "../../../../config/config";
import { getDB } from "../../../../utils/APIRotes";
import { NextResponse } from "next/server";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const randomLimit = url.searchParams.get("randomLimit");
    const startIdx =parseInt(url.searchParams.get("startIdx" )||  "0");
    const perPage = parseInt(url.searchParams.get("perPage" )||  CONFIG.ITEMS_PER_PAGE.toString());

    if (!category) {
      return NextResponse.json(
        { message: "Параметр категории обязателен" },
        { status: 400 }
      );
    }

    const query = {
      categories:category,

    };

    if(randomLimit){
      const pipeline = [
        {$match:query},
        {$sample:{size:parseInt(randomLimit)}},
      ];


      const products = await db
      .collection("products")
      .aggregate(pipeline)
      .toArray();
      return NextResponse.json(products);
    }

    const totalCount = await db.collection("products").countDocuments(query)

    const products = await db
      .collection("products")
      .find(query)
      .sort({_id:1})
      .skip(startIdx)
      .limit(perPage)
      .toArray();

    return NextResponse.json({products,totalCount});
  } catch (error) {
    console.error("Ошибка сервера", error);
    return NextResponse.json(
      { message: "Ошибка при загрузке продуктов" },
      { status: 500 }
    );
  }
}
