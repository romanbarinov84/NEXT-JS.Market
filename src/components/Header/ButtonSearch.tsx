import Image from "next/image";
export function ButtonSearch(){

    return(
        <div>
              <button className="bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) hidden md:flex w-10  lg:w-40 cursor-pointer duration-300" >
       <Image src="/icons/Button.svg" alt="Button-logo" width={160} height={30} className="hidden md:block"/>
      </button>
        </div>
    )
}