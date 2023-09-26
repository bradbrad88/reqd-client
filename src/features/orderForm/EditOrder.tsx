import { useParams } from "react-router-dom";
import { createArrayOfLength } from "src/utils/arrays";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaList } from "src/hooks/useAreas";
import { useOrderDetail } from "src/hooks/useOrders";
import { OrderHistoryProvider } from "ctx/OrderHistoryContext";
import Area from "./Area";
import FlexList from "common/FlexList";

const EditOrder = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: areas } = useAreaList(venueId);

  const orderHistoryLength = 6;

  const orderHistoryDates = () => {
    if (!order) return [];
    const currentWeek = new Date(order.createdAt);
    return createArrayOfLength(orderHistoryLength).map((_, idx) => {
      const date = new Date(currentWeek);
      date.setDate(date.getDate() - idx * 7);
      return date;
    });
  };

  const renderAreas = () => {
    if (!areas) return null;
    if (!order) return null;
    return areas.map(area => <Area key={area.id} areaId={area.id} order={order} />);
  };

  return (
    <OrderHistoryProvider venueId={venueId} dates={orderHistoryDates()} orderId={orderId!}>
      <div>
        <FlexList>{renderAreas()}</FlexList>
      </div>
    </OrderHistoryProvider>
  );
};

export default EditOrder;
