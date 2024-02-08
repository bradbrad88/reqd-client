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
  unitOfMeasurement: { value: string };
  defaultSupply: SupplyDetails | null;
};

export type SupplyDetails = {
  vendorId: string;
  packageType: { value: string; plural: string };
  packageQuantity: number;
  vendorRangeId: string;
};

export type InventoryList = InventoryItem[];

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

export const addProductToInventoryApi = axiosHandler(addProductToInventory);
export const removeProductFromInventoryApi = axiosHandler(removeProductFromInventory);
