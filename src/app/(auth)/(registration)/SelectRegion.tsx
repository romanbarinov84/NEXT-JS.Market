"use client"

import { ChangeEvent } from "react"
import { formStyles } from "../styles";
import { regions } from "../../../../data/regions";
import Image from "next/image";

interface SelectRegionProps {
    value:string,
    onChangeAction:(e:ChangeEvent<HTMLSelectElement>) => void;
   

}

const SelectRegion = ({value,onChangeAction}:SelectRegionProps) => {
  return (
    <div>
        <label htmlFor="region" className={formStyles.label}>
          Локація
        </label>
        <div className="relative">
            <select  id="region" value={value} onChange={onChangeAction} 
             className={`${formStyles.input} appearance-none pr-8 cursor-pointer mt-4 `}>
               {regions.map((region) => (
                <option key={region.value}>{region.label}</option>
               ))}
             </select>
             <div className="absolute right-2 top-1/2 transform -transform-y-1/3 pointer-events-none">
             <Image 
             src="/iconsAuth/arrow-Down.svg" 
             alt="Продивитись"
              width={20}
              height={20}/>
             
             </div>
        </div>
    </div>
  )
}

export default SelectRegion