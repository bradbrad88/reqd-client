import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";
import { ProductDetail } from "./products";

export type AreaList = {
  id: string;
  areaName: string;
}[];

export type ProductLocation = {
  id: string;
  parLevel?: number | null;
  sortedOrder: number;
} & Omit<ProductDetail, "id"> & { productId: string };

export type AreaDetail = {
  id: string;
  areaName: string;
  products: ProductLocation[];
};

const createArea = async ({ venueId, areaName }: { venueId: string; areaName: string }) => {
  return await axios.post<{ id: string; areaName: string }>(`/venue/${venueId}/areas`, {
    areaName,
  });
};

const deleteArea = async ({ venueId, areaId }: { venueId: string; areaId: string }) => {
  return await axios.delete(`/venue/${venueId}/areas/${areaId}`);
};

const addProductToVenueArea = async ({
  venueId,
  areaId,
  productId,
  parLevel,
}: {
  venueId: string;
  areaId: string;
  productId: string;
  parLevel?: number;
}) => {
  return await axios.post(`/venue/${venueId}/areas/${areaId}/products`, {
    productId,
    parLevel,
  });
};

const removeProductFromVenueArea = async ({
  areaId,
  productLocation,
  venueId,
}: {
  venueId: string;
  areaId: string;
  productLocation: string;
}) => {
  return await axios.delete(`venue/${venueId}/areas/${areaId}/products/${productLocation}`);
};

const setProductLocationParLevel = async ({
  venueId,
  id,
  productLocationId,
  parLevel,
}: AreaDetail & { venueId: string; productLocationId: string; parLevel: number | null }) => {
  return await axios.put(`venue/${venueId}/areas/${id}/products/${productLocationId}`, {
    parLevel,
  });
};

export const createAreaApi = axiosHandler(createArea);
export const deleteAreaApi = axiosHandler(deleteArea);
export const addProductToVenueAreaApi = axiosHandler(addProductToVenueArea);
export const removeProductFromVenueAreaApi = axiosHandler(removeProductFromVenueArea);
export const setProductLocationParLevelApi = axiosHandler(setProductLocationParLevel);
