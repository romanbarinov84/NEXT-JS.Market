"use client"

import { ErrorProps } from "@/types/errorProps";




export default function ErrorComponent({error,userMessage}:ErrorProps){
    console.error("Произошла ошибка",error);

    return(
        <>
         <div className="m-4 p-4 bg-red-100 text-red-400 rounded text-center">
            <p className="text-red-300">{userMessage || "Произошла ошибка.Пожалуйста,попробуйте посже."}</p>
            <button onClick={() => window.location.reload()} className="mt-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer">Попробовать снова</button>
         </div>
        </>
    )
}

