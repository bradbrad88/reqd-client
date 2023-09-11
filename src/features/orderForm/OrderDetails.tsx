import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useOrderDetail } from "src/hooks/useOrders";
import { useAreaList } from "src/hooks/useAreas";
import Area from "./Area";
import FlexList from "common/FlexList";

const OrderDetails = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: areas } = useAreaList(venueId);

  const renderAreas = () => {
    if (!areas) return null;
    return areas.map(area => (
      <Area key={area.id} orderItems={order?.items || []} orderId={orderId!} {...area} />
    ));
  };

  if (!order) return <div>Loading</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold">{new Date(order.createdAt).toLocaleDateString()}</h2>
      <h3>
        {order.items.length} item{order.items.length === 1 ? "" : "s"}
      </h3>
      <FlexList>{renderAreas()}</FlexList>
    </div>
  );
};

export default OrderDetails;
