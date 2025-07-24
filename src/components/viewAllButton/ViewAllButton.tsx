import Image from "next/image";
import Link from "next/link";

export const ViewAllButton = ({btnText,href}: {btnText:string,href:string}) => {

    return(
        <>
         <Link href={href} className="flex flex-row items-center gap-x-2 cursor-pointer">
            <p
              className="text-base text-center text-[#5e5e5e] hover:text-[#bfbfbf]"
              style={{ textShadow: "2px 2px 4px rgba(69, 69, 69, 0.6)" }}
            >
              {btnText}
            </p>
             
              
               <Image
              src="/ActionsShevronRight.svg"
              alt={btnText}
              width={24}
              height={24}
              className="w-6  h-auto group-hover:opacity-80 transition-opacity"
            />
            
            
          </Link>
        </>
    )
}