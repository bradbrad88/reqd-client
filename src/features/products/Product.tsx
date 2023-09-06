import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  displayName: string;
  size?: number;
  measure?: string;
};

const Product = ({ id, displayName, size, measure }: Props) => {
  const nav = useNavigate();

  const onNav = () => {
    nav(id);
  };

  return (
    <div
      onClick={onNav}
      className="p-2 px-3 bg-zinc-700 rounded-md border-[1px] border-zinc-600 hover:bg-zinc-600"
    >
      {displayName} {size || ""}
      {measure || ""}
    </div>
  );
};

export default Product;
