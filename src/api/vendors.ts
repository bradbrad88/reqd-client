import axios from "../config/axios";
import { vendorKeys } from "features/vendors/queries";

import type { QueryFunction } from "react-query";

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

type VendorListKey = ReturnType<typeof vendorKeys.list>;

export const getVendorsList: QueryFunction<VendorList, VendorListKey> = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryKey: [venueId],
}) => {
  const res = await axios.get(`/venue/${venueId}/vendors/list`);
  return res.data.data;
};

type VendorDetailKey = ReturnType<typeof vendorKeys.detail>;

export const getVendorDetail: QueryFunction<VendorDetail, VendorDetailKey> = async ({
  queryKey: [venueId, resource, resourceType, vendorId],
}) => {
  const res = await axios.get(`/venue/${venueId}/${resource}/${resourceType}/${vendorId}`);
  return res.data.data;
};

type CreateVendor = {
  venueId: string;
  vendorName: string;
  contactNumber?: string;
  repName?: string;
};

export const createVendor = async ({
  venueId,
  vendorName,
  contactNumber = "",
  repName = "",
}: CreateVendor) => {
  const res = await axios.post(`/venue/${venueId}/vendors`, {
    vendorName,
    contactNumber,
    repName,
  });

  return res.data.data;
};

export const deleteVendor = async ({
  venueId,
  vendorId,
}: {
  venueId: string;
  vendorId: string;
}) => {
  const res = await axios.delete(`/venue/${venueId}/vendors/${vendorId}`);
  return res.data.data;
};
