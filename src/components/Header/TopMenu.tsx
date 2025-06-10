import Image from "next/image";
import IconHeart from "/public/icons/TopMenu-icons/Shape (Stroke).svg";
import IconBox from "/public/icons/TopMenu-icons/Frame 211.svg";
import IconCart from "/public/icons/TopMenu-icons/корзина.svg";

export function TopMenu() {
  return (
    <div>
      <ul className="flex flex-row gap-x-8 items-end ">

        <li className="flex flex-col items-center gap-2.5 hidden xl:block  w-11 cursor-pointer">
          <Image src={IconHeart} width={34} height={34} alt="LogoHeart" />
          <span>Обране</span>
        </li>

        <li className="flex flex-col items-center gap-2.5   w-11 cursor-pointer ">
          <Image src={IconBox} width={34} height={34} alt="LogoBox" />
          <span>Замовлення</span>
        </li>

        <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer ">
          <Image src={IconCart} width={34} height={34} alt="LogoCart" />
          <span>Кошик</span>
        </li>

      </ul>
    </div>
  );
}
