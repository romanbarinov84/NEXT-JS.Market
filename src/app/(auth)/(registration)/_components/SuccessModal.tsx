import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthFormLayout from "../../_components/AuthFormLayout";

const SuccessModal = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <AuthFormLayout variant="register">
      <h2 className="text-2xl font-bold text-(--color-primary) mb-4">
        Регистрация успешная
      </h2>
      <p className="text-base text-[#d45c11] ">Ожидайте ......</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-(--color-primary) h-2.5 
          rounded-full animate-[progress_3s_linear]"
          style={{ animationFillMode: "forwards" }}
        ></div>
      </div>
    </AuthFormLayout>
  );
};

export default SuccessModal;
