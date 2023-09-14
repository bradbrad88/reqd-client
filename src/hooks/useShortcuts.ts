import { RefObject, useCallback, useEffect } from "react";

const useShortcuts = (key: string, cb: () => void, ref: RefObject<HTMLElement>) => {
  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== key) return;
      if (ref.current?.contains(event.target as Node)) cb();
    },
    [key, cb, ref]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [key, onKeydown]);

  return { onKeydown };
};

export default useShortcuts;
