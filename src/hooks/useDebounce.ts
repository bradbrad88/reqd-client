import { useRef } from "react";

type TimeoutType = ReturnType<typeof setTimeout>;

const useDebounce = <T>(onDebounce: (value: T) => void, timer: number) => {
  const debounceRef = useRef<TimeoutType>();

  const debounce = (value: T) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onDebounce(value);
    }, timer);
  };

  return {
    debounce,
  };
};

export default useDebounce;
