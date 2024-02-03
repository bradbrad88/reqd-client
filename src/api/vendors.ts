import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type VendorList = {
  id: string;
  vendorName: string;
  logo: string;
}[];

export type GlobalVendorList = {
  id: string;
  vendorName: string;
  logo?: string;
  isPreferred: boolean;
}[];

export type VendorDetail = {
  id: string;
  vendorName: string;
  repName: string;
  contactNumber: string;
};

export type AddVendorToVenueVars = {
  venueId: string;
  vendorId: string;
  repName?: string;
  contactNumber?: string;
  email?: string;
};

export type RemoveVendorFromVenueVars = {
  venueId: string;
  vendorId: string;
};

const addVendorToVenue = async ({ venueId, ...data }: AddVendorToVenueVars) => {
  return await axios.post(`/venue/${venueId}/vendors`, data);
};

const removeVendorFromVenue = async ({ venueId, vendorId }: RemoveVendorFromVenueVars) => {
  return await axios.delete(`/venue/${venueId}/vendors/${vendorId}`);
};

const getGlobalVendors = async ({ venueId, query }: { venueId: string; query?: string }) => {
  return await axios.get<GlobalVendorList>(`/venue/${venueId}/vendors/global/list`, {
    params: { query },
  });
};

export const addVendorToVenueApi = axiosHandler(addVendorToVenue);
export const removeVendorFromVenueApi = axiosHandler(removeVendorFromVenue);
export const getGlobalVendorsApi = axiosHandler(getGlobalVendors);
