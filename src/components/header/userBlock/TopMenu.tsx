"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../../../../store/authStore";
import IconMenuMob from "@/components/svg/IconMenuMob";
import IconHeart from "@/components/svg/IconHeart";
import IconBox from "@/components/svg/IconBox";



const TopMenu = () => {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";
  const isFavoritePage = pathname === "/favorites";
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
          <Image
            src="/userBlock/corzinaIcon.png"
            alt="Корзина"
            width={30}
            height={30}
            className="object-contain w-6 h-6"
          />
          <span className="text-main-text">Корзина</span>
        </li>
      )}
    </ul>
  );
};

export default TopMenu;