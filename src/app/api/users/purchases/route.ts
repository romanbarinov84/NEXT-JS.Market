//import { getDBAndRequestBody } from "../../../../../utils/api-routes";
import { NextResponse } from "next/server";
import { getPurchases } from "../../../../../utils/api-routes";
//const clientPromise = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!).connect();

export async function GET() {
  try {
    const purchases = await getPurchases();
    return NextResponse.json(purchases);
  } catch (error) {
    console.error("error server", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
