import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { getStartOfToday, getStartOfWeek } from "src/utils/dates";
import { useVenueContext } from "src/hooks/useContexts";
import { useCreateOrder, useOrderList } from "src/hooks/useOrders";
import FixedCallToAction from "common/FixedCallToAction";
import AvatarList from "common/AvatarList";

import type { OrderList as OrderListType } from "api/orders";
import type { AvatarItem } from "common/AvatarList";

const OrderList = () => {
  const { venueId } = useVenueContext();
  const { data: orders } = useOrderList(venueId);
  const { createOrder } = useCreateOrder();
  const nav = useNavigate();
  const onNewOrder = async () => {
    const orderId = uuid();
    await createOrder({ orderId, venueId });
    nav(orderId + "/edit");
  };
  const showVendorsLength = 3;

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

    const onSelect = (orderId: string) => {
      nav(orderId);
    };

    function renderOrderBreakdown(orders: OrderListType) {
      const items: AvatarItem[] = orders.map(order => {
        const condensedVendors = order.vendorSummary.slice(0, showVendorsLength);
        const remainingAreasLength = order.vendorSummary.length - condensedVendors.length;
        const remainingAreas =
          remainingAreasLength < 1
            ? ""
            : remainingAreasLength === 1
            ? " and 1 more vendor"
            : ` and ${remainingAreasLength} more vendors`;

        const renderCondensedVendors = () => {
          return condensedVendors
            .map(vendor =>
              vendor.vendorName
                ? `${vendor.productCount} ${vendor.vendorName} product${
                    vendor.productCount === 1 ? "" : "s"
                  }`
                : `${vendor.productCount} product${
                    vendor.productCount === 1 ? "" : "s"
                  } from an unknown vendor`
            )
            .join(", ");
        };
        return {
          id: order.id,
          description: renderCondensedVendors() + remainingAreas,
          displayName: new Date(order.createdAt).toLocaleDateString(),
        };
      });

      return <AvatarList items={items} onSelect={onSelect} />;
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
      <FixedCallToAction action={onNewOrder}>New Order</FixedCallToAction>
      {renderOrders()}
    </div>
  );
};

export default OrderList;
