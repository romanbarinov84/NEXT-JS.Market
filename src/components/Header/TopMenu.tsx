import Image from "next/image";
import IconHeart from "/public/icons/TopMenu-icons/Shape (Stroke).svg";
import IconBox from "/public/icons/TopMenu-icons/Frame 211.svg";
import IconCart from "/public/icons/TopMenu-icons/корзина.svg";
import Link from "next/link";

export function TopMenu() {
  return (
    <div>
      <ul className="flex flex-row gap-x-8 items-end ">
        <Link href="/catalog">
          <li className="flex flex-col items-center gap-2.5  xl:block  w-11 cursor-pointer">
            <Image src={IconHeart} width={24} height={24} alt="LogoHeart" />
            <span>Обране</span>
          </li>
        </Link>

        <li className="flex flex-col items-center  w-11 cursor-pointer ">
          <Image src={IconBox} width={24} height={24} alt="LogoBox" />
          <span>Замовлення</span>
        </li>

        <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer hidden md:block ">
          <Image src={IconCart} width={24} height={24} alt="LogoCart" />
          <span>Кошик</span>
        </li>
      </ul>
    </div>
  );
}
