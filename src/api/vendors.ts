import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type VendorList = {
  id: string;
  vendorName: string;
  logo: string;
}[];

export type VendorDetail = {
  id: string;
  vendorName: string;
  repName: string;
  contactNumber: string;
};

export type RemoveVendorFromVenueVars = {
  venueId: string;
  vendorId: string;
};

const removeVendorFromVenue = async ({ venueId, vendorId }: RemoveVendorFromVenueVars) => {
  return await axios.delete(`/venue/${venueId}/vendors/${vendorId}`);
};

export const removeVendorFromVenueApi = axiosHandler(removeVendorFromVenue);
