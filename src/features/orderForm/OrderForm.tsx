import OrderItem from "./OrderItem";
import { Provider as OrderProvider } from "../../contexts/orderContext";

const history = [
  { orders: 10, sales: 20 },
  { orders: 15, sales: 30 },
  { orders: 5, sales: 12 },
];

const OrderForm = () => {
  return (
    <div className="text-xl flex flex-col gap-2">
      <OrderProvider>
        <OrderItem history={history} itemId="123" />
        <OrderItem history={history} itemId="321" />
      </OrderProvider>
    </div>
  );
};
export default OrderForm;
