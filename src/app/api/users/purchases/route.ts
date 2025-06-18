import { getDBAndRequestBody } from "../../../../../utils/api-routes";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const clientPromise = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!).connect();

export async function getPurchases(){
    const {db} = await getDBAndRequestBody(clientPromise,null);
    const user = await db.collection("users").findOne({});

    if(!user?.purchases?.length) return [];
    
   const productIds = user.purchases.map((p:{id:number}) => p.id);
   const products = await db.collection("products").find({id:{$in:productIds}}).toArray();
   return products.map((product) => {
    const {discountPercent, ...rest}  = product;
    void discountPercent;
    return {
        ...rest
    }
   })
}
export async function GET() {
    
    try{
      
        const purchases = await getPurchases();
        return NextResponse.json(purchases);
    }
    catch(error){
      console.error("error server",error);
      return NextResponse.json(
         {message: "Server error"},
         {status:500}
      )
    }
}