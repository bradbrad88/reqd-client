import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

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

type CreateProduct = {
  displayName: string;
  venueId: string;
  vendorId: string;
  measure?: string;
  size?: number;
};

const createProduct = async ({
  displayName,
  venueId,
  vendorId,
  measure,
  size,
}: CreateProduct) => {
  return await axios.post<ProductDetail>(`/venue/${venueId}/products`, {
    displayName,
    vendorId,
    measure,
    size,
  });
};

const deleteProduct = async ({
  venueId,
  productId,
}: {
  venueId: string;
  productId: string;
}) => {
  return await axios.delete(`/venue/${venueId}/products/${productId}`);
};

export const createProductApi = axiosHandler(createProduct);
export const deleteProductApi = axiosHandler(deleteProduct);
