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
  repName: string | null;
  contactNumber: string | null;
  email: string | null;
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

export type UpdatePreferredVendorContactVars = {
  venueId: string;
  vendorId: string;
  repName?: string;
  contactNumber?: string;
  email?: string;
};

const addVendorToVenue = async ({ venueId, ...data }: AddVendorToVenueVars) => {
  return await axios.post(`/venue/${venueId}/vendors`, data);
};

const removeVendorFromVenue = async ({ venueId, vendorId }: RemoveVendorFromVenueVars) => {
  return await axios.delete(`/venue/${venueId}/vendors/${vendorId}`);
};

const updatePreferredVendorContact = async ({
  venueId,
  vendorId,
  ...data
}: UpdatePreferredVendorContactVars) => {
  return await axios.put(`/venue/${venueId}/vendors/${vendorId}`, data);
};

const getGlobalVendors = async ({ venueId, query }: { venueId: string; query?: string }) => {
  return await axios.get<GlobalVendorList>(`/venue/${venueId}/vendors/global/list`, {
    params: { query },
  });
};

export const addVendorToVenueApi = axiosHandler(addVendorToVenue);
export const removeVendorFromVenueApi = axiosHandler(removeVendorFromVenue);
export const getGlobalVendorsApi = axiosHandler(getGlobalVendors);
export const UpdatePreferredVendorContactApi = axiosHandler(updatePreferredVendorContact);
