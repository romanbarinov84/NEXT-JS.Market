import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
import { CatalogProps } from "@/types/catalog";
import { ObjectId } from "mongodb";
export const revalidate = 3600;

export async function GET() {
  try {
    const db = await getDb();
    const catalog = await db.collection("catalog").find().toArray();
    return NextResponse.json(catalog);
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error неможливо загрузити каталог" }, { status: 500 });
  }
}
export async function POST(request:Request) {
  try {
    const db = await getDb();
    const updatedCategories:CatalogProps[] = await request.json();

    const bulkOps = updatedCategories.map((category) => ({
      updateOne:{
        filter:{_id:new ObjectId(category._id)},
          
          update:{
            $set:{
              order:category.order,
              title:category.title,
              img:category.img,
              colSpan:category.colSpan,
              tabletColSpan:category.tabletColSpan,
              mobileColSpan:category.mobileColSpan,
            },
          },
        },
      
    }));

    const result = await db.collection("catalog").bulkWrite(bulkOps);

    return NextResponse.json({
      success: true,
      updatedCount:result.modifiedCount,
    })
  } catch (error) {
    console.error("Помилка при оновленні категорій:", error);
    return NextResponse.json({ message: "Server error неможливо загрузити каталог" }, { status: 500 });
  }
}
