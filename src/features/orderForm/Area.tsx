import FlexList from "common/FlexList";
import { useAreaDetail } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import ItemForm from "./ItemForm";
import { OrderDetail } from "src/hooks/useOrders";

type Props = {
  id: string;
  areaName: string;
  orderId: string;
  orderItems: OrderDetail["items"];
};

const Area = ({ id, areaName, orderId, orderItems }: Props) => {
  const { venueId } = useVenueContext();
  const { data: area } = useAreaDetail(id, venueId);
  const renderProducts = () => {
    if (!area) return [];
    return area.products.map(product => {
      const productAmounts = orderItems.find(item => item.productId === product.id);
      return (
        <ItemForm
          key={product.id}
          areaId={id}
          orderId={orderId}
          productId={product.id}
          productAmounts={productAmounts?.areaAmounts}
          {...product}
        />
      );
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-indigo-500">{areaName}</h1>
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default Area;
