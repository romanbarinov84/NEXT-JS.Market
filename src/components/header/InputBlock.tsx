import Image from "next/image";

export default function InputBlock(){

    return(
        <div>
         <div className="min-w-[261px] relative flex-grow">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 rounded p-2 py-2 px-4
             outline outline-(--color-primary) focus:shadow-(--shadow-button-default) text-[#8f8f8f] text-base leading-[150%]"
          />
          <button className="absolute top-2 right-2 cursor-pointer">
            <Image
              src="/LoupeHeadInput.svg"
              alt="LoupeIcon"
              width={24}
              height={24}
              className="hidden md:block"
            />
          </button>
        </div>
        </div>
    )
}