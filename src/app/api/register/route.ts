import { NextResponse } from "next/server";
import { getDB } from "../../../../utils/APIRotes";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const {
      phone,
      surname,
      firstName,
      password,
      birthdayDate,
      region,
      location,
      gender,
      card,
      email,
      hasCard,
    } = await request.json();

    const db = await getDB();

    const existingUser = await db.collection("users").findOne({
        phone,
    });

    if(existingUser){
         NextResponse.json(
      {error: "Пользователь с таким телефоном уже существует" },
      {status:400}
   );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      phone,
      surname,
      firstName,
      password: hashPassword,
      birthdayDate,
      region,
      location,
      gender,
      card,
      email,
      hasCard,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        userId: result.insertedId,
        user: {
          phone,
          surname,
          firstName,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка регистрации", error);
    return NextResponse.json(
      {error: "Внутренняя ошибка сервера" },
      {status:500}
   );
  }
}
