import Image from "next/image";

export default function TopMenu() {
  return (
    <div>
      <ul className="flex flex-row  justify-between items-end gap-12">
        <li className="flex flec-col items-center gap-2 w-11 cursor-pointer md:hidden">
          <Image
            src="/userBlock/BurgerBlack.svg"
            alt="burgerBlack"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          <span>Каталог</span>
        </li>
        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <div className="relative w-6 h-6">
            <Image
              src="/userBlock/Shape.svg"
              alt="shape"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>

          <span>Избранное</span>
        </li>
        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <Image
            src="/userBlock/cube.svg"
            alt="cube"
            width={24}
            height={24}
            className="object-contain w-6 h-6"
          />
          <span>Заказы</span>
        </li>
        <li className="flex flex-col items-center gap-2 w-11 cursor-pointer">
          <Image
            src="/userBlock/shopping-cart.svg"
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
