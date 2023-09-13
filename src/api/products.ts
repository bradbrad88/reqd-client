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
  vendorId: string;
  vendorName: string;
  unitType: string;
  packageType: string;
  packageQuantity: number;
  size: number;
  unitOfMeasurement: string;
}[];

type CreateProduct = {
  venueId: string;
  vendorId: string;
  displayName: string;
  unitType: string;
  packageType: string;
  packageQuantity: number;
  size?: number;
  unitOfMeasurement?: string;
};

const createProduct = async ({
  venueId,
  vendorId,
  displayName,
  unitType,
  packageType,
  packageQuantity,
  size,
  unitOfMeasurement,
}: CreateProduct) => {
  return await axios.post<ProductDetail>(`/venue/${venueId}/products`, {
    vendorId,
    displayName,
    unitType,
    packageType,
    packageQuantity,
    unitOfMeasurement,
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

type UpdateFields = {
  displayName?: string;
  unitType?: string;
  packageType?: string;
  packageQuantity?: number;
  size?: number | null;
  unitOfMeasurement?: string | null;
};

const updateProduct = async ({
  venueId,
  productId,
  update,
}: {
  venueId: string;
  productId: string;
  update: UpdateFields;
}) => {
  return await axios.put(`/venue/${venueId}/products/${productId}`, update);
};

export const createProductApi = axiosHandler(createProduct);
export const deleteProductApi = axiosHandler(deleteProduct);
export const updateProductApi = axiosHandler(updateProduct);
