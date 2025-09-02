
import Image from "next/image"
import { getAvatarByGender } from "../../../../utils/getAvatarByGender"
import { useState } from "react"

const ProfileAvatar = ({gender}:{gender:string}) => {
    const [currentAvatar,setCurrentAvatar] = useState<string>("");

    const getDisplayAvatar = () => {
        return  currentAvatar ||  getAvatarByGender(gender);
    }

    const handleImageError = (e:React.SyntheticEvent<HTMLImageElement,Event>) => {
     const target = e.target as HTMLImageElement;
     target.src = getAvatarByGender(gender)
    }
  return (
    <div className="flex flex-col items-center mb-8">
        <div className="relative">
            <Image 
             src={getDisplayAvatar()}
              width={128}
              height={128}
              alt="avatar-Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              onError = {handleImageError}
              priority
              />
         <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-green-600 duration-300">
            <input 
            type="file" 
             className="hidden"
             accept="image/jpeg,image/png,image/webp,image/gif"
             />
            <IconAvatarChange/>
         </label>
        </div>
    </div>
  )
}

export default ProfileAvatar