import { createContext, useMemo } from "react";
import { OrderHistory } from "api/orders";
import { useOrderHistory } from "src/hooks/useOrders";
import { useProductList } from "src/hooks/useProducts";

type ProductHistory = { [key: string]: number[] };

type ContextType = {
  orderHistory: OrderHistory[];
  productHistory: ProductHistory;
  dates: Date[];
};

type Props = {
  venueId: string;
  dates: Date[];
  orderId: string;
  children?: React.ReactNode;
};

const Context = createContext<ContextType | null>(null);

export const OrderHistoryProvider = ({ venueId, dates, orderId, children }: Props) => {
  const { data: orders } = useOrderHistory(venueId, dates, orderId);
  const { data: products } = useProductList(venueId);
  const productHistory = useMemo(() => {
    const productHistory = {} as ProductHistory;
    for (const order of orders) {
      // Make a map of products in the order to cut down lookup time
      const orderProductsMap = new Map();
      for (const product of order.products) {
        orderProductsMap.set(product.productId, product);
      }
      // Loop through all products in venue inventory and assign order history array to them
      for (const product of products) {
        const arr = productHistory[product.id] || [];
        const amount = orderProductsMap.get(product.id)?.quantity || 0;
        productHistory[product.id] = [amount, ...arr];
      }
    }

    return productHistory;
  }, [orders, products]);

  const dateArray = useMemo(() => {
    return orders.map(order => new Date(order.week)).reverse();
  }, [orders]);

  return (
    <Context.Provider value={{ orderHistory: orders, productHistory, dates: dateArray }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
