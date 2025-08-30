import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { getDB } from "../../../../../utils/APIRotes";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, newPassword } = await request.json();

    if (!phoneNumber || !newPassword) {
      return NextResponse.json(
        { error: "Требуется phoneNumber и newPassword" },
        { status: 400 }
      );
    }

    const db = await getDB();

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль в базе
    const result = await db.collection("user").updateOne(
      { phoneNumber },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Пользователь с таким номером не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка обновления пароля:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}