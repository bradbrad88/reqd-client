import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

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
  productId,
  venueId,
}: {
  venueId: string;
  areaId: string;
  productId: string;
}) => {
  return await axios.delete(`venue/${venueId}/areas/${areaId}/products`, {
    data: { productId },
  });
};

export const createAreaApi = axiosHandler(createArea);
export const deleteAreaApi = axiosHandler(deleteArea);
export const addProductToVenueAreaApi = axiosHandler(addProductToVenueArea);
export const removeProductFromVenueAreaApi = axiosHandler(removeProductFromVenueArea);
