//import { MongoClient } from "mongodb";
//import { getDBAndRequestBody } from "../../../../utils/api-routes";
import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";
//import { MongoClient } from "mongodb";

//const clientPromise = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!).connect(); Для MongoDB ATLAS

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
