import Image from "next/image";
import { getAvatarByGender } from "../../../../utils/getAvatarByGender";
import { useRef, useState } from "react";
import IconAvatarChange from "@/components/IconAvatarChange";
import { useAuthStore } from "../../../../store/authStore";
import ConfirmAvatarModal from "./ConfirmAvatarModal";
import useAvatar from "../../../../hooks/useAvatar";

const ProfileAvatar = ({ gender }: { gender: string }) => {
  const { user } = useAuthStore();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const {displayAvatar,isLoading:isUploading,uploadAvatar} = useAvatar({userId: user?.id,gender})





  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = getAvatarByGender(gender);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const previewUrl = event.target.result as string;
        setPreviewUrl(previewUrl);
        setPendingFile(file);
        setShowConfirmModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

 

  

  const handleAvatarConfirm = async () => {
    if (pendingFile) {
      setShowConfirmModal(false);

      try {
        //функция загрузки аватара в БД

        await uploadAvatar(pendingFile);
        if(previewUrl && previewUrl.startsWith("blob:")){
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl("");
      } catch (error) {
        console.error("", error);
        alert(error instanceof Error ? error.message : "Ошибка загрузки");
        setPreviewUrl("");
      } finally {
        setPendingFile(null);
      }
    }
  };

  const handleAvatarCancel = () => {
    setShowConfirmModal(false);
    setPendingFile(null);
    if(previewUrl && previewUrl.startsWith("blob:")){
          URL.revokeObjectURL(previewUrl);
        }
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <Image
          src={displayAvatar}
          width={128}
          height={128}
          alt="avatar-Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          onError={handleImageError}
          priority
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-green-600 duration-300">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileInputChange}
          />
          <IconAvatarChange />
        </label>
        {showConfirmModal && (
          <ConfirmAvatarModal
            isOpen={showConfirmModal}
            previewUrl={previewUrl}
            isUploading={isUploading}
            onConfirm={handleAvatarConfirm}
            onCancel={handleAvatarCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
