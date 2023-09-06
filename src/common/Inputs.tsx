type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const commonClasses = "p-2 px-4 rounded-full focus-visible:outline-lime-400";

export const Input = (htmlInputProps: InputProps) => {
  return <input className={commonClasses} {...htmlInputProps} />;
};

type SelectProps = {
  children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: SelectProps) => {
  return (
    <select className={commonClasses} {...props}>
      {props.children}
    </select>
  );
};

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => {
  return <input className={commonClasses} {...props} type="checkbox" />;
};
