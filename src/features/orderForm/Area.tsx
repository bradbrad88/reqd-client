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
      <h1 className="text-3xl text-indigo-500">{area?.areaName}</h1>
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default Area;
