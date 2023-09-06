import { detailFactory, listFactory } from "api/querieFactory";

import type { ProductDetail } from "./useProducts";

import { addProductToVenueArea, removeProductFromVenueArea } from "api/areas";

import { keys } from "api/querieFactory";
import { useMutation } from "./useMutation";

import { z } from "zod";

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
  // const client = useQueryClient();
  // const key = keys.detail(venueId, "areas", areaId);
  // const { mutate: removeProduct } = useMutation(removeProductFromVenueArea, {
  //   onMutate: async () => {
  //     await client.cancelQueries(key);
  //     const previous = client.getQueryData(key) as {
  //       products: { id: string; displayName: string }[];
  //     };
  //     if (previous) {
  //       client.setQueryData(key, {
  //         ...previous,
  //         products: previous.products.filter(product => product.id !== productId),
  //       });
  //     }
  //     return { previous };
  //   },
  //   onSettled: () => {
  //     client.invalidateQueries(key);
  //   },
  //   onError: (_, __, context) => {
  //     if (context?.previous) {
  //       client.setQueryData(key, context.previous);
  //     }
  //   },
  // });

  // const { mutate: addProduct } = useMutation(addProductToVenueArea, {
  //   onMutate: async () => {
  //     await client.cancelQueries(key);
  //     const prev = client.getQueryData(key) as {
  //       products: { id: string; displayName: string }[];
  //     };
  //     client.setQueryData(key, {
  //       ...prev,
  //       products: prev.products.concat({ id: productId, displayName: "Loading" }),
  //     });
  //   },
  //   onSettled: () => {
  //     client.invalidateQueries(key);
  //   },
  // });

  // return { removeProduct, addProduct };
};
