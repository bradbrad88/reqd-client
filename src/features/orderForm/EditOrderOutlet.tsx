import { useParams } from "react-router-dom";
import { OrderHistoryProvider } from "ctx/OrderHistoryContext";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaDetail } from "src/hooks/useAreas";
import { useOrderDetail } from "src/hooks/useOrders";
import OrderArea from "./OrderArea";
import Spinner from "common/Spinner";

const EditOrderOutlet = () => {
  const { venueId } = useVenueContext();
  const { orderId, areaId } = useParams<{ orderId: string; areaId: string }>();
  const { data: area, status: areaStatus } = useAreaDetail(areaId!, venueId);
  const { data: order, status: orderStatus } = useOrderDetail(orderId!, venueId);

  if (orderStatus === "loading" && !order) return <Spinner />;
  if (areaStatus === "loading" && !area) return <Spinner />;

  return (
    <OrderHistoryProvider order={order!} venueId={venueId}>
      <OrderArea order={order!} area={area!} />
    </OrderHistoryProvider>
  );
};

export default EditOrderOutlet;
