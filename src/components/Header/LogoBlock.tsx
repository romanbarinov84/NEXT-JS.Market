import Link from "next/link";
import Image from "next/image";

export function LogoBlock(){

    return(
        <div>
            <Link href="/" className="flex flex-row gap-3 items-center cursor-pointer">
            <div className="relative hidden md:block w-48 h-28 md:w-46 md:h-42 xl:w-48 xl:h-36">
                <Image src="/icons/logo-1.png" alt="logo-logo" 
                className="object-contain"
                fill 
                sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"/>
            </div>
            <div>
                <h1></h1>
            </div>
            </Link>
            
        </div>
    )
}