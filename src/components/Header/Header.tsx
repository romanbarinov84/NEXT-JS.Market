
import { LogoBlock } from "./LogoBlock";
import { SearchBlock } from "./SearchBlock";
import { UserBlock } from "./UserBlock";


export function Header(){

    return(
        <header className="bg-white w-full relative z-10 text-2xl rounded-2xl flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap:10 justify-between p-10 mb-12 md:shadow-(--shadow-default)">
            <div className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-(--shadow-default) md:shadow-none">
            <LogoBlock/>
            <SearchBlock/>  
            </div>
          
            <nav aria-label="Main menu" className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow-(--shadow-default) md:shadow-none">
              <UserBlock/>   
            </nav>
              
        </header>
    )
}