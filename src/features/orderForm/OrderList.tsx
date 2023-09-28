import { useNavigate } from "react-router-dom";
import { getStartOfToday, getStartOfWeek } from "src/utils/dates";
import { useVenueContext } from "src/hooks/useContexts";
import { useCreateOrder, useOrderList } from "src/hooks/useOrders";
import CallToAction from "common/CallToAction";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import type { OrderList as OrderListType } from "api/orders";

const OrderList = () => {
  const { venueId } = useVenueContext();
  const { data: orders } = useOrderList(venueId);
  const { createOrderAsync } = useCreateOrder(venueId);
  const nav = useNavigate();
  const onNewOrder = async () => {
    const res = (await createOrderAsync({ venueId })) as { id: string };
    nav(res.id + "/edit");
  };

  const renderOrders = () => {
    const breakdownInit = {
      today: [] as OrderListType[number][],
      thisWeek: [] as OrderListType[number][],
      previous: [] as OrderListType[number][],
    };

    const today = getStartOfToday();
    const week = getStartOfWeek();

    const breakdown = orders.reduce((breakdown, order) => {
      const date = new Date(order.createdAt);

      if (date.getTime() > today.getTime()) {
        breakdown.today.push(order);
        return breakdown;
      }
      if (date.getTime() > week.getTime()) {
        breakdown.thisWeek.push(order);
        return breakdown;
      }
      breakdown.previous.push(order);

      return breakdown;
    }, breakdownInit);

    function renderOrderBreakdown(orders: OrderListType) {
      return orders.map(order => (
        <ListItem key={order.id}>
          <Order {...order} showAreasLength={3} />
        </ListItem>
      ));
    }

    return (
      <>
        {breakdown.today.length > 0 && (
          <div>
            <p className="text-indigo-300">Today</p>
            <div className="flex flex-col gap-3">{renderOrderBreakdown(breakdown.today)}</div>
          </div>
        )}
        {breakdown.thisWeek.length > 0 && (
          <div>
            <p className="text-indigo-300">This Week</p>
            <div className="flex flex-col gap-3">
              {renderOrderBreakdown(breakdown.thisWeek)}
            </div>
          </div>
        )}
        {breakdown.previous.length > 0 && (
          <div>
            {(breakdown.today.length > 0 || breakdown.thisWeek.length > 0) && (
              <p className="text-indigo-300">Earlier</p>
            )}
            <div className="flex flex-col gap-3">
              {renderOrderBreakdown(breakdown.previous)}
            </div>
          </div>
        )}
      </>
    );
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
    return `${date.toLocaleDateString()}`;
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
