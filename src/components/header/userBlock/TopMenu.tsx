import Image from "next/image";
import Link from "next/link";

export default function TopMenu() {
  return (
    <div>
      <ul className="flex flex-row  justify-between items-end gap-12">
        <Link href="/catalog">
          <li className="flex flex-col items-center gap-2 w-11 cursor-pointer md:hidden">
            <Image
              src="/userBlock/BurgerBlack.svg"
              alt="burgerBlack"
              width={24}
              height={24}
              className="object-contain w-6 h-6"
            />
            <span>Каталог </span>
          </li>
        </Link>

        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <div className="relative w-6 h-6">
            <Image
              src="/userBlock/heartIcon.png"
              alt="shape"
              fill
              className="object-contain"
            />
          </div>

          <span>Избранное</span>
        </li>
        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <Image
            src="/userBlock/CubeIcon.png"
            alt="cube"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          <span>Заказы</span>
        </li>
        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <Image
            src="/userBlock/corzinaIcon.png"
            alt="shoppingCart"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          <span>Корзина</span>
        </li>
      </ul>
    </div>
  );
}
