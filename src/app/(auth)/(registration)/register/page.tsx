"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PhoneInput from "../PhoneInput";
import PersonInput from "../PersonInput";

const initialFormData = {
  phone: "+380",
  surname: "",
  firstName: "",
  password: "",
  confirmPassword: "",
  birthdayDate: "",
  region: "",
  location: "",
  gender: "",
  card: "",
  hasCard: false,
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);

  const router = useRouter();

  const handleClose = () => {
    setFormData(initialFormData);
    router.back();
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {id,type} = e.target;
    setFormData((prev) => ({...prev,[id]:value}))
    const value = e.target.value
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-[rgba(179,175,174,0.8)] min-h-screen text-[#414141]">
      <div
        className="bg-white rounded shadow-[var(--shadow-auth-form)] 
             w-full max-w-[568px] max-h-[100vh] overflow-y-auto"
      >
        <div className="flex justify-end">
          <button
            className="rounded duration-300 cursor-pointer mb-8 "
            aria-label="Закрыть"
            title="Закрыть"
            onClick={handleClose}
          >
            <Image
              src="/X_SVG.svg"
              alt="Закрыть окно"
              width={24}
              height={24}
              className="bg-white"
            />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-10">Регістрація</h1>
        <h2 className="text-lg font-bold text-center mb-6">Обовязкові поля</h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full max-w-[572px] mx-auto max-h-100vh flex flex-col justify-center overflow-y-auto"
        >
          <div className="w-full flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex flex-col gap-y-4 items-start">
              <PhoneInput value={formData.phone} onChangeAction={handleChange}/> 
              <PersonInput 
              id="surname" 
              label="Фамилия" 
              value={formData.surname} 
              onChange={handleChange}
              />
              <PersonInput 
              id="firstname" 
              label="Имя" 
              value={formData.firstName} 
              onChange={handleChange}
              />
              Surname Password currentPassword
            </div>
            <div className="flex flex-col gap-y-4 items-start">
              birthDay local City Gender
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
