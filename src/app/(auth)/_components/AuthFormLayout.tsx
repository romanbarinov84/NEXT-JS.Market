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
    <div className="absolute inset-0 z-100 flex items-center justify-center bg-[#fcd5bacc] min-h-screen text-[#414141] py-10 px-3 backdrop-blur-sm">
      <div
        className={`${variant === "register" ? "max-w-[687px]" : "max-w-105"} relative bg-white rounded shadow-(--shadow-auth-form) max-h-[calc(100vh-80px)] w-full flex flex-col px-6`}
      >
        <div className="pt-18 pb-10 px-4 overflow-y-auto flex-1">
          <CloseButton />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormLayout;
