import { cn } from "utils/cn";

type Props = {
  children?: React.ReactNode;
  dragging?: boolean;
};

const ListItem = ({ children, dragging = false }: Props) => {
  return (
    <div
      className={cn(
        "p-3 border-zinc-500 bg-zinc-900 rounded-md border-[1px] shadow-black shadow-md",
        dragging && "border-white dragging"
      )}
    >
      {children}
    </div>
  );
};

export default ListItem;
