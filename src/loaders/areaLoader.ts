import { QueryClient } from "react-query";
import { getAreaProducts } from "../api/areas";

const areaQuery = (areaId: string, venueId: string) => ({
  queryKey: ["area-products", areaId, venueId],
  queryFn: () => getAreaProducts({ venueId, areaId }),
});

export const loader =
  (queryClient: QueryClient, venueId: string) =>
  async ({ params }: { params: unknown }) => {
    if (
      !params ||
      typeof params !== "object" ||
      !("areaId" in params) ||
      typeof params.areaId !== "string"
    )
      return null;
    const query = areaQuery(params.areaId, venueId);

    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };
