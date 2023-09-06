import { detailFactory, listFactory } from "api/querieFactory";

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

export const useProductList = listFactory<ProductList, ProductFilters>("products");
export const useProductDetail = detailFactory<ProductDetail>("products");
