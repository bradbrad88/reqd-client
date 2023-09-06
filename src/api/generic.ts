/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryFunction } from "react-query";
import axios from "config/axios";

export const getResource: QueryFunction<
  any,
  [string, string, string, { [key: string]: any }]
> = async <Data, Venue, Resource, ResourceType, Params>({
  queryKey: [venueId, resource, resourceType, params],
}: {
  queryKey: [Venue, Resource, ResourceType, Params];
}): Promise<Data> => {
  const res = await axios.get(`/venue/${venueId}/${resource}/${resourceType}`, { params });
  return res.data.data as Data;
};
