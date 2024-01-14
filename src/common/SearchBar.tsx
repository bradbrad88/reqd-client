import { ChangeEventHandler, useId } from "react";
import useDebounce from "src/hooks/useDebounce";
import { Input } from "./Inputs";
import SearchIcon from "./icons/Search";

type Props = {
  onSearch: (query: string) => void;
  timer?: number;
  autoFocus?: boolean;
  id?: string;
};

const SearchBar = ({ onSearch, timer = 300, autoFocus = false, id }: Props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    onSearch(e.target.value);
  };

  const generatedId = useId();

  const { debounce } = useDebounce(onChange, timer);

  return (
    <div className="relative w-full">
      <Input id={id || generatedId} onChange={debounce} autoFocus={autoFocus} tabIndex={0} />
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
