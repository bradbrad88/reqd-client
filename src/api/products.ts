import { PartialBy } from "src/utils/types";
import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type ProductDetail = {
  id: string;
  venueId: string;
  vendorId?: string | null;
  vendorName?: string;
  displayName: string;
  unitType: string;
  packageType: string;
  packageQuantity: number;
  size?: number;
  unitOfMeasurement?: string;
};

export type ProductList = ProductDetail[];

type CreateProduct = PartialBy<ProductDetail, "id">;

export type UpdateFields = {
  displayName?: string;
  unitType?: string;
  packageType?: string;
  packageQuantity?: number;
  size?: number | null;
  unitOfMeasurement?: string | null;
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

const deleteProduct = async ({ id, venueId }: ProductDetail) => {
  return await axios.delete(`/venue/${venueId}/products/${id}`);
};

const updateProduct = async ({
  venueId,
  id,
  update,
}: ProductDetail & { update: UpdateFields }) => {
  return await axios.put(`/venue/${venueId}/products/${id}`, update);
};

const updateProductVendor = async ({
  venueId,
  id,
  vendorId,
}: ProductDetail & { vendorId: string | null; vendorName: string | null }) => {
  return await axios.put(`/venue/${venueId}/products/${id}/vendor`, { vendorId });
};

export const createProductApi = axiosHandler(createProduct);
export const deleteProductApi = axiosHandler(deleteProduct);
export const updateProductApi = axiosHandler(updateProduct);
export const updateProductVendorApi = axiosHandler(updateProductVendor);
