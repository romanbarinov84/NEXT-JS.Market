"use client";

import { useEffect, useState } from "react";
import PersonInput from "../_components/PersonInput";
import DataInput from "../_components/DataInput";
import SelectRegion from "../_components/SelectRegion";
import SelectCity from "../_components/SelectCity";
import GenderSelect from "../_components/GenderSelect";
import CardInput from "../_components/CardInput";
import CheckBoxCard from "../_components/CheckBoxCard";
import EmailInput from "../_components/EmailInput";
import RegFormFooter from "../_components/RegFormFooter";
import { validateRegisterForm } from "../../../../../utils/validatons/form";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import PhoneInput from "../../PhoneInput";
import PasswordInput from "../../PasswordInput";
import { initialRegFormData } from "@/constance/RegFormData";
import { RegFormDataProps } from "@/types/regFormData";
import AuthFormLayout from "../../_components/AuthFormLayout";
import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { useRouter } from "next/navigation";
import VerificationMethodModal from "../_components/VerificationMethodModal";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [registerForm, setRegisterForm] =
    useState<RegFormDataProps>(initialRegFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFormMessage, setInvalidFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { setRegFormData } = useRegFormContext();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && !registerForm.email) {
      router.replace("/verify/verify-phone");
    }
  }, [isSuccess, registerForm.email, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    if (invalidFormMessage) {
      setInvalidFormMessage("");
    }

    if (id === "hasCard" && value === true) {
      setRegisterForm((prev) => ({
        ...prev,
        hasCard: true,
        card: "",
      }));
      return;
    }
    setRegisterForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInvalidFormMessage("");

    const validation = validateRegisterForm(registerForm);
    if (!validation.isValid) {
      setInvalidFormMessage(
        validation.errorMessage || "Заполните поля коректно"
      );
      setIsLoading(false);
      return;
    }
    setIsSuccess(true);
    try {
      const [day, month, year] = registerForm.birthdayDate.split(".");
      const formattedBirthdayDate = new Date(`${year}:${month}:${day}`);
      const userData = {
        ...registerForm,
        phoneNumber: registerForm.phoneNumber.replace(/\D/g, ""),
        birthdayDate: formattedBirthdayDate.toISOString(),
      };

      setRegFormData(userData);

      setIsSuccess(true);
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

  if (isSuccess && registerForm.email) {
    return <VerificationMethodModal />;
  }

  return (
    <AuthFormLayout variant="register">
      <h1 className="text-2xl font-bold text-center mb-10">Регистрация</h1>
      <h2 className="text-lg font-bold text-center mb-6">Обязательные поля</h2>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-[552px] mx-auto max-h-100vh flex flex-col justify-center overflow-y-auto"
      >
        <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
          <div className="flex flex-col gap-y-4 items-start">
            <PhoneInput
              value={registerForm.phoneNumber}
              onChangeAction={handleChange}
            />
            <PersonInput
              id="surName"
              label="Фамилия"
              value={registerForm.surName}
              onChange={handleChange}
            />
            <PersonInput
              id="name"
              label="Имя"
              value={registerForm.name}
              onChange={handleChange}
            />
            <PasswordInput
              id="password"
              label="Пароль"
              value={registerForm.password}
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
              value={registerForm.confirmPassword}
              onChangeAction={handleChange}
              showPassword={showPassword}
              togglePasswordVisibilityAction={() =>
                setShowPassword(!showPassword)
              }
              compareWith={registerForm.password}
            />
          </div>
          <div className="flex flex-col gap-y-4 items-start">
            <DataInput
              id="birthdayDate"
              value={registerForm.birthdayDate}
              onChangeAction={(value) =>
                setRegisterForm((prev) => ({ ...prev, birthdayDate: value }))
              }
            />
            <SelectRegion
              value={registerForm.region}
              onChangeAction={handleChange}
            />
            <SelectCity
              value={registerForm.city}
              onChangeAction={handleChange}
            />
            <GenderSelect
              value={registerForm.gender}
              onChangeAction={(gender) =>
                setRegisterForm((prev) => ({ ...prev, gender }))
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
              value={registerForm.card}
              onChangeAction={handleChange}
              disabled={!!registerForm.hasCard}
            />
            <CheckBoxCard
              checked={registerForm.hasCard}
              onChangeAction={handleChange}
            />
          </div>
          <EmailInput
            value={registerForm.email}
            onChangeAction={handleChange}
          />
        </div>
        {invalidFormMessage && (
          <div className="text-red-500 text-center font-bold">
            {invalidFormMessage}
          </div>
        )}
        <RegFormFooter
          isFormValid={validateRegisterForm(registerForm).isValid}
          isLoading={isLoading}
        />
      </form>
    </AuthFormLayout>
  );
};

export default RegisterPage;
