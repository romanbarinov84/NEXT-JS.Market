"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import Image from "next/image";
import { PATH_TRANSLATIONS } from "../../utils/pathTranslations";


export default function BreadCrumbs(){
    const pathName = usePathname();
    
    if(pathName === "/" || pathName === "/search") return null;
     
    const pathSegments = pathName.split("/").filter((segment) => segment !== "");

    const breadcrumbs = pathSegments.map((segment,index) => {
         const decodedSegment = decodeURIComponent(segment); 
        const href = "/" + pathSegments.slice(0, index +1).join("/");
         return {
    label: PATH_TRANSLATIONS[decodedSegment] || decodedSegment,
    href,
    isLast: index === pathSegments.length - 1,
  };
});
    breadcrumbs.unshift({
        label:"Головна",
        href:"/",
        isLast:false,
    })

    return(
        <nav className="px-[max(12px,calc((100%-1208px)/2))] my-6">
            <ol className="flex items-center gap-4 text-[8px] md:text-xs">
                {breadcrumbs.map((item,index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className={item.isLast ? "text-[#8f8f8f]" : "text-[#414141] hover:underline cursor-pointer"}>
                        {item.isLast ? (item.label) : <Link href={item.href}>{item.label}</Link>}
                      </div>
                      {!item.isLast && < Image src="/shevron-right.svg" alt="shevronRight" width={8} height={8} sizes="8px"/>}
                    </li>
                ))}
            </ol>

     
        </nav>
    )
}