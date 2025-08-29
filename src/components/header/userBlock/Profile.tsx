"use client"

import Image from "next/image";



import Link from "next/link";
import { useAuthStore } from "../../../../store/authStore";

const Profile = () => {
  const { isAuth, userName } = useAuthStore();

  if (!isAuth) {
    return (
      <Link
        href="/login"
        className="ml-6 w-10 xl:w-[107px] flex justify-between items-center gap-x-2 p-2 rounded text-white text-base bg-[#ff6633] hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active) duration-300"
      >
        <div className="w-[109px] justify-center hidden xl:flex">
          <p>Войти</p>
        </div>
        <Image
          src="/EnterImgButton.svg"
          alt="Войти"
          width={24}
          height={24}
        />
      </Link>
    );
  }

  return (
    <div className="ml-6 p-2 flex flex-1 justify-end items-center gap-2.5">
      <Image
        src="/userBlock/avatar.png"
        alt="Ваш профиль"
        width={40}
        height={40}
        className="min-w-10 min-h-10"
      />
      <p className="hidden xl:block cursor-pointer p-2.5">{userName}</p>
      <button className="hidden xl:block cursor-pointer p-2">
        <Image
          src="/iconsAuth/iconsArrow-left.svg"
          alt="Меню профиля"
          width={24}
          height={24}
          sizes="24px"
        />
      </button>
    </div>
  );
};

export default Profile;