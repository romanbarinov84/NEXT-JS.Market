"use client";

import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PhoneInput from "../../PhoneInput";
import PasswordInput from "../../PasswordInput";
import { buttonStyles, formStyles } from "../../styles";
import Link from "next/link";

const initialFormData = {
  phone: "+3",
  password: "",
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({
          phone: formData.phone.replace(/\D/g, ""),
          password: formData.password,
        }),
      });
        
       const data = await res.json();
      if (!res.ok) {
       
        throw new Error(data.error || "Ошибка авторизации");
      }
      
      router.replace("/");
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Ошибка авторизации попробуйте снова",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
    );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#fcd5bacc] min-h-screen text-[#414141]">
      <div className="bg-white rounded shadow-(--shadow-auth-form) w-full max-w-[420px] max-h-[100vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-[#f3f2f1] rounded duration-300 cursor-pointer mb-8"
            aria-label="Закрыть"
          >
            <Image src="/X_SVG.svg" width={24} height={24} alt="Закрыть" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-10">
          Особистий кабінет
        </h1>
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

              <PasswordInput
                id="password"
                label="Пароль"
                value={formData.password}
                onChangeAction={handleChange}
                showPassword={showPassword}
                togglePasswordVisibilityAction={() =>
                  setShowPassword(!showPassword)
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!(formData.phone && formData.password)}
            className={`${buttonStyles.base} 
            ${
              formData.phone && formData.password
                ? buttonStyles.active
                : buttonStyles.inactive
            } `}
          >
            Вхід
          </button>
          <div className="flex flex-row  flex-wrap mb-10 mx-auto text-xs gap-2">
            <Link href="/register" className={formStyles.loginLink}>
              Регістрація
            </Link>
            <Link href="/forgotPassword" className={formStyles.loginLink} >
              Забув пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
