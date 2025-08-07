import ButtonSearch from "./ButtonSearch";
import InputBlock from "./inputSearch/InputBlock";

export default function SearchBlock({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) {
  return (
    <div>
      <div className="flex flex-row gap-4 flex-grow">
        <ButtonSearch />
        <InputBlock onFocusChangeAction={onFocusChangeAction} />
      </div>
    </div>
  );
}
