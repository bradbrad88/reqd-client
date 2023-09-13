import { z } from "zod";
import { detailFactory, listFactory, keys } from "api/querieFactory";
import { useMutation } from "./useMutation";
import {
  addProductToVenueAreaApi,
  createAreaApi,
  removeProductFromVenueAreaApi,
} from "api/areas";

type AreaList = {
  id: string;
  areaName: string;
}[];
type AreaFilters = undefined;
export type ProductLocation = {
  id: string;
  productId: string;
  parLevel: number;
  sortedOrder: number;
  displayName: string;
  size: number;
  measure: string;
  package: string;
  packageType: string;
  orderUnits: string;
};
type AreaDetail = {
  id: string;
  areaName: string;
  products: ProductLocation[];
};

export const useAreaList = listFactory<AreaList, AreaFilters>("areas");
export const useAreaDetail = detailFactory<AreaDetail>("areas");

const schema = z.object({
  id: z.string(),
  areaName: z.string(),
  products: z
    .object({ id: z.string(), productId: z.string(), displayName: z.string() })
    .array(),
});

export const useCreateArea = (venueId: string) => {
  const key = keys.all(venueId, "areas");
  const { mutate } = useMutation(key, createAreaApi);
  return { mutate };
};

export const useAddProductToArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, "areas", areaId);
  const { mutate } = useMutation(key, addProductToVenueAreaApi);
  return { mutate };
};

export const useRemoveProductFromArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, "areas", areaId);
  const { mutate } = useMutation(
    key,
    removeProductFromVenueAreaApi,
    (previous, vars): z.infer<typeof schema> => {
      const data = schema.parse(previous);
      if (!data) throw new Error("Can't remove product from an area that no longer exists");
      return {
        ...data,
        products: data.products.filter(product => product.id !== vars.productLocation),
      };
    }
  );
  return { mutate };
};
