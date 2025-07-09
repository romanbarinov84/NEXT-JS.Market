import { ButtonSearch } from "./ButtonSearch";
import { InputBlock } from "./inputSearch/InputBlock";

export function SearchBlock({
  onFocusChangeAction,
}: {
  onFocusChangeAction: (focused: boolean) => void;
}) {
  return (
    <div className="flex flex-grow gap-4 flex-row items-center">
      <ButtonSearch />

      <InputBlock onFocusChangeAction={onFocusChangeAction} />
      <div></div>
    </div>
  );
}
