import Image from "next/image";

export default function ButtonSearch(){

    return(
        <div>
             <button
                      className="bg-(--color-primary) hover:shadow-(--shadow-button-default)
                          active:shadow-(--shadow-button-active) hidden md:flex w-10 p-2 rounded gap-4 lg:w-35 cursor-pointer duration-300"
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src="/burger-icon.svg"
                          alt="burger-icon"
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-base text-white hidden lg:block">Каталог</span>
                    </button>
        </div>
    )
}