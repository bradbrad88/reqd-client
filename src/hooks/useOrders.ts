import { detailFactory, keys, listFactory } from "api/querieFactory";
import { useMutation } from "./useMutation";
import { createOrderApi, setProductAmountApi } from "api/orders";
import { z } from "zod";

const RESOURCE = "orders" as const;

type OrderList = {
  id: string;
  createdAt: string;
}[];

type OrderFilters = undefined;

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

export const useOrderList = listFactory<OrderList, OrderFilters>(RESOURCE);
export const useOrderDetail = detailFactory<OrderDetail>(RESOURCE);

export const useCreateOrder = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate, mutateAsync } = useMutation(key, createOrderApi);
  return { createOrder: mutate, createOrderAsync: mutateAsync };
};

const OrderDetailSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z
    .object({
      productId: z.string(),
      totalAmount: z.number(),
      areaAmounts: z
        .object({
          productLocationId: z.string(),
          amount: z.number(),
        })
        .array(),
    })
    .array(),
});

export const useSetProductAmount = (venueId: string, orderId: string) => {
  const key = keys.detail(venueId, RESOURCE, orderId);
  const { mutate } = useMutation(
    key,
    setProductAmountApi,
    // Optimistic Update
    (prev, { update: { productLocationId, amount, productId }, ...order }) => {
      // No cached orderDetail value
      if (!prev) {
        return {
          ...order,
          items: [
            { productId, totalAmount: amount, areaAmounts: [productLocationId, amount] },
          ],
        };
      }

      // Find or create the current product item
      const data = OrderDetailSchema.parse(prev);
      const item = data.items.find(item => item.productId === productId) || {
        productId,
        totalAmount: 0,
        areaAmounts: [],
      };

      // Update or create areaAmount with productLocationId and amount
      const areaAmount = { productLocationId, amount };
      const newAreaAmounts = item.areaAmounts
        .filter(areaAmount => areaAmount.productLocationId !== productLocationId)
        .concat(areaAmount);
      item.areaAmounts = newAreaAmounts;
      item.totalAmount = newAreaAmounts.reduce(
        (total, areaAmount) => total + areaAmount.amount,
        0
      );

      const items = data.items.filter(item => item.productId !== productId).concat(item);
      return {
        ...order,
        items,
      };
    }
  );

  return { mutate };
};
