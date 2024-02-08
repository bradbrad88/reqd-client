import { Outlet, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useOrderDetail } from "src/hooks/useOrders";
import Spinner from "common/Spinner";

const OrderDetails = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);

  if (!order) return <Spinner />;

  return <Outlet context={{ order }} />;
};

export default OrderDetails;
