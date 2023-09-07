import { detailFactory, keys, listFactory } from "api/querieFactory";
import { useMutation } from "./useMutation";
import { createProductApi, deleteProductApi } from "api/products";

type Product = {
  id: string;
  displayName: string;
};

type ProductList = Product[];
type ProductFilters = {
  vendorId: string | string[] | undefined;
  areaId: string | string[] | undefined;
};
export type ProductDetail = {
  id: string;
  displayName: string;
  size: number;
  measure: string;
};

const RESOURCE = "products" as const;

export const useProductList = listFactory<ProductList, ProductFilters>(RESOURCE);
export const useProductDetail = detailFactory<ProductDetail>(RESOURCE);

export const useCreateProduct = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate, status } = useMutation(key, createProductApi);

  return { createProduct: mutate, status };
};

export const useDeleteProduct = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate, status } = useMutation(key, deleteProductApi);

  return { deleteProduct: mutate, status };
};
