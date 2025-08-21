"use client";

import { ChangeEvent } from "react";
import { formStyles } from "../styles";
import IconVision from "@/components/IconVision";
import Tooltip from "./ToolTip";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibilityAction: () => void;
  showRequirements?: boolean;
  compareWidth?: string;
}

const PasswordInput = ({
  id,
  label,
  value,
  onChangeAction,
  showPassword,
  togglePasswordVisibilityAction,
  showRequirements,
  compareWidth,
}: PasswordInputProps) => {
  const isPasswordValid = () => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/.test(value);
  };

  //Функция для подсказки подходит ли пароль

  const shouldShowToolTip = () => {
    if (showRequirements) {
      return value.length > 0 && !isPasswordValid();
    }
    if (compareWidth) {
      return (
        value.length > 0 && compareWidth.length > 0 && value !== compareWidth
      );
    }

    return false;
  };

  const getToolTipText = () => {
    if (showRequirements) {
      return "Пароль: больше 8 символов, 1 строчная, 1 заглавная, 1 цифра";
    }
    return "Пароли не совпадают";
  };

  return (
    <div className="relative">
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChangeAction}
          className={formStyles.input}
          autoComplete="off"
          readOnly
          onFocus={(e) => e.target.removeAttribute("readOnly")}
        />
        
        <button
          type="button"
          onClick={togglePasswordVisibilityAction}
          className="absolute right-3 top-5 transform -translate-y-1/2"
        >
          <IconVision showPassword={showPassword} />
        </button>
      </div>
      {shouldShowToolTip() && <Tooltip text={getToolTipText()} />}
    </div>
  );
};

export default PasswordInput;
