import { useMutation, useQuery, useQueryClient } from "react-query";
import { createVendor, deleteVendor, getVendorDetail, getVendorsList } from "api/vendors";
import { useVenueContext } from "../../hooks/useContexts";

export const useVendorList = (venueId: string) => {
  const key = vendorKeys.list(venueId);
  const { data, status, error } = useQuery(key, getVendorsList);
  return { vendors: data, status, error };
};

export const useVendorDetail = (vendorId: string) => {
  const { venueId } = useVenueContext();
  const key = vendorKeys.detail(venueId, vendorId);
  const { data } = useQuery(key, getVendorDetail);
  return { vendor: data };
};

export const useCreateVendor = () => {
  const client = useQueryClient();
  const { mutate, status } = useMutation(createVendor, {
    onSettled: (...args) => {
      const { venueId } = args[2];
      client.invalidateQueries(vendorKeys.all(venueId));
    },
  });

  return { mutate, status };
};

export const useDeleteVendor = (venueId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteVendor, {
    onMutate: async ({ vendorId }) => {
      const key = vendorKeys.all(venueId);
      await queryClient.cancelQueries(key);
      const detailKey = vendorKeys.detail(venueId, vendorId);
      queryClient.removeQueries({ queryKey: detailKey });
    },
    onSettled: () => {
      queryClient.invalidateQueries(vendorKeys.all(venueId));
    },
  });
  return { mutate };
};

export const vendorKeys = {
  all: (venueId: string) => [venueId, "vendors"] as const,
  lists: (venueId: string) => [...vendorKeys.all(venueId), "list"] as const,
  list: (venueId: string) => [...vendorKeys.lists(venueId)] as const,
  details: (venueId: string) => [...vendorKeys.all(venueId), "detail"] as const,
  detail: (venueId: string, vendorId: string) =>
    [...vendorKeys.details(venueId), vendorId] as const,
};
