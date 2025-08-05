import { NextResponse } from "next/server";
import { getDB } from "../../../../utils/APIRotes";
import { ProductCardProps } from "@/types/product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const db = await getDB();
    const products = (await db
      .collection("products")
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      })
      .project({
        _id:1,
        id:1,
        img:1,
        title: 1,
        description:1,
        basePrice:1,
        discpuntPercent:1,
        rating:1,
        
      })
      .toArray()) as ProductCardProps[];

    if (!products.length) {
      return NextResponse.json([]);
    }

    

    

    return NextResponse.json(products);
  } catch (err) {
    console.error("Ошибка поиска", err);
    return NextResponse.json({ error: "Ошибка поиска" }, { status: 500 });
  }
}
