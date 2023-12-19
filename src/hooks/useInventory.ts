import {
  InventoryList,
  addProductToInventoryApi,
  removeProductFromInventoryApi,
} from "api/inventory";
import { listFactory } from "api/querieFactory";
import { useMutation, useQueryClient } from "react-query";
const RESOURCE = "inventory";

export const useInventoryList = listFactory<InventoryList, undefined>(RESOURCE);

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
