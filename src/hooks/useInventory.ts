import { useMutation, useQuery, useQueryClient } from "react-query";
import { detailFactory, keys, listFactory } from "api/querieFactory";
import {
  ChangeDefaultSupplierVars,
  InventoryItem,
  InventoryList,
  addProductToInventoryApi,
  changeDefaultSupplierApi,
  getProductVendorOptionsApi,
  removeProductFromInventoryApi,
} from "api/inventory";

const RESOURCE = "inventory";

export type InventoryFilters =
  | {
      query?: string;
    }
  | undefined;

export const useInventoryList = listFactory<InventoryList, InventoryFilters>(RESOURCE);
export const useInventoryDetail = detailFactory<InventoryItem>(RESOURCE);

export const useAddToInventory = () => {
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: addProductToInventoryApi,
    onSettled: () => {
      client.invalidateQueries({
        predicate: mutation => {
          return mutation.queryKey[1] === "inventory" || mutation.queryKey[0] === "products";
        },
      });
    },
  });

  return {
    addToInventory: mutate,
    loading: isLoading,
  };
};

export const useRemoveFromInventory = () => {
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: removeProductFromInventoryApi,
    onSettled: () => {
      client.invalidateQueries({
        predicate: mutation =>
          mutation.queryKey[1] === "inventory" || mutation.queryKey[0] === "products",
      });
    },
  });
  return {
    removeFromInventory: mutate,
    loading: isLoading,
  };
};

export const useChangeDefaultSupplier = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: ChangeDefaultSupplierVars) => {
      await changeDefaultSupplierApi(vars);
      return { ...vars };
    },
    onSettled: async vars => {
      if (!vars) return;
      await client.cancelQueries();
      client.invalidateQueries([vars.venueId, RESOURCE], { exact: false });
    },
  });

  return {
    changeDefaultSupplier: mutate,
  };
};

export const useGetProductVendorOptions = (venueId: string, productId: string) => {
  const queryKey = [...keys.detail(venueId, RESOURCE, productId), "vendors"];
  const { data, status } = useQuery({
    queryKey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async ({ queryKey: [venueId, _resource, _detail, productId] }) =>
      await getProductVendorOptionsApi({ venueId, productId }),
  });

  return { vendorOptions: data, status };
};
