import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, cb: () => void) => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(event.target as HTMLDivElement)) return;
      cb();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [cb, ref]);
};

export default useClickOutside;
