import { RefObject, useCallback } from "react";
import useShortcuts from "./useShortcuts";

const useKeyboardSaveOrEscape = (
  onSave: () => void,
  close: () => void,
  ref: RefObject<HTMLDivElement>
) => {
  const onEnter = useCallback(() => {
    onSave();
    close();
  }, [onSave, close]);

  const onEscape = useCallback(() => {
    close();
  }, [close]);
  useShortcuts("Enter", onEnter, ref);
  useShortcuts("Escape", onEscape, ref);
};

export default useKeyboardSaveOrEscape;
