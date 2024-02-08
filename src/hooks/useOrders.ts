import { useMutation, useQuery, useQueryClient } from "react-query";
import { detailFactory, keys, listFactory } from "api/querieFactory";
import {
  CreateOrderVars,
  OrderDetail,
  OrderList,
  SetProductQuantityVars,
  createOrderApi,
  getOrderHistoryApi,
  getVendorSummaryApi,
  setProductQuantityApi,
} from "api/orders";

const RESOURCE_TYPE = "orders" as const;

type OrderFilters = undefined;

export const useOrderList = listFactory<OrderList, OrderFilters>(RESOURCE_TYPE);
export const useOrderDetail = detailFactory<OrderDetail>(RESOURCE_TYPE);

export const useCreateOrder = () => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (vars: CreateOrderVars) => {
      await createOrderApi(vars);
      return { ...vars };
    },
    onSettled: async vars => {
      await client.cancelQueries();
      client.invalidateQueries([vars?.venueId, RESOURCE_TYPE, "list"], { exact: false });
    },
  });

  return {
    createOrder: mutateAsync,
  };
};

// export const useCreateOrder = (venueId: string) => {
//   const key = keys.all(venueId, RESOURCE);
//   const { mutate, mutateAsync } = useMutation(key, createOrderApi);
//   return { createOrder: mutate, createOrderAsync: mutateAsync };
// };

// const OrderDetailSchema = z.object({
//   id: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   items: z
//     .object({
//       productId: z.string(),
//       totalAmount: z.number(),
//       areaAmounts: z
//         .object({
//           productLocationId: z.string(),
//           amount: z.number(),
//         })
//         .array(),
//     })
//     .array(),
// });

export const useSetProductQuantity = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: SetProductQuantityVars) => {
      await setProductQuantityApi(vars);
      return { ...vars };
    },
    onSettled: async vars => {
      if (!vars) return;
      const key = [vars.venueId, RESOURCE_TYPE, "detail", vars.orderId];
      await client.cancelQueries();
      client.invalidateQueries(key, { exact: false });
    },
    onMutate: async vars => {
      await client.cancelQueries();
      const key = [vars.venueId, RESOURCE_TYPE, "detail", vars.orderId];
      const previousData = client.getQueryData(key) as OrderDetail | undefined;
      if (!previousData) return;
      const optimisticData = {
        ...previousData,
        products: {
          ...previousData.products,
          [vars.productId]: {
            ...previousData.products[vars.productId],
            quantity: vars.quantity,
          },
        },
      };
      client.setQueryData(key, optimisticData);
    },
  });
  return { setProductQuantity: mutate };
};

export const useVendorSummary = (venueId: string, orderId: string, vendorId: string) => {
  const key = [...keys.detail(venueId, RESOURCE_TYPE, orderId), vendorId] as const;
  const { data, status } = useQuery({
    queryKey: key,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async ({ queryKey: [venueId, _resource, _detail, orderId, vendorId] }) => {
      return await getVendorSummaryApi({ venueId, orderId, vendorId });
    },
  });
  return {
    vendorSummary: data,
    status,
  };
};

export const useOrderHistory = (venueId: string, dates: Date[], orderId: string) => {
  const key = [...keys.all(venueId, RESOURCE_TYPE), "history", dates] as const;
  const { data, status } = useQuery(
    key,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ queryKey: [venueId, _orders, _history, dates] }) =>
      await getOrderHistoryApi({ venueId, dates, orderId }),
    { cacheTime: Infinity, staleTime: Infinity }
  );

  return { history: data, status };
};
