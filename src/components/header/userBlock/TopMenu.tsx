"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../../../store/authStore";
import IconMenuMob from "@/components/svg/IconMenuMob";
import IconHeart from "@/components/svg/IconHeart";
import IconBox from "@/components/svg/IconBox";
import IconCart from "@/components/svg/IconCart";



const TopMenu = () => {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";
  const isFavoritePage = pathname === "/favorites";
  const isCartPage = pathname === "/cart";
  const { user } = useAuthStore();

  const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

  return (
    <ul className="flex flex-row gap-x-6 items-end">
      <li>
        <Link
          href="/catalog"
          className="flex flex-col items-center gap-2.5 md:hidden w-11 cursor-pointer"
        >
          <IconMenuMob isCatalogPage={isCatalogPage} />
          <span className={isCatalogPage ? "text-[#ff6633]" : "text-main-text"}>
            Каталог
          </span>
        </Link>
      </li>

      {!isManagerOrAdmin && (
        <li>
          <Link
            href="/favorites"
            className="flex flex-col items-center gap-2.5 w-11 cursor-pointer"
          >
            <IconHeart isActive={isFavoritePage} variant="orange"/>
            <span
              className={isFavoritePage ? "text-[#ff6633]" : "text-main-text"}
            >
              Избранное
            </span>
          </Link>
        </li>
      )}

      <li className="flex flex-col items-center gap-2.5 w-11 cursor-pointer">
        <IconBox />
        <span className={isManagerOrAdmin ? "text-[#ff6633]" : "text-main-text"}>Заказы</span>
      </li>
      {!isManagerOrAdmin && (
        <li className="flex flex-col items-center gap-2.5 w-11 cursor-pointer">
          <Link href="/cart" className="flex flex-col items-center gap-2.5 w-11"><IconCart isActive={isCartPage}/></Link>
         
          <span className="text-main-text">Корзина</span>
        </li>
      )}
    </ul>
  );
};

export default TopMenu;