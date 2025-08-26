"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { formStyles } from "../../styles";
import { cities } from "../../../../../data/cities";

interface SelectCityProps {
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const SelectCity = ({ value, onChangeAction }: SelectCityProps) => {
  return (
    <div>
      <label htmlFor="region" className={formStyles.label}>
        Оберіть місто
      </label>
      <div className="relative">
        <select
          id="region"
          value={value}
          onChange={onChangeAction}
          className={`${formStyles.input} appearance-none pr-8 cursor-pointer mt-4 `}
        >
          {cities.map((city) => (
            <option key={city.value}>{city.label}</option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 transform -transform-y-1/3 pointer-events-none">
          <Image
            src="/iconsAuth/arrow-Down.svg"
            alt="Продивитись"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCity;
