import { NextResponse } from "next/server";
import { getDB } from "../../../../../../utils/APIRotes";


export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const db = await getDB();

    const user = await db.collection("user").findOne({
      phoneNumber,
    });

    if (!user) {
      return NextResponse.json({
        exists: false,
      });
    }

    return NextResponse.json({
      exists: true,
    });
  } catch (error) {
    console.error("Ошибка проверки телефона:", error);
    return NextResponse.json(
      {
        error: "Ошибка сервера",
      },
      { status: 500 }
    );
  }
}