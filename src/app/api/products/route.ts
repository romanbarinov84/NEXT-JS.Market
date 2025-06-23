

//import { getDBAndRequestBody } from "../../../../utils/api-routes";
import { NextResponse } from "next/server";
//import { MongoClient } from "mongodb";
import {getProductsByCategory} from "../../../../utils/api-routes"
//const clientPromise = new MongoClient(process.env.DELIVERY_SHOP_DB_URL!).connect(); Для Mongo ATLAS





export async function GET(request:Request) {
    
    try{
        const {searchParams} = new URL(request.url);
        const category = searchParams.get("category");

        if(!category){
            return NextResponse.json(
                {message: "Need to parametr of category"},
                {status:400}
            );
        }
        const products = await getProductsByCategory(category);
        return NextResponse.json(products);
    }
    catch(error){
      console.error("error server",error);
      return NextResponse.json(
         {message: "Server error"},
         {status:500}
      )
    }
}