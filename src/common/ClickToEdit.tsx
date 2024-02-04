import { useCallback, useId, useRef, useState } from "react";
import useKeyboardSaveOrEscape from "src/hooks/useKeyboardSaveOrEscape";
import useShortcuts from "src/hooks/useShortcuts";
import Label from "./Label";
import Input from "./Input";
import { TickIcon } from "./icons";
import DisplayEditable from "./DisplayEditable";

type Props = {
  label: string;
  value: string;
  onSave: (value: string) => void;
  isWorking?: boolean;
};

const ClickToEdit = ({ label, value, onSave, isWorking }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();

  const close = () => {
    setEditMode(false);
  };

  const onBlur = () => {
    setTimeout(() => {
      setInputValue(value);
      close();
    }, 0);
  };

  const cb = useCallback(() => {
    onSave(inputValue);
  }, [onSave, inputValue]);

  useShortcuts("Tab", cb, ref);
  useKeyboardSaveOrEscape(cb, close, ref);

  return (
    <div>
      <Label htmlFor={id} className="text-base">
        {label}
      </Label>
      {editMode ? (
        <div className="relative">
          <Input
            ref={ref}
            id={id}
            autoFocus
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onBlur={onBlur}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border-zinc-200 border-2"
            onClick={cb}
          >
            <TickIcon fill="white" size={24} />
          </span>
        </div>
      ) : (
        <DisplayEditable
          onClick={() => setEditMode(true)}
          text={value}
          isWorking={isWorking}
        />
      )}
    </div>
  );
};

export default ClickToEdit;
