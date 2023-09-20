import CallToAction from "common/CallToAction";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import { useNavigate } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useCreateOrder, useOrderList } from "src/hooks/useOrders";

const OrderList = () => {
  const { venueId } = useVenueContext();
  const { data: orders } = useOrderList(venueId);
  const { createOrderAsync } = useCreateOrder(venueId);
  const nav = useNavigate();
  const onNewOrder = async () => {
    const res = (await createOrderAsync({ venueId })) as { id: string };
    nav(res.id);
  };

  const renderOrders = () => {
    if (!orders) return null;
    return orders.map(order => (
      <ListItem key={order.id}>
        <Order {...order} />
      </ListItem>
    ));
  };

  return (
    <div className="flex flex-col gap-3">
      <CallToAction action={onNewOrder}>New Order</CallToAction>
      <FlexList>{renderOrders()}</FlexList>
    </div>
  );
};

export default OrderList;

type OrderProps = {
  id: string;
  createdAt: string;
  areas: string[];
  showAreasLength?: number;
};

function Order({ id, createdAt, areas, showAreasLength = 2 }: OrderProps) {
  const nav = useNavigate();

  const onClick = () => {
    nav(id);
  };

  const condensedAreas = areas.slice(0, showAreasLength);
  const remainingAreasLength = areas.length - condensedAreas.length;
  const remainingAreas =
    remainingAreasLength < 1
      ? ""
      : remainingAreasLength === 1
      ? " and 1 more area"
      : ` and ${remainingAreasLength} more areas`;

  const renderDate = () => {
    const date = new Date(createdAt);
    const intl = Intl.DateTimeFormat("en-au", { weekday: "long" }).format(date);
    return `${intl} ${date.toLocaleDateString()}`;
  };

  return (
    <div
      onClick={onClick}
      className="overflow-clip text-ellipsis whitespace-nowrap text-white"
    >
      {renderDate()}
      {areas.length > 0 && (
        <span className="pl-2 text-zinc-400 italic text-ellipsis overflow-clip text-sm">
          {condensedAreas.join(", ")}
          {remainingAreas}
        </span>
      )}
    </div>
  );
}
