import Image from "next/image"
import UserAvatar from "/public/icons/TopMenu-icons/avatar.png"


export function Profile(){

    return(
        <div className="flex flex-1  ml-6 p-4 justify-end items-center  ">
          <Image src={UserAvatar} alt="AvatarLogo" width={30} height={30} className="min-w-10 min-h-10 hidden xl:block"/>
          <p className="hidden xl:block">Олексій</p>
          <button>
           
          </button>
        </div>
    )
}