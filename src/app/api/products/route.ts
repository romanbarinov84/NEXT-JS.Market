import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET(request:Request) {
  try {
    const db = await getDb();
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const randomLimit = url.searchParams.get("randomLimit")

    if(!category){
        return NextResponse.json(
            {message: "Параметр категории обязателен"},
            {status:400}
        );
    };

     const query = {
      categories:category,
      quantity: {$gt: 0},
     };

     if(randomLimit){
      const pipeLine = [{$match:query}, {$sample:{size: parseInt(randomLimit)}}]

      const products = await db.collection("products").aggregate(pipeLine).toArray();
      return NextResponse.json(products);
     }

    const products = await(await getDb()).collection("products").find({ categories: { $in: [category] } }).toArray();
    
    return NextResponse.json(products);
    
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });

      }
}