import { Profile } from "./Profile";
import { TopMenu } from "./TopMenu";



export function UserBlock(){

    return(
        
        <div className="fixed bottom-0 left-0 right-0 h-14 md:static md:h-auto w-full max-w-full overflow-x-hidden flex flex-row justify-between items-center px-1 py-1 [box-shadow:var(--shadow-default)] md:shadow-none text-[8px] md:text-[12px] bg-transparent z-50">
            
            <TopMenu/>
            <Profile/>
        </div>
    )
}