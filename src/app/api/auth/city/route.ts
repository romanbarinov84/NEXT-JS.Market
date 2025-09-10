import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { getDB } from "../../../../../utils/APIRotes";

export async function POST(request: NextRequest) {
  try {
    const db = await getDB();
    const body = await request.json();

    const { userId, region, city } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Необходим id пользователя" },
        { status: 400 }
      );
    }

    const result = await db.collection("user").updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      {
        $set: {
          region,
          city,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Данные о местоположении успешно изменены",
    });
    
  } catch (error) {
    console.error("Ошибка изменения данных о местоположении:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}