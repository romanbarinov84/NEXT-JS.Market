"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import PersonInput from "../PersonInput";

import DataInput from "../DataInput";
import SelectRegion from "../SelectRegion";
import SelectCity from "../SelectCity";
import GenderSelect from "../GenderSelect";
import CardInput from "../CardInput";
import CheckBoxCard from "../CheckBoxCard";
import EmailInput from "../EmailInput";
import RegFormFooter from "../RegFormFooter";
import { validateRegisterForm } from "../../../../../utils/validatons/form";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import SuccessModal from "../SuccessModal";
import PhoneInput from "../../PhoneInput";
import PasswordInput from "../../PasswordInput";

const initialFormData = {
  phone: "+3",
  surname: "",
  firstName: "",
  password: "",
  confirmPassword: "",
  birthdayDate: "",
  region: "",
  location: "",
  gender: "",
  card: "",
  email: "",
  hasCard: false,
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFormMessage, setInvalidFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    if (invalidFormMessage) {
      setInvalidFormMessage("");
    }

    if (id === "hasCard" && value === true) {
      setFormData((prev) => ({
        ...prev,
        hasCard: true,
        card: "",
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInvalidFormMessage("");

    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setInvalidFormMessage(
        validation.errorMessage || "Заполните поля коректно"
      );
      setIsLoading(false);
      return;
    }
    setIsSuccess(true);
    try {
      const [day, month, year] = formData.birthdayDate.split(".");
      const formattedBirthdayDate = new Date(`${year}:${month}:${day}`);
      const userData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
        birthdayDate: formattedBirthdayDate,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка регистрации");
      }
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Ошибка регистрации попробуйте снова",
      });
    } finally {
      setIsLoading(false);
    }
  };
  //
  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
    );

  if (isSuccess) {
    return <SuccessModal />;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#fcd5bacc] min-h-screen text-[#414141]">
      <div className="bg-white rounded shadow-(--shadow-auth-form) w-full max-w-[687px] max-h-[100vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-[#f3f2f1] rounded duration-300 cursor-pointer mb-8"
            aria-label="Закрыть"
          >
            <Image src="/X_SVG.svg" width={24} height={24} alt="Закрыть" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-10">Регистрация</h1>
        <h2 className="text-lg font-bold text-center mb-6">
          Обязательные поля
        </h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full max-w-[552px] mx-auto max-h-100vh flex flex-col justify-center overflow-y-auto"
        >
          <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex flex-col gap-y-4 items-start">
              <PhoneInput
                value={formData.phone}
                onChangeAction={handleChange}
              />
              <PersonInput
                id="surname"
                label="Фамилия"
                value={formData.surname}
                onChange={handleChange}
              />
              <PersonInput
                id="firstName"
                label="Имя"
                value={formData.firstName}
                onChange={handleChange}
              />
              <PasswordInput
                id="password"
                label="Пароль"
                value={formData.password}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword(!showPassword)
                }
                showRequirements={true}
              />
              <PasswordInput
                id="confirmPassword"
                label="Подтвердите пароль"
                value={formData.confirmPassword}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword(!showPassword)
                }
                compareWidth={formData.password}
              />
            </div>
            <div className="flex flex-col gap-y-4 items-start">
              <DataInput
                id="birthdayDate"
                value={formData.birthdayDate}
                onChangeAction={(value) =>
                  setFormData((prev) => ({ ...prev, birthdayDate: value }))
                }
              />
              <SelectRegion
                value={formData.region}
                onChangeAction={handleChange}
              />
              <SelectCity
                value={formData.region}
                onChangeAction={handleChange}
              />
              <GenderSelect
                value={formData.gender}
                onChangeAction={(gender) =>
                  setFormData((prev) => ({ ...prev, gender }))
                }
              />
            </div>
          </div>
          <h2 className="text-lg font-bold text-center mb-6 mt-10">
            Необовязкові поля
          </h2>
          <div className="w-full flex flex-row  flex-wrap gap-x-8 gap-y-4">
            <div className="flex flex-col w-65 gap-y-4">
              <CardInput
                value={formData.card}
                onChangeAction={handleChange}
                disabled={formData.hasCard}
              />
              <CheckBoxCard
                checked={formData.hasCard}
                onChangeAction={handleChange}
              />
            </div>
            <EmailInput value={formData.email} onChangeAction={handleChange} />
          </div>
          {invalidFormMessage && (
            <div className="text-red-500 text-center font-bold">
              {invalidFormMessage}
            </div>
          )}
          <RegFormFooter
            isFormValid={validateRegisterForm(formData).isValid}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
