import { z } from "zod";
import { detailFactory, listFactory } from "api/querieFactory";
import type { ProductDetail } from "./useProducts";
import { addProductToVenueArea, removeProductFromVenueArea } from "api/areas";
import { keys } from "api/querieFactory";
import { useMutation } from "./useMutation";

type AreaList = {
  id: string;
  areaName: string;
}[];
type AreaFilters = undefined;
type AreaDetail = {
  id: string;
  areaName: string;
  products: ProductDetail[];
};

export const useAreaList = listFactory<AreaList, AreaFilters>("areas");
export const useAreaDetail = detailFactory<AreaDetail>("areas");

const schema = z.object({
  id: z.string(),
  areaName: z.string(),
  products: z.object({ id: z.string(), displayName: z.string() }).array(),
});

export const useAddProductToArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, "areas", areaId);
  const { mutate } = useMutation(
    key,
    addProductToVenueArea,
    (previous, vars): z.infer<typeof schema> => {
      const data = schema.optional().parse(previous);

      if (!data) throw new Error("Area no longer exists");

      return {
        ...data,
        products: data.products.concat({ id: vars.productId, displayName: "loading" }),
      };
    }
  );
  return { mutate };
};

export const useRemoveProductFromArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, "areas", areaId);
  const { mutate } = useMutation(
    key,
    removeProductFromVenueArea,
    (previous, vars): z.infer<typeof schema> => {
      const data = schema.parse(previous);
      if (!data) throw new Error("Can't remove product from an area that no longer exists");
      return {
        ...data,
        products: data.products.filter(product => product.id !== vars.productId),
      };
    }
  );
  return { mutate };
};
