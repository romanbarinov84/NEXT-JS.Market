import { HeaderUserBlock } from "./HeaderUserBlock";
import { LogoBlock } from "./LogoBlock";
import { SearchBlock } from "./SearchBlock";

export function Header(){

    return(
        <div style={{display:"flex",justifyContent:"space-between",gap:"50px"}}>
            <LogoBlock/>
            <SearchBlock/>
            <HeaderUserBlock/>
        </div>
    )
}