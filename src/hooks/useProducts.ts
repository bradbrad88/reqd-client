import { z } from "zod";
import { detailFactory, keys, listFactory } from "api/querieFactory";
import { useMutation } from "./useMutation";
import {
  createProductApi,
  deleteProductApi,
  updateProductApi,
  updateProductVendorApi,
} from "api/products";
import type { ProductList, ProductDetail } from "api/products";

type ProductFilters = {
  vendorId: string | string[] | undefined;
  areaId: string | string[] | undefined;
};

const RESOURCE = "products" as const;

export const useProductList = listFactory<ProductList, ProductFilters>(RESOURCE);
export const useProductDetail = detailFactory<ProductDetail>(RESOURCE);

export const useCreateProduct = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate, status } = useMutation(key, createProductApi);

  return { createProduct: mutate, status };
};

export const useDeleteProduct = (venueId: string) => {
  const key = keys.all(venueId, RESOURCE);
  const { mutate, status } = useMutation(key, deleteProductApi);

  return { deleteProduct: mutate, status };
};

const ProductsSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  unitType: z.object({
    value: z.string(),
    plural: z.string(),
  }),
  packageType: z.object({
    value: z.string(),
    plural: z.string(),
  }),
  packageQuantity: z.number(),
  size: z.number().nullish(),
  unitOfMeasurement: z
    .object({
      value: z.string(),
    })
    .nullish(),
});

export const useUpdateProductVendor = (venueId: string, productId: string) => {
  const key = keys.detail(venueId, RESOURCE, productId);
  const { mutate } = useMutation(key, updateProductVendorApi, (previous, vars) => {
    return { ...vars };
  });
  return { updateVendor: mutate };
};

export const useUpdateProduct = (venueId: string, productId: string) => {
  const key = keys.detail(venueId, RESOURCE, productId);
  const { mutate } = useMutation(key, updateProductApi, (previous, vars) => {
    // Optimistic Update
    const { update: updateFields, ...product } = vars;
    if (!previous) {
      let newProd = { ...product };
      (Object.keys(updateFields) as (keyof typeof updateFields)[]).forEach(key => {
        newProd = { ...newProd, [key]: updateFields[key] };
      });
      return newProd;
    }

    const data = ProductsSchema.parse(previous);
    let update = { ...data };
    // The update fields don't all have to be provided, so don't optimistically update all of them
    const keys = Object.keys(data) as (keyof typeof data)[];
    keys.forEach(key => {
      if (key === "id") return;
      const value = vars.update[key];
      if (value != null) update = { ...update, [key]: value };
    });

    return { ...update };
  });

  return { updateProduct: mutate };
};
