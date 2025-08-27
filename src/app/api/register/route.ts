import { NextResponse } from "next/server";
import { getDB } from "../../../../utils/APIRotes";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const {
      phoneNumber,
      surName,
      name,
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
        phoneNumber,
    });

    if(existingUser){
         NextResponse.json(
      {error: "Пользователь с таким телефоном уже существует" },
      {status:400}
   );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      phoneNumber,
      surName,
      name,
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
          phoneNumber,
          surName,
          name,
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
