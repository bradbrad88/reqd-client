import { detailFactory, listFactory } from "api/querieFactory";

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
