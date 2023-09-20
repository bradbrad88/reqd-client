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

export const createOrderApi = axiosHandler(createOrder);
export const setProductAmountApi = axiosHandler(setProductAmount);
