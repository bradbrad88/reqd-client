import CallToAction from "common/CallToAction";

import Drag from "common/icons/Drag";

import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductLocation } from "src/hooks/useAreas";

type Context = {
  areaProducts: ProductLocation[];
};

const AreaProducts = () => {
  const nav = useNavigate();
  const { areaProducts } = useOutletContext<Context>();
  const renderProducts = () => {
    return areaProducts.map(product => <Product key={product.id} {...product} />);
  };

  const onNav = () => {
    nav("add-product");
  };

  return (
    <div className="flex flex-col gap-3">
      <CallToAction action={onNav}>Add Product</CallToAction>
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">Item</h2>
        <h2 className="font-bold text-xl">Par Level</h2>
      </div>
      <div className="flex flex-col gap-2">{renderProducts()}</div>
    </div>
  );
};

export default AreaProducts;

function Product({
  displayName,
  unitType,
  size,
  unitOfMeasurement,
  parLevel,
}: ProductLocation) {
  return (
    <div className="flex justify-between w-full bg-zinc-900 p-3 rounded-md">
      <div className="flex gap-2">
        <div className="bg-blue-200">
          <Drag />
        </div>
        <div className="font-bold">{displayName}</div>
        <div className="italic">
          {unitType} {size}
          {unitOfMeasurement}
        </div>
      </div>
      {parLevel}
    </div>
  );
}
