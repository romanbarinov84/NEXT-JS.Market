import Image from "next/image";
import { getAvatarByGender } from "../../../../utils/getAvatarByGender";
import { useRef, useState } from "react";
import IconAvatarChange from "@/components/IconAvatarChange";
import { useAuthStore } from "../../../../store/authStore";
import ConfirmAvatarModal from "./ConfirmAvatarModal";

const ProfileAvatar = ({ gender }: { gender: string }) => {
  const { user, fetchUserData } = useAuthStore();
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userId = user?.id;

  const getDisplayAvatar = () => {
    return currentAvatar || getAvatarByGender(gender);
  };

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

  const loadAvatar = async () => {
    if (!userId) {
      setCurrentAvatar(getAvatarByGender(gender));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/auth/avatar/${userId}?t=${Date.now()}`
      );
      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 0) {
          const avatarUrl = URL.createObjectURL(blob);
          setCurrentAvatar(avatarUrl);
          return;
        }
      }

      setCurrentAvatar(getAvatarByGender(gender));
    } catch (error) {
      console.error("Error loading Avatar", error);
      setCurrentAvatar(getAvatarByGender(gender));
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!userId) {
      throw new Error("Нужен идентификатор пользователя");
    }
    if (!file.type.startsWith("image/")) {
      throw new Error("Пожалуйста выберите изображение");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Размер файла не должен превышать 5MB");
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);

      const response = await fetch("/api/auth/upload-avatar", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка загрузки");
      }

      await loadAvatar();

      await fetchUserData();

      return true;
    } catch (error) {
      console.error("Error uploading avatar", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
          src={getDisplayAvatar()}
          width={128}
          height={128}
          alt="avatar-Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          onError={handleImageError}
          priority
        />
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
            isUploading={isLoading}
            onConfirm={handleAvatarConfirm}
            onCancel={handleAvatarCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;
