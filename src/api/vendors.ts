import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type VendorList = {
  id: string;
  vendorName: string;
}[];

type VendorDetail = {
  id: string;
  vendorName: string;
  repName: string;
  contactNumber: string;
};

type CreateVendor = {
  venueId: string;
  vendorName: string;
  contactNumber?: string;
  repName?: string;
};

const createVendor = async ({
  venueId,
  vendorName,
  contactNumber = "",
  repName = "",
}: CreateVendor) => {
  return await axios.post<VendorDetail>(`/venue/${venueId}/vendors`, {
    vendorName,
    contactNumber,
    repName,
  });
};

const deleteVendor = async ({ venueId, vendorId }: { venueId: string; vendorId: string }) => {
  return await axios.delete(`/venue/${venueId}/vendors/${vendorId}`);
};

export const createVendorApi = axiosHandler(createVendor);
export const deleteVendorApi = axiosHandler(deleteVendor);
