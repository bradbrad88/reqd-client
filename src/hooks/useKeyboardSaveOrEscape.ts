import { useCallback } from "react";
import useShortcuts from "./useShortcuts";

const useKeyboardSaveOrEscape = (onSave: () => void, close: () => void) => {
  const onEnter = useCallback(() => {
    onSave();
    close();
  }, [onSave, close]);

  const onEscape = useCallback(() => {
    close();
  }, [close]);
  useShortcuts("Enter", onEnter);
  useShortcuts("Escape", onEscape);
};

export default useKeyboardSaveOrEscape;
