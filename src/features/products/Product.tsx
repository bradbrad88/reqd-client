import { useNavigate } from "react-router-dom";

import type { ProductList } from "api/products";
import ListItem from "common/ListItem";

type Product = ProductList[number];
type Props = {
  product: Product;
};

const Product = ({
  product: { id, displayName, unitType, size, unitOfMeasurement },
}: Props) => {
  const nav = useNavigate();

  const onNav = () => {
    nav(id);
  };

  return (
    <ListItem>
      <div onClick={onNav}>
        <span className="font-bold">{displayName}</span>
        <span className="italic pl-2">
          {unitType} {size}
          {unitOfMeasurement}
        </span>
      </div>
    </ListItem>
  );
};

export default Product;
