import React, { useEffect, useRef } from "react";

type InputProp = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

const commonClasses = "p-2 px-4 rounded-full focus-visible:outline-lime-400";

export const Input = (htmlInputProps: InputProp) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.type !== "text") return;
    ref.current.selectionStart = 0;
    ref.current.selectionEnd = ref.current.value.length;
  }, []);

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
