import FlexList from "common/FlexList";
import { useAreaDetail } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import ItemForm from "./ItemForm";
import { OrderDetail } from "api/orders";
import { ProductLocationAreaMap } from "./EditOrder";

type Props = {
  areaId: string;
  order: OrderDetail;
  productLocationAreaMap: ProductLocationAreaMap;
};

const Area = ({ areaId, order, productLocationAreaMap }: Props) => {
  const { venueId } = useVenueContext();
  const { data: area } = useAreaDetail(areaId, venueId);

  if (!area) return <div>Loading...</div>;

  const renderProducts = () => {
    if (!area) return null;
    return area.products.map(product => {
      const productOrder = order.items.find(item => {
        return item.productId === product.productId;
      });
      return (
        <ItemForm
          key={product.id}
          order={order}
          productLocation={product}
          product={productOrder}
          areaId={areaId}
          productLocationAreaMap={productLocationAreaMap}
        />
      );
    });
  };

  return (
    <div>
      <div className=" pt-3 pb-6 pl-4 bg-gradient-to-b from-zinc-900">
        <h1 className="font-bold text-5xl text-white">{area.areaName}</h1>
      </div>
      <div className="p-3">
        <FlexList>{renderProducts()}</FlexList>
      </div>
    </div>
  );
};

export default Area;
