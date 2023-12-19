import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type ProductDetail = {
  id: string;
  venueId: string;
  vendorId?: string | null;
  vendorName?: string;
  displayName: string;
  unitType: { value: string; plural: string };
  packageType: { value: string; plural: string };
  packageQuantity: number;
  size?: number;
  unitOfMeasurement?: { value: string };
  inInventory: boolean;
};

export type CreateProduct = {
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

export type UpdateFields = {
  displayName?: string;
  unitType?: { value: string; plural: string };
  packageType?: { value: string; plural: string };
  packageQuantity?: number;
  size?: number | null;
  unitOfMeasurement?: { value: string } | null;
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
}: {
  id: string;
  venueId: string;
  update: UpdateFields;
}) => {
  return await axios.put(`/venue/${venueId}/products/${id}`, update);
};

const updateProductVendor = async ({
  venueId,
  id,
  vendorId,
}: ProductDetail & { vendorId: string | null; vendorName: string | null }) => {
  return await axios.put(`/venue/${venueId}/products/${id}/vendor`, { vendorId });
};

export type ProductListApiResult = {
  products: ProductDetail[];
  count: number;
  page: number;
  pageSize: number;
};

const getProducts = async ({ query }: { query?: string }, pageSize: number, page: number) => {
  return await axios.get<ProductListApiResult>(`/products`, {
    params: { page, pageSize, query },
  });
};

export const getProductsApi = axiosHandler(getProducts);
export const createProductApi = axiosHandler(createProduct);
export const deleteProductApi = axiosHandler(deleteProduct);
export const updateProductApi = axiosHandler(updateProduct);
export const updateProductVendorApi = axiosHandler(updateProductVendor);
