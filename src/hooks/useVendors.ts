import { detailFactory, keys, listFactory } from "api/querieFactory";
import { useMutation } from "./useMutation";
import { createVendorApi, deleteVendorApi } from "api/vendors";

type VendorList = {
  id: string;
  vendorName: string;
}[];
type VendorFilters = undefined;
type VendorDetail = {
  id: string;
  vendorName: string;
};
export const useVendorList = listFactory<VendorList, VendorFilters>("vendors");
export const useVendorDetail = detailFactory<VendorDetail>("vendors");

export const useCreateVendor = (venueId: string) => {
  const key = keys.all(venueId, "vendors");
  const { mutate, status } = useMutation(key, createVendorApi);

  return { createVendor: mutate, status };
};

export const useDeleteVendor = (venueId: string) => {
  const key = keys.all(venueId, "vendors");
  const { mutate, status } = useMutation(key, deleteVendorApi);

  return { deleteVendor: mutate, status };
};
