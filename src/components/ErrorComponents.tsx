"use client"

import { ErrorProps } from "../types/errorProps"

 const ErrorComponent = ({error,userMessage}:ErrorProps) => {
    console.error("Трапилася помилка:",error)
    return(
        <div className="m-4 p-4 bg-red-500  rounded text-center">
         <p>{userMessage || "Трапилася помилка,спробуйте знову"}</p>
         <button 
           onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-400 text-white cursor-pointer">Спробувати ще</button>
        </div>
    )
}

export default ErrorComponent;