import axios from "config/axios";
import { axiosHandler } from "./axiosHandler";

export type OrderList = {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  areas: string[];
}[];

export type OrderDetail = {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  items: {
    productId: string;
    totalAmount: number;
    areaAmounts: { productLocationId: string; amount: number }[];
  }[];
};

export type OrderHistory = {
  week: string;
  products: { productId: string; quantity: number }[];
};

const createOrder = async ({ venueId }: { venueId: string }) => {
  return await axios.post<{ id: string; createdAt: Date }>(`/venue/${venueId}/orders`);
};

const setProductAmount = async ({
  id,
  venueId,
  update,
}: OrderDetail & {
  update: { productId: string; productLocationId: string; amount: number };
}) => {
  return await axios.post<OrderDetail>(
    `/venue/${venueId}/orders/${id}/product-amount`,
    update
  );
};

const getOrderHistory = async ({
  venueId,
  dates,
  orderId,
}: {
  venueId: string;
  dates: Date[];
  orderId: string;
}) => {
  const dateString = dates
    .map(date => {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.toJSON();
    })
    .join(",");
  return await axios.get<OrderHistory[]>(`/venue/${venueId}/orders/history`, {
    params: {
      dates: dateString,
      orderId,
    },
  });
};

export const createOrderApi = axiosHandler(createOrder);
export const setProductAmountApi = axiosHandler(setProductAmount);
export const getOrderHistoryApi = axiosHandler(getOrderHistory);
