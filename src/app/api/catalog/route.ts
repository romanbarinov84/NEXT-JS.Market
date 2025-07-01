import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
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
