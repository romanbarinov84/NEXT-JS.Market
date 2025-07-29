
import { getDB } from "../../../../utils/APIRotes";
import { NextResponse } from "next/server";
export const revalidate = 3600;

export async function GET() {
    try{
       const db = await getDB();
       //извлекаем статьи
       const catalog = await db.collection("catalog").find().toArray();
       return NextResponse.json(catalog)
    }catch(error){
        console.error("Ошибка сервера", error);
       return NextResponse.json({ message: "Ошибка при загрузке catalog" }, { status: 500 });
    }
}