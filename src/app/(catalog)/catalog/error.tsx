"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({
    error,reset,
}:{
    error:Error;
    reset:() => void;
}) {
    const router = useRouter();

const handleRetry = () => {
    startTransition(() => {
        reset(); //сброс клиентского состояния
        router.refresh();//Перезагрузка серверных данных
    });
};

return (
    <div className="m-4 p-4 bg-red-200 text-red-400 flex justify-center items-center">
        <p>Помилка: {error.message}</p>
        <button 
          onClick={handleRetry}
           className="ml-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer">
            Спробувати знову
           </button>
    </div>
);

}