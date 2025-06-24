import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
export const revalidate = 3600;

export async function GET() {
  try {
    const db = await getDb();
    const articles = await db.collection("articles").find().toArray();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
