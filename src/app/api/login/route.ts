import { NextResponse } from "next/server";
import { getDB } from "../../../../utils/APIRotes";

export async function  POST(request:Request) {
     

    try{
      const {phoneNumber,password} = await request.json();
      const db = await getDB();

      const user = await db.collection("users").findOne({phoneNumber})

      if(!user){
        return NextResponse.json(
            {message:"Пользователь не найден"},
            {status:401}
        )
      }

      const bcrypt = await import("bcrypt");
      const isPasswordValid = await bcrypt.compare(password,user.password);

      if(!isPasswordValid){
         return NextResponse.json(
            {message:"Пароль не совпадает"},
            {status:401}
        )
      }

      const responseData = {
        success:true,
        user:{
            _id:user.id,
            phoneNumber:user.phoneNumber,
            surName:user.surName,
            name:user.name,
            email:user.email,
        },
      };

      return NextResponse.json(responseData)
    }catch(error){
      console.error("Ошибка авторизации", error);
    return NextResponse.json(
      {error: "Внутренняя ошибка сервера" },
      {status:500}
   );
    }
}