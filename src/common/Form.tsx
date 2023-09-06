type Props = {
  children: React.ReactNode;
  id?: string;
};

const Form = ({ children, id }: Props) => {
  return (
    <form
      id={id || "form"}
      onSubmit={e => e.preventDefault()}
      className="flex flex-col gap-3 text-lg"
    >
      {children}
    </form>
  );
};

export default Form;
