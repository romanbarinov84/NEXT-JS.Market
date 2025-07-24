

import { getDB } from "../../../../utils/APIRotes";
import { NextResponse } from "next/server";
export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try{
        const category = new URL(request.url).searchParams.get("category");
        if(!category){
            return NextResponse.json(
                {message: "Параметр категории обязателен"},
                {status:400}
            );
        }
       const products = await(await getDB()).collection("products").find({categories:category}).toArray();
       //извлекаем статьи
       
       return NextResponse.json(products)
    }catch(error){
        console.error("Ошибка сервера", error);
        return  NextResponse.json({messaage:"Ошибка при загрузке продуктов"}),{status:500};
    }
}