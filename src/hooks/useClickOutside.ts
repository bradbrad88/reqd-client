import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, cb: () => void) => {
  useEffect(() => {
    const element = ref.current;
    const onClick = (event: MouseEvent) => {
      if (!element) return;
      if (element.contains(event.target as HTMLDivElement)) return;
      cb();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [cb, ref]);
};

export default useClickOutside;
