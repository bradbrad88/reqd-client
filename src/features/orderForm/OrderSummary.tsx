import { useOutletContext } from "react-router-dom";
import OrderVendorList from "./OrderVendorList";
import { OrderDetail } from "api/orders";
import Card from "common/Card";

const OrderSummary = () => {
  const { order } = useOutletContext<{ order: OrderDetail }>();

  const locale = "en-au";
  const productCount = Object.keys(order.products).length;
  const vendorCount = order.vendorSummary.length;
  const startDate = new Date(order.createdAt);
  const updateDate = new Date(order.updatedAt);

  const dateFormat = {
    day: "numeric",
    month: "short",
    weekday: "long",
  } as const;
  const timeFormat = {
    timeStyle: "short",
  } as const;

  const startDateString = Intl.DateTimeFormat(locale, dateFormat).format(startDate);
  const startTimeString = Intl.DateTimeFormat(locale, timeFormat).format(startDate);
  const updateDateString = Intl.DateTimeFormat(locale, dateFormat).format(updateDate);
  const updateTimeString = Intl.DateTimeFormat(locale, timeFormat).format(updateDate);

  return (
    <>
      <header className="p-3">
        <h1 className="text-2xl font-bold">Order</h1>
        <Card className="leading-tight">
          <p>
            Started: {startDateString} {startTimeString}
          </p>
          <p>
            Updated: {updateDateString} {updateTimeString}
          </p>
          <p>Vendors: {vendorCount}</p>
          <p>Products: {productCount}</p>
        </Card>
      </header>
      <main>
        <OrderVendorList order={order} />
      </main>
    </>
  );
};

export default OrderSummary;
