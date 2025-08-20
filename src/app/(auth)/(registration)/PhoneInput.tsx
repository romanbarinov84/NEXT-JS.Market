"use client"

import { ChangeEvent } from "react";
import { formStyles } from "../styles";
import { InputMask } from "@react-input/mask";



interface PhoneInputProps {
    value:string;
    onChangeAction:(e:ChangeEvent<HTMLInputElement>) => void;
}

export default function PhoneInput({value,onChangeAction}:PhoneInputProps){

    return(
        <>
        <div>
            <label htmlFor="Phone" className={formStyles.label}>
                Телефон
            </label>
        <InputMask 
         mask="+380(__) ___-__-__"
         replacement={{_:/\d/}}
         id="phone"
         type="text"
         value={value}
         placeholder="+380(__) ___-__-__"
         onChange={onChangeAction} 
         className={formStyles.input}
         showMask={true}
          onFocus={(e)=>{
            if(e.target.value === "+3"){
                e.target.setSelectionRange(2,2)
            }
          }}/>
            </div>
        </>
    )
}