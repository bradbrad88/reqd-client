import { useCallback, useEffect } from "react";

const useShortcuts = (key: string, cb: () => void) => {
  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== key) return;
      cb();
    },
    [key, cb]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [key, onKeydown]);

  return { onKeydown };
};

export default useShortcuts;
