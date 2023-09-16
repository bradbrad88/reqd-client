import { z } from "zod";
import { detailFactory, listFactory, keys } from "api/querieFactory";
import { useMutation } from "./useMutation";
import {
  addProductToVenueAreaApi,
  createAreaApi,
  deleteAreaApi,
  removeProductFromVenueAreaApi,
  setProductLocationParLevelApi,
} from "api/areas";
import type { AreaList, AreaDetail } from "api/areas";

type AreaFilters = undefined;

const RESOURCE = "areas" as const;

export const useAreaList = listFactory<AreaList, AreaFilters>(RESOURCE);
export const useAreaDetail = detailFactory<AreaDetail>(RESOURCE);

const schema = z.object({
  id: z.string(),
  areaName: z.string(),
  products: z
    .object({ id: z.string(), productId: z.string(), displayName: z.string() })
    .array(),
});

export const useCreateArea = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate } = useMutation(key, createAreaApi);
  return { mutate };
};

export const useDeleteArea = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate } = useMutation(key, deleteAreaApi);
  return { deleteArea: mutate };
};

export const useAddProductToArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, RESOURCE, areaId);
  const { mutate } = useMutation(key, addProductToVenueAreaApi);
  return { mutate };
};

export const useRemoveProductFromArea = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, RESOURCE, areaId);
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
  return { removeProduct: mutate };
};

export const useSetProductLocationParLevel = (venueId: string, areaId: string) => {
  const key = keys.detail(venueId, RESOURCE, areaId);
  const { mutate } = useMutation(
    key,
    setProductLocationParLevelApi,
    (previous, vars): AreaDetail => {
      const newLocations = vars.products.map(product => {
        if (product.id !== vars.productLocationId) return product;
        return { ...product, parLevel: vars.parLevel };
      });
      return { id: vars.id, areaName: vars.areaName, products: newLocations };
    }
  );

  return { setParLevel: mutate };
};
