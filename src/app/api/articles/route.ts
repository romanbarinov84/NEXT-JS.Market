
import { getDB } from "../../../../utils/APIRotes";
import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET() {
    try{
       const db = await getDB();
       //извлекаем статьи
       const articles = await db.collection("articles").find().toArray();
       return NextResponse.json(articles)
    }catch(error){
        console.error("Ошибка сервера", error);
        return  NextResponse.json({messaage:"Ошибка сервера"}),{status:500};
    }
}