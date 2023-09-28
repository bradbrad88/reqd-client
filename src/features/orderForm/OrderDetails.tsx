import { Outlet, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useOrderDetail } from "src/hooks/useOrders";

const OrderDetails = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);

  if (!order) return <div>Loading</div>;
  return <Outlet />;
};

export default OrderDetails;
