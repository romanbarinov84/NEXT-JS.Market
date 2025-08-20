"use client"

import { ChangeEvent } from "react";
import { formStyles } from "../styles";



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
            </div>
        </>
    )
}