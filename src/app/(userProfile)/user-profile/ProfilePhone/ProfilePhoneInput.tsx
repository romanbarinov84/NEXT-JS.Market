import { formStyles, profileStyles } from "@/app/(auth)/styles";
import { InputMask } from "@react-input/mask";
import { Phone } from "lucide-react";
import { useMemo } from "react";

interface ProfilePhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PhoneInput = ({ value, onChange, disabled }: ProfilePhoneInputProps) => {
  const maskedValue = useMemo(() => {
    if (!value) return "";

    const cleanPhone = value.replace(/\D/g, ""); // только цифры
    let formatted = "+3";

    // код в скобках (4 цифры)
    if (cleanPhone.length > 1) {
      formatted += `(${cleanPhone.slice(1, 5)})`;
    }

    // дальше формат: XXX XX XX
    if (cleanPhone.length > 5) {
      formatted += ` ${cleanPhone.slice(5, 8)}`;
    }
    if (cleanPhone.length > 8) {
      formatted += ` ${cleanPhone.slice(8, 10)}`;
    }
    if (cleanPhone.length > 10) {
      formatted += ` ${cleanPhone.slice(10, 12)}`;
    }

    return formatted;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clean = e.target.value.replace(/\D/g, "");

    // добавляем "3" только один раз
    if (clean.length > 0 && !clean.startsWith("3")) {
      clean = "3" + clean;
    }

    // ограничиваем длину до 12 цифр
    if (clean.length <= 12) {
      onChange(clean);
    }
  };

  return (
    <div className={profileStyles.inputContainer}>
      <InputMask
        mask="+3(____) ___ __ __"
        replacement={{ _: /\d/ }}
        placeholder="+3(____) ___ __ __"
        value={maskedValue}
        onChange={handleChange}
        className={`${formStyles.input} [&&]:w-full disabled:cursor-not-allowed [&&]:disabled:bg-[#f3f2f1]`}
        disabled={disabled}
      />
      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default PhoneInput;
