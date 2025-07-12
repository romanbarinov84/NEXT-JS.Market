import Image from "next/image";
import IconHeart from "/public/icons/TopMenu-icons/Shape (Stroke).svg";
import IconBox from "/public/icons/TopMenu-icons/Frame 211.svg";
import IconCart from "/public/icons/TopMenu-icons/корзина.svg";
import Link from "next/link";

export function TopMenu() {
  return (
    <div>
      <ul className="flex flex-row gap-x-8 items-end ">
        
          <li className="flex flex-col items-center gap-2.5  xl:block  w-11 cursor-pointer">
            <Link href="/catalog">
            <Image src={IconHeart} alt="LogoHeart"  width={20}  height={20} style={{ height: 'auto' }} />
            <span>Обране</span>
            </Link>
          </li>
        

        <li className="flex flex-col items-center  w-11 cursor-pointer ">
           <Link href="/catalog">
           <Image src={IconBox}  alt="LogoBox" width={20}  height={20} style={{ height: 'auto' }} />
          <span>Замовлення</span>
           </Link>
          
        </li>

        <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer  md:block ">
           <Link href="/catalog">
           <Image src={IconCart} alt="LogoCart"  width={20}  height={20} style={{ height: 'auto' }}/>
          <span>Кошик</span>
           </Link>
          
        </li>
      </ul>
    </div>
  );
}
