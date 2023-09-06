import axios from "../config/axios";
import { productKeys } from "features/products/queries";

import type { QueryFunction } from "react-query";
import type { Filters } from "features/products/queries";

export type ProductDetail = {
  id: string;
  displayName: string;
  vendor: { vendorName: string };
  vendorId: string;
  venueId: string;
  size?: number;
  measure?: string;
};

export type ProductList = {
  id: string;
  displayName: string;
}[];

type ProductDetailKey = ReturnType<typeof productKeys.detail>;

export const getProductDetail: QueryFunction<ProductDetail, ProductDetailKey> = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryKey: [venueId, products, detail, productId],
}) => {
  const res = await axios.get(`/venue/${venueId}/products/detail/${productId}`);
  return res.data.data;
};

type ProductListKey = ReturnType<typeof productKeys.list>;

export const getProductList: QueryFunction<ProductList, ProductListKey> = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryKey: [venueId, products, list, filters = {}],
}) => {
  const params = Object.keys(filters).reduce((filter, key) => {
    if (filters[key as keyof Filters] === undefined) return filter;
    return { ...filter, [key]: filters[key as keyof Filters] };
  }, {} as Filters);

  const res = await axios.get(`/venue/${venueId}/products/${list}`, { params });
  return res.data.data;
};

type CreateProduct = {
  displayName: string;
  venueId: string;
  vendorId: string;
  measure?: string;
  size?: number;
};

export const createProduct = async ({ displayName, venueId, vendorId }: CreateProduct) => {
  const res = await axios.post(`/venue/${venueId}/products`, { displayName, vendorId });
  return res.data.data;
};

export const deleteProduct = async ({
  venueId,
  productId,
}: {
  venueId: string;
  productId: string;
}) => {
  // const promise = new Promise(resolve => setTimeout(() => resolve(undefined), 500));
  // return await promise;
  const res = await axios.delete(`/venue/${venueId}/products/${productId}`);
  return res.data.data;
};
