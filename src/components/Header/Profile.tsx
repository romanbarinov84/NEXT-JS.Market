import Image from "next/image"
import UserAvatar from "/public/icons/TopMenu-icons/avatar.png"
import Shevron from "/public/icons/TopMenu-icons/chevron-down.svg"

export function Profile(){

    return(
        <div className="flex flex-1  gap-2.5 ml-6 p-4 justify-end items-center  ">
          <Image src={UserAvatar} alt="AvatarLogo" width={50} height={50} className="min-w-10 min-h-10 hidden xl:block"/>
          <p className="hidden xl:block">Олексій</p>
          <button>
            <Image src={Shevron} alt="ShevronDown" width={28} height={28} className="hidden 2xl:block cursor-pointer"/>
          </button>
        </div>
    )
}