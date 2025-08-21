"use client";

import { ChangeEvent, useState } from "react";
import { formStyles } from "../../styles";
import Tooltip from "../ToolTip";
import { validateBirthDate } from "../../../../../utils/validatons/validateBirthDate";

interface dateInputProps {
  id: string;
  value: string;
  onChangeAction: (value: string) => void;
}

const DataInput = ({ id, value, onChangeAction }: dateInputProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");
    let formatted = "";
    if (cleaned.length > 0) formatted = cleaned.slice(0, 2);
    if (cleaned.length > 2) formatted += "." + cleaned.slice(2, 4);
    if (cleaned.length > 4) formatted += "." + cleaned.slice(4, 8);

    return formatted;
  };

  const handleDateChange = (formattedDate: string) => {
    const validation = validateBirthDate(formattedDate);
    setError(validation.error || null);
    setShowToolTip(!!validation.error);
    onChangeAction(formattedDate);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);

    handleDateChange(formatted);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className={formStyles.label}>
        Дата рождения
      </label>
      <div>
        <input
          id={id}
          value={value}
          type="text"
          onChange={handleInputChange}
          placeholder="__.__.____"
          className={`${formStyles.input} pr-8`}
          max-length={10}
          onFocus={() => setShowToolTip(true)}
          onBlur={() => setShowToolTip(false)}
        />
      </div>
      {showToolTip && error && <Tooltip text={error} />}
    </div>
  );
};

export default DataInput;
