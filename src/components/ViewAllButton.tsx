import Image from "next/image";
import Link from "next/link";


export default function ViewAllButton({btnText,href}:{btnText:string,href: string} ){

    return (
        <div>
            <Link href={href} className="flex flex-row items-center gap-x-2 cursor-pointer">
                    <p className="text-base text-center text-shadow-lg/10  text-[#606060] hover:text-[#bfbfbf]">
                       {btnText}
                    </p>
                    <Image src="/feather-icon/Shape (Stroke).svg" alt="ActionsImg" width={25} height={25} sizes="25px"/>
                </Link>
        </div>
    )
}