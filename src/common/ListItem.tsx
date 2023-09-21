type Props = {
  children?: React.ReactNode;
};

const ListItem = ({ children }: Props) => {
  return (
    <div className="p-3 border-zinc-500 bg-zinc-900 rounded-md border-[1px] shadow-black shadow-md">
      {children}
    </div>
  );
};

export default ListItem;
