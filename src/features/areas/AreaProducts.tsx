import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AreaDetail, ProductLocation } from "api/areas";
import { useVenueContext } from "src/hooks/useContexts";
import { useRemoveProductFromArea } from "src/hooks/useAreas";
import EditParLevel from "./edit/EditParLevel";
import CallToAction from "common/CallToAction";

export type AreaOutletContext = {
  areaDetail: AreaDetail;
  products: ProductLocation[];
};

const AreaProducts = () => {
  const nav = useNavigate();
  const { products } = useOutletContext<AreaOutletContext>();
  const sortedProducts = useMemo(() => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => a.sortedOrder - b.sortedOrder);
    return sortedProducts;
  }, [products]);

  const renderProducts = () => {
    return sortedProducts.map(product => (
      <Product key={product.id} productLocation={product} />
    ));
  };

  const onNav = () => {
    nav("add-product");
  };

  return (
    <div className="flex flex-col gap-3">
      <CallToAction action={onNav}>Add Product</CallToAction>
      <div className="grid grid-cols-[auto,_minmax(max-content,_50px),_min-content] gap-3 font-bold text-lg p-3">
        <h2>Item</h2>
        <h2>Par Level</h2>
        <h2></h2>
      </div>
      <div className="flex flex-col gap-2">{renderProducts()}</div>
    </div>
  );
};

export default AreaProducts;

function Product({ productLocation }: { productLocation: ProductLocation }) {
  const { id, displayName, unitType, size, unitOfMeasurement } = productLocation;
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { removeProduct } = useRemoveProductFromArea(venueId, areaId!);
  const onDelete = () => {
    removeProduct({ venueId, areaId: areaId!, productLocation: id });
  };

  return (
    <div className="grid grid-cols-[minmax(0,_1fr),_minmax(min-content,_70px),_minmax(min-content,_25px)] bg-zinc-900 p-3 rounded-md gap-3 w-full">
      <div className="flex gap-2 w-full overflow-clip">
        <div className="font-bold text-ellipsis whitespace-nowrap overflow-clip w-full">
          {displayName}
        </div>
        <div className="italic text-ellipsis whitespace-nowrap overflow-clip w-full">
          {unitType} {size}
          {unitOfMeasurement}
        </div>
      </div>
      <EditParLevel productLocation={productLocation} />
      <div onClick={onDelete} className="font-bold cursor-pointer text-center">
        X
      </div>
    </div>
  );
}
