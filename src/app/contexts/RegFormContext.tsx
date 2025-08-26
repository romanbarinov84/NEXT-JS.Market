"use client"

import { initialRegFormData } from "@/constance/RegFormData"
import { RegFormDataProps } from "@/types/regFormData";
import { createContext, ReactNode, useContext, useState } from "react"

type RegFormContextType = {
    regFormData:RegFormDataProps;
    setRegFormData:React.Dispatch<React.SetStateAction<RegFormDataProps>>;
    resetRegForm:() => void;
};

const RegFormContext = createContext<RegFormContextType>({
    regFormData:initialRegFormData,
    setRegFormData:() => {},
    resetRegForm:() => {},
}) ;

export const RegFormProvider = ({children} : {children: ReactNode}) => {
   const [regFormData,setRegFormData] = useState<RegFormDataProps>(initialRegFormData)

   const resetRegForm = () => {
    setRegFormData(initialRegFormData)
};




return (
    <RegFormContext.Provider value={{regFormData,setRegFormData,resetRegForm}}>
        {children}
    </RegFormContext.Provider>
)
};
export const useRegFormContext = () => useContext(RegFormContext)
