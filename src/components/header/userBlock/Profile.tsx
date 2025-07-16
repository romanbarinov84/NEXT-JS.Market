import Image from "next/image";

export default function Profile() {
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
