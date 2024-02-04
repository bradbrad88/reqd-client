import { detailFactory, listFactory } from "api/querieFactory";
import {
  AddVendorToVenueVars,
  RemoveVendorFromVenueVars,
  UpdatePreferredVendorContactApi,
  UpdatePreferredVendorContactVars,
  VendorDetail,
  VendorList,
  addVendorToVenueApi,
  getGlobalVendorsApi,
  removeVendorFromVenueApi,
} from "api/vendors";
import { useMutation, useQuery, useQueryClient } from "react-query";

const RESOURCE_TYPE = "vendors";

export type VendorFilters = null;

export const useVendorList = listFactory<VendorList, VendorFilters>(RESOURCE_TYPE);
export const useVendorDetail = detailFactory<VendorDetail>(RESOURCE_TYPE);

export const useGlobalVendorList = (venueId: string, query: string) => {
  const queryKey = [venueId, RESOURCE_TYPE, "global", "list", query];
  const { data, status } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getGlobalVendorsApi({ venueId, query });
    },
  });
  return {
    globalVendorList: data || [],
    status,
  };
};

export const useAddVendorToVenue = () => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (vars: AddVendorToVenueVars) => {
      await addVendorToVenueApi(vars);
      return { ...vars };
    },
    onSettled: async vars => {
      if (!vars) return;
      await client.cancelQueries();
      client.invalidateQueries([vars.venueId, RESOURCE_TYPE, "list"], { exact: false });
      client.invalidateQueries([vars.venueId, RESOURCE_TYPE, "global"], { exact: false });
    },
  });

  return {
    addVendor: mutateAsync,
  };
};

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

export const useUpdatePreferredVendorContact = () => {
  const client = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (vars: UpdatePreferredVendorContactVars) => {
      await UpdatePreferredVendorContactApi(vars);
      return { ...vars };
    },
    onMutate: async vars => {
      await client.cancelQueries();
      const key = [vars.venueId, RESOURCE_TYPE, "detail", vars.vendorId];
      const prev = (client.getQueryData(key) as VendorDetail) || undefined;
      if (!prev) return;
      if (vars.repName != null) prev.repName = vars.repName;
      if (vars.contactNumber != null) prev.contactNumber = vars.contactNumber;
      if (vars.email != null) prev.email = vars.email;
      client.setQueryData(key, prev);
    },
    onSettled: async vars => {
      if (!vars) return;
      await client.cancelQueries();
      client.invalidateQueries([vars.venueId, RESOURCE_TYPE, "detail", vars.vendorId], {
        exact: false,
      });
    },
  });

  return {
    updatePreferredVendorContact: mutate,
    status,
  };
};
