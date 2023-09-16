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
};

function Order({ id, createdAt }: OrderProps) {
  const nav = useNavigate();

  const onClick = () => {
    nav(id);
  };

  const renderDate = () => {
    const date = new Date(createdAt);
    const intl = Intl.DateTimeFormat("en-au", { weekday: "long" }).format(date);
    return `${intl} ${date.toLocaleDateString()}`;
  };

  return <div onClick={onClick}>{renderDate()}</div>;
}
