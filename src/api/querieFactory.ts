import { useQuery } from "react-query";
import axios from "config/axios";

type Resource = string;

export const keys = {
  all: (venueId: string, resource: Resource) => [venueId, resource] as const,
  lists: (venueId: string, resource: Resource) =>
    [...keys.all(venueId, resource), "list"] as const,
  list: (venueId: string, resource: Resource, filter: unknown) =>
    [...keys.lists(venueId, resource), filter] as const,
  details: (venueId: string, resource: Resource) =>
    [...keys.all(venueId, resource), "detail"] as const,
  detail: (venueId: string, resource: Resource, id: string) =>
    [...keys.details(venueId, resource), id] as const,
};

export const listFactory =
  <Data, Filter>(resource: string) =>
  (venueId: string, filter?: Filter) => {
    const key = keys.list(venueId, resource, filter);
    const { data, status } = useQuery(
      key,
      async ({ queryKey: [venueId, resource, resourceType, params] }): Promise<Data> => {
        const res = await axios.get(`venue/${venueId}/${resource}/${resourceType}`, {
          params,
        });
        return res.data.data;
      }
    );
    return { data, status };
  };

export const detailFactory =
  <Data>(resource: Resource) =>
  (id: string, venueId: string) => {
    const key = keys.detail(venueId, resource, id);
    const { data, status } = useQuery(
      key,
      async ({ queryKey: [venueId, resource, resourceType, id] }): Promise<Data> => {
        const res = await axios.get(`/venue/${venueId}/${resource}/${resourceType}/${id}`);
        return res.data.data;
      }
    );
    return { data, status };
  };
