import { ChangeEventHandler } from "react";
import useDebounce from "src/hooks/useDebounce";
import { Input } from "./Inputs";
import SearchIcon from "./icons/Search";

type Props = {
  onSearch: (query: string) => void;
  timer?: number;
};

const SearchBar = ({ onSearch, timer = 300 }: Props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    onSearch(e.target.value);
  };

  const { debounce } = useDebounce(onChange, timer);

  return (
    <div className="relative">
      <Input onChange={debounce} />
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
