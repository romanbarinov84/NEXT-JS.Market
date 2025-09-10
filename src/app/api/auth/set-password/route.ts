import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getDB } from "../../../../../utils/APIRotes";

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: "Требуется userId и password" },
        { status: 400 }
      );
    }

    const db = await getDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Пользователь не найден", debug: { userId } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
