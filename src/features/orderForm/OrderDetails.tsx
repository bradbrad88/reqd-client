import BackButton from "common/BackButton";
import { Outlet, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useOrderDetail } from "src/hooks/useOrders";

const OrderDetails = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);

  if (!order) return <div>Loading</div>;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <BackButton />
        <h2 className="text-2xl font-bold">
          {new Date(order.createdAt).toLocaleDateString()}
        </h2>
      </div>

      <Outlet />
    </div>
  );
};

export default OrderDetails;
