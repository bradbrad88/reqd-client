import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductList, getProductDetail, deleteProduct } from "api/products";

export const useProductList = (venueId: string, filters?: Filters) => {
  const key = productKeys.list(venueId, filters);
  const { data } = useQuery(key, getProductList);
  return { products: data || [] };
};

export const useProductDetail = (venueId: string, productId: string) => {
  const key = productKeys.detail(venueId, productId);
  const { data } = useQuery(key, getProductDetail);
  return { product: data };
};

export const useDeleteProduct = (venueId: string, productId: string) => {
  const key = productKeys.detail(venueId, productId);
  const queryClient = useQueryClient();
  const mutation = useMutation(key, deleteProduct, {
    onMutate: async ({ venueId, productId }) => {
      const key = productKeys.detail(venueId, productId);
      await queryClient.cancelQueries(key);
      queryClient.removeQueries({ queryKey: key });
    },
    onSettled: (data, error, { venueId }) => {
      const key = productKeys.all(venueId);
      queryClient.invalidateQueries(key);
    },
  });
  return { mutate: mutation.mutate };
};

export type Filters = {
  vendorId?: string[];
  areaId?: string[];
};

export const productKeys = {
  all: (venueId: string) => [venueId, "products"] as const,
  lists: (venueId: string) => [...productKeys.all(venueId), "list"] as const,
  list: (venueId: string, filters?: Filters) =>
    [...productKeys.lists(venueId), filters] as const,
  details: (venueId: string) => [...productKeys.all(venueId), "detail"] as const,
  detail: (venueId: string, id: string) => [...productKeys.details(venueId), id] as const,
};
