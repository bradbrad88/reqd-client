import React, { useCallback, useEffect, useRef, useState } from "react";
import useKeyboardSaveOrEscape from "src/hooks/useKeyboardSaveOrEscape";
import useShortcuts from "src/hooks/useShortcuts";

type InputProp = {
  onSave?: () => void;
  close?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

const commonClasses = "p-2 px-4 rounded-full focus-visible:outline-lime-400";

export const Input = ({
  onSave = () => {},
  close = () => {},
  ...htmlInputProps
}: InputProp) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.type !== "text") return;
    ref.current.selectionStart = 0;
    ref.current.selectionEnd = ref.current.value.length;
  }, []);

  useKeyboardSaveOrEscape(onSave, close, ref);

  return (
    <input
      ref={ref}
      {...htmlInputProps}
      className={commonClasses + " w-full " + htmlInputProps.className}
    />
  );
};

type SelectProps = {
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: SelectProps) => {
  return (
    <select {...props} className={commonClasses + " w-full " + props.className}>
      {props.children}
    </select>
  );
};

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => {
  return <input className={commonClasses} {...props} type="checkbox" />;
};

type ComboProps = {
  setSelectedOption: (value: string | null) => void;
  selectedOption: string | null;
  label?: string;
  options: {
    display: string;
    value: string;
  }[];
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Combo = ({
  selectedOption,
  setSelectedOption,
  options,
  label,
  ...inputProps
}: ComboProps) => {
  const [focused, setFocused] = useState(false);
  const [markForClose, setMarkForClose] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const selectedValue = options.find(option => option.value === selectedOption)?.value;
  const [query, setQuery] = useState("");

  const filteredOptions = sortFilterOptionsCurrentSelectionAtTop(
    options.filter(option => option.display.toLowerCase().includes(query.toLowerCase())),
    selectedValue
  );

  const setSelected = useCallback(
    (value: string) => {
      setSelectedOption(value);
      setMarkForClose(true);
      setQuery("");
    },
    [setSelectedOption, setMarkForClose, setQuery]
  );

  const onDownKey = useCallback(() => {
    if (filteredOptions.length < 1) return;
    setMarkForClose(false);
    if (!activeOption) {
      const option = filteredOptions[0];
      if (!option) return setActiveOption(null);
      return setActiveOption(option.value);
    }
    const idx = filteredOptions.findIndex(option => option.value === activeOption);
    if (idx === -1) return setActiveOption(null);
    const cyclicIndex = (idx + 1) % filteredOptions.length;
    setActiveOption(filteredOptions[cyclicIndex].value);
  }, [activeOption, setActiveOption, filteredOptions]);

  const onUpKey = useCallback(() => {
    if (filteredOptions.length < 1) return;
    setMarkForClose(false);
    if (!activeOption) {
      const option = filteredOptions[filteredOptions.length - 1];
      return setActiveOption(option.value);
    }
    const idx = filteredOptions.findIndex(option => option.value === activeOption);
    if (idx === -1) return setActiveOption(null);
    const cyclicIndex = (idx + (filteredOptions.length - 1)) % filteredOptions.length;
    setActiveOption(filteredOptions[cyclicIndex].value);
  }, [activeOption, setActiveOption, filteredOptions]);

  const onBackspaceKey = useCallback(() => {
    if (!focused) {
      setMarkForClose(false);
      setFocused(true);
    }
  }, [setMarkForClose, setFocused, focused]);

  const onEnterKey = useCallback(() => {
    if (activeOption) {
      setSelected(activeOption);
    } else {
      ref.current?.focus();
    }
  }, [activeOption, setSelected]);

  useShortcuts("ArrowDown", onDownKey, ref);
  useShortcuts("ArrowUp", onUpKey, ref);
  useShortcuts("Enter", onEnterKey, ref);
  useShortcuts("Backspace", onBackspaceKey, ref);

  useEffect(() => {
    if (!focused) {
      setActiveOption(null);
    }
  }, [focused, setActiveOption]);

  useEffect(() => {
    if (markForClose) {
      setFocused(false);
    }
  }, [markForClose, setFocused]);

  const setActive = (value: string) => {
    setActiveOption(value);
  };

  const renderOptions = () => {
    return filteredOptions.map(option => (
      <ComboOption
        key={option.value}
        {...option}
        active={option.value === activeOption}
        setActive={setActive}
        selected={option.value === selectedOption}
        setSelected={setSelected}
      />
    ));
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);
    const option = filteredOptions.find(option => option.value === activeOption);
    if (!option) setActiveOption(filteredOptions[0]?.value);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const { key } = e;
    if (key === "ArrowDown" || key === "ArrowUp") {
      e.preventDefault();
    }
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setMarkForClose(true);
    if (inputProps.onBlur) {
      inputProps.onBlur(e);
    }
  };

  const onFocus: React.FocusEventHandler = () => {
    setMarkForClose(false);
    setFocused(true);
    // if (selectedValue) setQuery(selectedValue);
  };

  const onClick: React.PointerEventHandler<HTMLInputElement> = () => {
    setMarkForClose(false);
    setFocused(true);
  };

  const displaySelected = selectedOption
    ? options.find(option => option.value === selectedOption)?.display || ""
    : "";

  return (
    <div className="relative pb-2">
      {label && <label htmlFor={"combo"}>{label}</label>}
      <input
        id="combo"
        ref={ref}
        value={focused ? query : displaySelected ? "✅ " + displaySelected : ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onClick={onClick}
        className={commonClasses + " w-full"}
        type="text"
        {...inputProps}
        onBlur={onBlur}
      />
      {focused && filteredOptions.length > 0 && (
        <div className="absolute bg-zinc-900 w-full top-full rounded-md border-lime-400 border-[1px] flex flex-col max-h-48 overflow-auto z-50">
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

type FilterOptions = {
  value: string;
  display: string;
}[];

function sortFilterOptionsCurrentSelectionAtTop(
  filterOptions: FilterOptions,
  selectedOption: string | null | undefined
): FilterOptions {
  const newOptions = [...filterOptions];
  if (selectedOption == null) return newOptions;
  if (newOptions.length < 2) return newOptions;
  const idx = newOptions.findIndex(option => option.value === selectedOption);
  if (idx === -1) return newOptions;
  const temp = newOptions[0];
  newOptions[0] = newOptions[idx];
  newOptions[idx] = temp;
  return newOptions;
}

function ComboOption({
  value,
  display,
  subDisplay,
  selected,
  active,
  setActive,
  setSelected,
}: {
  value: string;
  display: string;
  selected: boolean;
  active: boolean;
  subDisplay?: string;
  setActive: (value: string) => void;
  setSelected: (value: string) => void;
}) {
  const activeStyles = active ? "bg-zinc-700" : "";
  const onActivated = () => {
    setActive(value);
  };

  const onSelected = () => {
    setSelected(value);
  };

  const onMouseOver: React.PointerEventHandler<HTMLDivElement> = () => {
    if (active) return;
    onActivated();
  };

  return (
    <div
      onMouseOver={onMouseOver}
      onClick={onSelected}
      className={"transition-colors p-1 px-2 cursor-pointer " + activeStyles}
    >
      {selected ? "✅ " : ""}
      {display}
      <span className="italic text-zinc-400 pl-2">{subDisplay}</span>
    </div>
  );
}
