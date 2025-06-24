import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
export const revalidate = 3600;

export async function GET(request:Request) {
  try {
    const category = new URL(request.url).searchParams.get("category")
    if(!category){
        return NextResponse.json(
            {message: "Параметр категории обязателен"},
            {status:400}
        );
    }
    const products = await(await getDb()).collection("products").find({categories: category}).toArray();
    return NextResponse.json(products);
    
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });

      }
}