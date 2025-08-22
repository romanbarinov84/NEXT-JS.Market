"use client";

import { ChangeEvent } from "react";
import Image from "next/image";

interface CheckBoxProps {
  checked: boolean;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxCard = ({ checked, onChangeAction }: CheckBoxProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="hasCard"
        className="inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="hasCard"
          checked={checked}
          onChange={onChangeAction}
          className="absolute opacity-0 h-0 w-0"
        />
        <span className={`relative w-5 h-5 border rounded flex items-center justify-center duration-300  ${checked} ? "bg-(--color-primary) border-(--color-primary)" : "bg-white border-[#bfbfbf]"`}>
            {checked && (
              <Image 
              src="/iconsAuth/checkBox-checked.svg" 
              alt={checked ? "есть карта" : "нет карты"}
              width={20}
              height={20}
              className="text-white bg-(--color-primary) border border-black"/>
            )}
        </span>
        <span className="ml-2 text-[#f8f8f8]">{"В мене немає карти лояльності"}</span>
      </label>
    </div>
  );
};

export default CheckBoxCard;
