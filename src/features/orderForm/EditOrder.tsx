import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaList } from "src/hooks/useAreas";
import { useOrderDetail } from "src/hooks/useOrders";
import FlexList from "common/FlexList";
import Area from "./Area";

const EditOrder = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: areas } = useAreaList(venueId);

  const renderAreas = () => {
    if (!areas) return null;
    if (!order) return null;
    return areas.map(area => <Area key={area.id} areaId={area.id} order={order} />);
  };

  return (
    <div>
      <FlexList>{renderAreas()}</FlexList>
    </div>
  );
};

export default EditOrder;
