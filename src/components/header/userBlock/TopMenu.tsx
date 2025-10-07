"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";


import { useEffect } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { useCartStore } from "../../../../store/cartStore";
import IconMenuMob from "@/components/svg/IconMenuMob";
import IconHeart from "@/components/svg/IconHeart";
import IconBox from "@/components/svg/IconBox";
import IconCart from "@/components/svg/IconCart";

const TopMenu = () => {
  const pathname = usePathname();
  const isCatalogPage = pathname === "/catalog";
  const isFavoritesPage = pathname === "/favorites";
  const isCartPage = pathname === "/cart";
  
  const { user } = useAuthStore();
  const { totalItems, fetchCart } = useCartStore();

  const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

  useEffect(() => {
    if (user && !isManagerOrAdmin) {
      fetchCart();
    }
  }, [user, isManagerOrAdmin, fetchCart]);

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
            <IconHeart isActive={isFavoritesPage} variant="orange" />
            <span className={isFavoritesPage ? "text-[#ff6633]" : ""}>
              Избранное
            </span>
          </Link>
        </li>
      )}

      <li className="flex flex-col items-center gap-2.5 w-11 cursor-pointer">
        <IconBox />
        <span className={isManagerOrAdmin ? "text-[#ff6633]" : ""}>Заказы</span>
      </li>

      {!isManagerOrAdmin && (
        <li className="relative flex flex-col items-center gap-2.5 w-11 cursor-pointer">
          <Link
            href="/cart"
            className="flex flex-col items-center gap-2.5 w-11 cursor-pointer"
          >
            <IconCart isActive={isCartPage} />
            
            {totalItems > 0 && (
              <span className="absolute -top-2 right-0 bg-[#ff6633] text-white text-[9px] rounded w-4 h-4 flex items-center justify-center py-0.5 px-1">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            
            <span className={isCartPage ? "text-[#ff6633]" : ""}>
              Корзина
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default TopMenu;