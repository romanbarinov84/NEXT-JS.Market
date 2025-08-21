import { ChangeEvent } from "react";
import { formStyles } from "../styles";

interface PersonInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonInput({
  id,
  label,
  value,
  onChange,
}: PersonInputProps) {
  return (
    <>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className={formStyles.input}
      />
      
    </>
  );
}
