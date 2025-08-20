import Image from "next/image";
import Link from "next/link";

export default function Profile() {
 const user = false;

 if(!user){
  return <Link href="Login" className="ml-6 w-10 xl:w-[137px] flex justify-between items-center gap-x-2 p-2 rounded text-white text-base bg-[#ff6633] hover:shadow-(--shadow-article) 
    active:shadow-(--shadow-button-active) duration-300">
    <div>
      <p>Вхід</p>
    </div>
    <Image 
    src="/EnterImgButton.svg" 
    alt="Увійти"
    width={24}
    height={24}/>
  </Link>
 }
  return (
    <div className="ml-14 p-2 flex flex-1 justify-end items-center gap-3">
      <div className="relative w-12 h-12">
        <Image
          src="/userBlock/avatar.png"
          alt="Avatar"
          fill
          sizes="44px"
          className="object-contain"
        />
      </div>
      <p className="hidden xl:block cursor-pointer p-2">User</p>
      <button className="hidden xl:block cursor-pointer">
        <div className="relative w-4 h-3">
          <Image 
          src="/userBlock/ShevronArrowDown.svg" 
          alt="ShevronArrow" 
           fill
          sizes="24px"
          className="object-contain"/>
        </div>
      </button>
    </div>
  );
}
