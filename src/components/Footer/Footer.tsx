"use client"


import Image from "next/image"
import Link from "next/link"

export function Footer(){

    return(
        <footer className="bg-[#fff] mb-14 mt-20 md:mb-0 bg-cover bg-center bg-no-repeat ring ring-amber-200 rounded-b-lg">
            <div className="px-7 flex flex-row gap-6 text-[#414141] md:gap-x-10 items-center justify-between ">
                <div className="flex flex-row justify-center mt-10">
                    <Link href="/" className="relative w-23 h-16 md:w-16 md:h-11 block xl:w-40 xl:h-30">
                    <Image src="/icons/logo-1.png" alt="Logo" fill/>
                    </Link>
                    <nav className="flex flex-row gap-x-15 ml-10">

                  <ul className="flex flex-row gap-x-20  md:flex-col xl:flex-row gap-y-3 ">
                     <li className="text-shadow-lg/10 cursor-pointer  hover:text-shadow-lg/20"><Link href="#">... Контакти</Link></li>  
                    
                  
                      <li className="text-shadow-lg/10 cursor-pointer  hover:text-shadow-lg/20"><Link href="#"> ... Вакансії</Link></li>
                    
                   <li className="text-shadow-lg/10 cursor-pointer  hover:text-shadow-lg/20"><Link href="#"> ... Відгуки</Link></li>
                  <li className="text-shadow-lg/10 cursor-pointer  hover:text-shadow-lg/20"><Link href="#"> ... Карта магазинів</Link></li>
                      </ul>
                    </nav>
                </div>
                
                <div className="social flex flex-row gap-x-5  md:flex-col xl:flex-row gap-y-3 justify-end md:flex-col">
                   <div className="flex gap-x-5 items-start ">
                      <a href="https://www.facebook.com/p/%D0%93%D0%B0%D0%BB%D1%8F-%D0%91%D0%B0%D0%BB%D1%83%D0%B2%D0%B0%D0%BD%D0%B0-%D0%91%D1%80%D0%BE%D0%B2%D0%B0%D1%80%D0%B8-100064209397170/">
                     <Image src="/icons/facebook.svg" alt="facebookLOGO"
                       width={24} height={24}
                       className="hover:opacity-70 transition-opacity duration-300"/>
                     </a>
                       <a href="https://t.me/+F5EacPhiia41YTMy">
                     <Image src="/icons/free-icon-telegram-2111646.png" alt="facebookLOGO"
                       width={24} height={24}
                       className="hover:opacity-70 transition-opacity duration-300"/>
                     </a>
                       <a href="https://www.facebook.com/p/%D0%93%D0%B0%D0%BB%D1%8F-%D0%91%D0%B0%D0%BB%D1%83%D0%B2%D0%B0%D0%BD%D0%B0-%D0%91%D1%80%D0%BE%D0%B2%D0%B0%D1%80%D0%B8-100064209397170/">
                     <Image src="/icons/facebook.svg" alt="facebookLOGO"
                       width={24} height={24}
                       className="hover:opacity-70 transition-opacity duration-300"/>
                     </a>
                   </div>
                   <div className="telephone">
                    <a href="tel:+380973456784" className="flex items-center gap-x-4 hover:opacity-50 transition-opacity duration-300">
                        <Image src="/icons/phone.svg" alt="PhoneLogo" width={25} height={25}/>
                        <p className="text-base hover:text-black duration-300">
                            +380973456784
                        </p>
                    </a>
                   </div>
                </div>
            </div>
        </footer>
    )
}