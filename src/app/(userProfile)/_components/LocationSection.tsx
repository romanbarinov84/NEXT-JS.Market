import { profileStyles } from "@/app/(auth)/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { Edit } from "lucide-react";
import SelectCity from "@/app/(auth)/(registration)/_components/SelectCity";
import SelectRegion from "@/app/(auth)/(registration)/_components/SelectRegion";
import { useAuthStore } from "../../../../store/authStore";

interface ProfileFormData {
  region: string;
  city: string;
}

const LocationSection = () => {
  const { user, fetchUserData } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    region: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        region: user.region || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, region: e.target.value }));
    setIsEditing(true);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, city: e.target.value }));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      region: user?.region || "",
      city: user?.city || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    if (!formData.region || !formData.city) {
      alert("Выберите регион и город");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          region: formData.region,
          city: formData.city,
        }),
      });

      if (!response.ok) throw new Error("Ошибка сохранения");

      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Не удалось сохранить изменения");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h3 className={profileStyles.sectionTitle}>Местоположение</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={profileStyles.editButton}
          >
            <Edit className="h-4 w-4 mr-1" />
            Редактировать
          </button>
        ) : (
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={handleCancel} className={profileStyles.cancelButton}>
              Отмена
            </button>
            <button onClick={handleSave} className={profileStyles.saveButton}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectRegion
          value={formData.region}
          onChangeAction={handleRegionChange}
          className="w-full"
          disabled={!isEditing}
        />
        <SelectCity
          value={formData.city}
          onChangeAction={handleCityChange}
          className="w-full"
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default LocationSection;
