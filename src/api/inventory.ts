import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type InventoryItem = {
  productId: string;
  displayName: string;
  unitType: {
    value: string;
    plural: string;
  };
  size: number;
  unitOfMeasurement?: { value: string };
  image?: string;
  defaultSupply: SupplyDetails | null;
  isInInventory: boolean;
};

export type SupplyDetails = {
  vendorId: string;
  packageType: { value: string; plural: string };
  packageQuantity: number;
  vendorRangeId: string;
  vendor: {
    vendorName: string;
    logo: string;
  };
};

export type InventoryList = {
  products: InventoryItem[];
  count: number;
  page: number;
  pageSize: number;
};

export type ChangeDefaultSupplierVars = {
  venueId: string;
  productId: string;
  defaultSupply: string;
  isNew?: boolean;
};

export type GetProductVendorOptionsVars = {
  venueId: string;
  productId: string;
};

const addProductToInventory = async ({
  venueId,
  productId,
  defaultSupply,
}: {
  venueId: string;
  productId: string;
  defaultSupply: string | null;
}) => {
  return await axios.post(`/venue/${venueId}/inventory`, { productId, defaultSupply });
};

const removeProductFromInventory = async ({
  venueId,
  productId,
}: {
  venueId: string;
  productId: string;
}) => {
  return await axios.delete(`/venue/${venueId}/inventory/${productId}`);
};

const changeDefaultSupplier = async ({
  venueId,
  productId,
  ...data
}: ChangeDefaultSupplierVars) => {
  return await axios.put(`/venue/${venueId}/inventory/${productId}`, data);
};

const getProductVendorOptions = async ({
  venueId,
  productId,
}: GetProductVendorOptionsVars) => {
  return await axios.get<SupplyDetails[]>(
    `/venue/${venueId}/inventory/detail/${productId}/vendors`
  );
};

export const addProductToInventoryApi = axiosHandler(addProductToInventory);
export const removeProductFromInventoryApi = axiosHandler(removeProductFromInventory);
export const changeDefaultSupplierApi = axiosHandler(changeDefaultSupplier);
export const getProductVendorOptionsApi = axiosHandler(getProductVendorOptions);
