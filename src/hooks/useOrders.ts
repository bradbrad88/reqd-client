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
    (prev, { data: { productLocationId, amount, productId } }) => {
      const data = OrderDetailSchema.parse(prev);

      const items = data.items.map(item => {
        if (item.productId !== productId) return item;
        const areaAmounts = item.areaAmounts.map(areaAmount => {
          if (areaAmount.productLocationId !== productLocationId) return areaAmount;
          return {
            ...areaAmount,
            amount,
          };
        });
        const totalAmount = areaAmounts.reduce((total, area) => total + area.amount, 0);
        return {
          ...item,
          totalAmount,
          areaAmounts,
        };
      });

      return {
        ...data,
        items,
      };
    }
  );

  return { mutate };
};
