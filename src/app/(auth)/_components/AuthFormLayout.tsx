import CloseButton from "./CloseButton";

type AuthFormVariant = "register" | "default";

const AuthFormLayout = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: AuthFormVariant;
}) => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-[rgba(245,244,243,0.8)] min-h-screen text-[#414141] py-10 px-3 backdrop-blur-s">
      <div
        className={`${
          variant === "register" ? "max-w-[687px]" : "max-w-[105px]"
        } bg-[#f4f4f8]  rounded shadow-[var(--shadow-auth-form)] w-full max-h-[calc(100vh-60px)] 
          flex flex-col px-6`}
      >
        <CloseButton />

        <div className="pt-18 pb-10 px-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormLayout;
