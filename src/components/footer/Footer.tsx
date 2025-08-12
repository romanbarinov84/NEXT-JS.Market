import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#f2ecd7c1] mb-0 md:mb-0  px-[max(12px,calc((100%-1208px)/2))] w-full ">
        <div className="px-7 py-10 flex  justify-between  gap-10 text-[#414141] items-start">
          
          {/* Логотип */}
          <div className="logo">
            <Link href="/" className="relative w-43 h-26 md:w-16 md:h-11 block">
              <Image
                src="/logo/logo-1.png"
                alt="Header-logo"
                fill
                sizes="128px"
                priority
              />
            </Link>
          </div>

           <nav className="nav">
            <ul className="flex flex-wrap gap-x-8 text-xs gap-4 xl:gap-y-2 md:gap-x-10">
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Про нас</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Меню</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Вакансії</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Магазини</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Доставка</Link>
              </li>
              <li className="hover:text-black cursor-pointer">
                <Link href="#">Контакти</Link>
              </li>
            </ul>
          </nav>

          {/* Соцсети */}
          <div className="social flex flex-row gap-x-5 md:flex-col xl:flex-row gap-y-3 justify-between">
            <a href="https://t.me/+F5EacPhiia41YTMy">
              <Image
                src="/telegaIcon.png"
                alt="Telegram Icon"
                width={24}
                height={24}
                className="hover:opacity-65 transition-opacity duration-300"
              />
            </a>
            <a href="https://www.facebook.com/p/Галя-Балувана-Бровари-100064209397170/">
              <Image
                src="/facebookicon.png"
                alt="Facebook Icon"
                width={24}
                height={24}
                className="hover:opacity-65 transition-opacity duration-300"
              />
            </a>
          </div>

          {/* Телефон */}
          <div className="phone">
            <a
              href="tel:+380965432323"
              className="flex items-center gap-x-2 hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/phoneIcon.svg"
                alt="Phone Icon"
                width={20}
                height={20}
              />
              <span className="text-sm">+38 (096) 543 23 23</span>
            </a>
          </div>

          {/* Навигация */}
         
          
        </div>
      </div>
    </footer>
  );
}
