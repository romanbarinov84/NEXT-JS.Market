

export interface SearchInputProps {
    handleSearch:()=>void,
    query:string,
    handleInputFocus:()=>void,
    handleInputBlur:()=>void,
    setQuery:(value:string) =>void;
}