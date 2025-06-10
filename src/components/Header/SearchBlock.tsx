
import { ButtonSearch } from "./ButtonSearch";
import { InputBlock } from "./InputBlock";

export function SearchBlock() {
  return (
    <div className="flex flex-grow gap-4 flex-row items-center">
       <ButtonSearch/>
      <div >
       <InputBlock/>
       
      </div>
    </div>
  );
}
