
import ButtonSearch from "./ButtonSearch";
import InputBlock from "./InputBlock";

export default function SearchBlock() {
  return (
    <div>
      <div className="flex flex-row gap-4 flex-grow">
       <ButtonSearch/>
       <InputBlock/>
      </div>
    </div>
  );
}
