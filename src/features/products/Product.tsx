import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  displayName: string;
  vendorName: string;
  unitType: string;
  packageType: string;
  packageQuantity: number;
  size?: number;
  unitOfMeasurement?: string;
};

const Product = ({ id, displayName, unitType, size, unitOfMeasurement }: Props) => {
  const nav = useNavigate();

  const onNav = () => {
    nav(id);
  };

  return (
    <div
      onClick={onNav}
      className="p-2 px-3 bg-zinc-700 rounded-md border-[1px] border-zinc-600 hover:bg-zinc-600"
    >
      <span className="font-bold">{displayName}</span>
      <span className="italic upp pl-2">
        {unitType} {size}
        {unitOfMeasurement}
      </span>
    </div>
  );
};

export default Product;
