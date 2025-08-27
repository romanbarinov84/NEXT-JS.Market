"use client";


import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useRef, useState } from "react";

import { MailWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorContent } from "../../_components/ErrorContent";
import { SuccessSent } from "../../_components/SuccessSent";
import AuthFormLayout from "@/app/(auth)/_components/AuthFormLayout";
import { LoadingContent } from "../../_components/LoadingContant";

export default function VerifyEmailPage() {
  const { regFormData } = useRegFormContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const hasSentInitialRequest = useRef(false);
  const router = useRouter();

  const verifyAccount = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);

    if (!regFormData.email) {
      throw new Error("Email обязателен для верификации");
    }

    // Вызов signUp
    const response = await authClient.signUp.email(
      {
        ...regFormData,
        email: regFormData.email,
        callbackURL: "/verify/verify-success",
      },
      {
        onSuccess: () => {
          setVerificationSent(true);
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log("onError ctx:", ctx); // <--- выводим весь контекст ошибки
          setIsLoading(false);
          setVerificationSent(false);

          const errorMessage = ctx.error?.message || JSON.stringify(ctx) || "Неизвестная ошибка";

          if (errorMessage.includes("already exists")) {
            setError("Пользователь с таким email уже существует");
          } else {
            setError(errorMessage);
          }
        },
      }
    );

    console.log("signUp response:", response); // <--- выводим весь ответ от сервера
  } catch (err) {
    console.log("catch error:", err); // <--- выводим ошибку из catch
    setIsLoading(false);
    setVerificationSent(false);
    setError(err instanceof Error ? err.message : JSON.stringify(err));
  }
}, [regFormData]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && regFormData.email) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [verifyAccount, regFormData.email]);

  const handleToLogin = () => router.replace("/login");
  const handleResend = () => {
    verifyAccount();
  };

  return (
    <AuthFormLayout>
      {isLoading ? (
        <LoadingContent title="письма" />
      ) : error ? (
        <ErrorContent
          error={error}
          icon={<MailWarning className="h-8 w-8 text-red-600" />}
          primaryAction={{ label: "Войти", onClick: handleToLogin }}
          secondaryAction={{
            label: "Попробовать снова",
            onClick: handleResend,
          }}
        />
      ) : verificationSent ? (
        <SuccessSent />
      ) : null}
    </AuthFormLayout>
  );
}