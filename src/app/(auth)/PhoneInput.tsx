"use client";

import { ChangeEvent } from "react";
import { formStyles } from "./styles";
import { InputMask } from "@react-input/mask";

interface PhoneInputProps {
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput = ({ value, onChangeAction }: PhoneInputProps) => {
  return (
    <div>
      <label htmlFor="phoneNumber" className={formStyles.label}>
        Телефон
      </label>
      <InputMask
        mask="+3(____) ___-__-__"
        replacement={{ _: /\d/ }}
        id="phoneNumber"
        type="text"
        value={value}
        placeholder="+3(____) ___-__-__"
        onChange={onChangeAction}
        className={formStyles.input}
        showMask={true}
        onFocus={(e) => {
          if (e.target.value === "+3") {
            e.target.setSelectionRange(2, 2);
          }
        }}
      />
    </div>
  );
};

export default PhoneInput;