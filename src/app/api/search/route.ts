import { NextResponse } from "next/server";
import { getDb } from "../../../../utils/api-routes";


export async function GET(request:Request) {
    try{
      const {searchParams} = new URL(request.url);
      const query = searchParams.get("query") || "";

      if(!query){
        return NextResponse.json({groupeProducts:[]});
      }

      const db = await getDb();
      const products = await db.collection("products").find({
        $or:[
            {title:{$regex: query, $option:"i"}},
            {description:{$regex: query, $option:"i"}},
        ],
      });
       
      .project({
        title:1,
        categories:
      })
    }catch(error){
        console.error("",error)
    }
}