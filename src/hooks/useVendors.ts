import { detailFactory, listFactory } from "api/querieFactory";
import {
  RemoveVendorFromVenueVars,
  VendorDetail,
  VendorList,
  removeVendorFromVenueApi,
} from "api/vendors";
import { useMutation, useQueryClient } from "react-query";

const RESOURCE_TYPE = "vendors";

export type VendorFilters = null;

export const useVendorList = listFactory<VendorList, VendorFilters>(RESOURCE_TYPE);
export const useVendorDetail = detailFactory<VendorDetail>(RESOURCE_TYPE);

export const useRemoveVendorFromVenue = () => {
  const client = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (vars: RemoveVendorFromVenueVars) => {
      await removeVendorFromVenueApi(vars);
      return { ...vars };
    },
    onMutate: async vars => {
      await client.cancelQueries();
      const key = [vars.venueId, RESOURCE_TYPE, "list"];
      const query = client.getQueryData(key, { exact: false }) as VendorList | undefined;
      if (!query) return;
      const filteredVendors = query.filter(vendor => vendor.id !== vars.vendorId);
      client.setQueryData(key, filteredVendors);
      const detailKey = [vars.venueId, RESOURCE_TYPE, "detail", vars.vendorId];
      client.removeQueries({ queryKey: detailKey });
    },
    onSettled: async vars => {
      if (!vars) return;
      await client.cancelQueries();
      const key = [vars.venueId, RESOURCE_TYPE, "list"];
      client.invalidateQueries({ queryKey: key });
    },
  });

  return { removeVendor: mutate, status };
};
