import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
import { ProductCardProps } from "@/types/product";

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
        title: { $regex: query, $options: "i" },
      })

      .project({
        _id:1,
        id: 1,
        img:1,
        description:1,
        basePrice:1,
        discountPercent:1,
        rating:1,
        title: 1,
        
      
      })
      .toArray()) as ProductCardProps[];

    if (!products.length) return NextResponse.json({ groupeProducts: [] });

 

   
    return NextResponse.json(products);
  } catch (error) {
    console.error("Помилка пошуку:", error);
    return NextResponse.json({ error: "Помилка пошуку" }, { status: 500 });
  }
}
