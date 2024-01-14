import { detailFactory, listFactory } from "api/querieFactory";

import {
  addStorageSpaceApi,
  addStorageSpotApi,
  createAreaApi,
  removeStorageSectionApi,
  removeStorageShelfApi,
  removeStorageSpotApi,
  renameAreaApi,
  setStorageSectionCountApi,
  setStorageShelfCountApi,
  updateStorageSpotApi,
} from "api/areas";
import type {
  AreaList,
  AreaDetail,
  SetStorageShelfCountVars,
  SetStorageSectionCountVars,
  AddStorageSpotVars,
  UpdateStorageSpotVars,
  RemoveStorageSpotVars,
  RemoveStorageShelfVars,
  RemoveStorageSectionVars,
  CreateAreaVars,
  RenameAreaVars,
  AddStorageSpaceVars,
} from "api/areas";
import { useMutation, useQueryClient } from "react-query";

type AreaFilters = undefined;

const RESOURCE = "areas" as const;

export const useAreaList = listFactory<AreaList, AreaFilters>(RESOURCE);
export const useAreaDetail = detailFactory<AreaDetail>(RESOURCE);

export const useCreateArea = () => {
  const client = useQueryClient();
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (vars: CreateAreaVars) => {
      await createAreaApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({ queryKey: [ctx.venueId, "areas"], exact: false });
    },
  });
  return { createArea: mutateAsync, isLoading };
};

export const useRenameArea = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: RenameAreaVars) => {
      await renameAreaApi(vars);
      return { ...vars };
    },
    onMutate: async vars => {
      await client.cancelQueries();
      const key = [vars.venueId, "areas", "detail", vars.areaId];
      const previousArea = client.getQueryData(key);
      if (!previousArea) return;
      client.setQueryData(key, { ...previousArea, areaName: vars.areaName });
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [ctx.venueId, "areas", "detail", ctx.areaId],
        exact: true,
      });
    },
  });
  return {
    renameArea: mutate,
  };
};

export const useAddStorageSpace = () => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (vars: AddStorageSpaceVars) => {
      await addStorageSpaceApi(vars);
      return { ...vars };
    },

    onSettled: async ctx => {
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [ctx?.venueId, "areas", "detail", ctx?.areaId],
        exact: false,
      });
    },
  });

  return { addStorageSpace: mutateAsync, isLoading };
};

export const useSetStorageSectionCount = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: SetStorageSectionCountVars) => {
      await setStorageSectionCountApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries({
        queryKey: [ctx.venueId, "areas", "detail", ctx.areaId],
        exact: false,
      });
    },
  });

  return { setSectionCount: mutate };
};

export const useSetStorageShelfCount = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: SetStorageShelfCountVars) => {
      await setStorageShelfCountApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });

  return {
    setShelfCount: mutate,
  };
};

export const useAddStorageSpot = () => {
  const client = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (vars: AddStorageSpotVars) => {
      await addStorageSpotApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return {
    addSpot: mutateAsync,
  };
};

export const useUpdateStorageSpot = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: UpdateStorageSpotVars) => {
      await updateStorageSpotApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return {
    updateSpot: mutate,
  };
};

export const useRemoveSpot = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: RemoveStorageSpotVars) => {
      await removeStorageSpotApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return {
    removeSpot: mutate,
  };
};

export const useRemoveShelf = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: RemoveStorageShelfVars) => {
      await removeStorageShelfApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return {
    removeShelf: mutate,
  };
};

export const useRemoveSection = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: RemoveStorageSectionVars) => {
      await removeStorageSectionApi(vars);
      return { ...vars };
    },
    onMutate: async () => {
      await client.cancelQueries();
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return {
    removeSection: mutate,
  };
};
