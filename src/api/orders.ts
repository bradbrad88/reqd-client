import axios from "config/axios";
import { axiosHandler } from "./axiosHandler";

import type { OrderDetail } from "src/hooks/useOrders";

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
