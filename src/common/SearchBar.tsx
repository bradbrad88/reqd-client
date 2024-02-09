import { ChangeEventHandler, useId } from "react";
import useDebounce from "src/hooks/useDebounce";
import { Input } from "./Inputs";
import { SearchIcon } from "./icons";

type Props = {
  onSearch: (query: string) => void;
  timer?: number;
  autoFocus?: boolean;
  id?: string;
  placeholder?: string;
};

const SearchBar = ({
  onSearch,
  timer = 300,
  autoFocus = false,
  placeholder = "",
  id,
}: Props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    onSearch(e.target.value);
  };

  const generatedId = useId();

  const { debounce } = useDebounce(onChange, timer);

  return (
    <div className="relative w-full">
      <Input
        id={id || generatedId}
        onChange={debounce}
        autoFocus={autoFocus}
        tabIndex={0}
        type="text"
        placeholder={placeholder}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <SearchIcon size={30} className="fill-zinc-500" />
      </span>
    </div>
  );
};

export default SearchBar;
