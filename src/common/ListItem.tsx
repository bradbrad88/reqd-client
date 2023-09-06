type Props = {
  children?: React.ReactNode;
};

const ListItem = ({ children }: Props) => {
  return (
    <div className="p-2 border-indigo-500 rounded-md border-[1px] shadow-black shadow-md">
      {children}
    </div>
  );
};

export default ListItem;
