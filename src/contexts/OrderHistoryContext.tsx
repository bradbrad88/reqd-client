import { createContext } from "react";
import { QueryStatus } from "react-query";
import { createArrayOfLength } from "utils/arrays";
import { OrderDetail, OrderHistory } from "api/orders";
import { useOrderHistory } from "src/hooks/useOrders";

type ContextType = {
  productHistory: OrderHistory["products"];
  periods: OrderHistory["periods"];
  status: QueryStatus;
};

type Props = {
  venueId: string;
  order: OrderDetail;
  historyLength?: number;
  children?: React.ReactNode;
};

const Context = createContext<ContextType | null>(null);

export const OrderHistoryProvider = ({
  venueId,
  order,
  children,
  historyLength = 6,
}: Props) => {
  const dates = createArrayOfLength(historyLength).map(idx => {
    const date = new Date(order.createdAt);
    date.setDate(date.getDate() - 7 * idx);
    return date;
  });
  const { history, status } = useOrderHistory(venueId, dates, order.id);

  return (
    <Context.Provider
      value={{
        productHistory: history?.products || {},
        periods: history?.periods || [],
        status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
