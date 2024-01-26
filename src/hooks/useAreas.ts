import { detailFactory, listFactory } from "api/querieFactory";

import {
  addStorageSpaceApi,
  setStorageSpotCountApi,
  createAreaApi,
  deleteAreaApi,
  editProductLineApi,
  removeProductLineApi,
  removeStorageSectionApi,
  removeStorageShelfApi,
  removeStorageSpotApi,
  renameAreaApi,
  setProductLineApi,
  setStorageSectionCountApi,
  setStorageShelfCountApi,
  updateStorageSpotApi,
  moveSpotApi,
  renameStorageSpaceApi,
  removeStorageSpaceApi,
} from "api/areas";
import type {
  AreaList,
  AreaDetail,
  SetStorageShelfCountVars,
  SetStorageSectionCountVars,
  SetStorageSpotCountVars,
  UpdateStorageSpotVars,
  RemoveStorageSpotVars,
  RemoveStorageShelfVars,
  RemoveStorageSectionVars,
  CreateAreaVars,
  RenameAreaVars,
  AddStorageSpaceVars,
  DeleteAreaVars,
  SetProductLineVars,
  EditProductLineVars,
  RemoveProductLineVars,
  MoveSpotVars,
  RenameStorageSpaceVars,
  RemoveStorageSpaceVars,
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
    onSettled: async vars => {
      if (!vars) return;
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [vars.venueId, "areas", "detail", vars.areaId],
        exact: true,
      });
    },
  });
  return {
    renameArea: mutate,
  };
};

export const useDeleteArea = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: DeleteAreaVars) => {
      await deleteAreaApi(vars);
      return { ...vars };
    },
    onMutate: async vars => {
      await client.cancelQueries();
      client.setQueryData([vars.venueId, "areas", "detail", vars.areaId], undefined);
      const areaList = client.getQueryData([vars.venueId, "areas", "list", null]) as AreaList;
      const filteredList = areaList.filter(area => area.id !== vars.areaId);
      client.setQueryData([vars.venueId, "areas", "list", null], filteredList);
    },
    onSettled: async ctx => {
      await client.cancelQueries();
      client.invalidateQueries([ctx?.venueId, "areas"], { exact: false });
    },
  });
  return { deleteArea: mutate };
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

export const useRemoveStorageSpace = () => {
  const client = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (vars: RemoveStorageSpaceVars) => {
      await removeStorageSpaceApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId], { exact: false });
    },
  });
  return {
    removeStorageSpace: mutate,
    status,
  };
};

export const useRenameStorageSpace = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: RenameStorageSpaceVars) => {
      await renameStorageSpaceApi(vars);
      return { ...vars };
    },
    onMutate: async vars => {
      const key = [vars.venueId, "areas", "detail", vars.areaId];
      const query = client.getQueryData(key) as AreaDetail | null;
      if (!query) return;
      const storageSpaceLayout = query.storageSpaceLayout.map(space => {
        if (space === vars.storageSpace) return vars.newName;
        return space;
      });
      const storageSpaces = {
        ...query.storageSpaces,
        [vars.newName]: query.storageSpaces[vars.storageSpace],
      };
      delete storageSpaces[vars.storageSpace];
      const newArea: AreaDetail = {
        ...query,
        storageSpaces,
        storageSpaceLayout,
      };
      client.setQueryData(key, newArea);
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({ queryKey: [ctx.venueId, "areas", "detail", ctx.areaId] });
    },
  });
  return {
    renameStorageSpace: mutate,
  };
};

export const useSetProductLine = () => {
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (vars: SetProductLineVars) => {
      await setProductLineApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [ctx.venueId, "areas", "detail", ctx.areaId],
        exact: false,
      });
    },
  });

  return { setProductLine: mutate, isLoading };
};

export const useEditProductLine = () => {
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (vars: EditProductLineVars) => {
      await editProductLineApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [ctx.venueId, "areas", "detail", ctx.areaId],
        exact: false,
      });
    },
  });

  return { editProductLine: mutate, isLoading };
};

export const useRemoveProductLine = () => {
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (vars: RemoveProductLineVars) => {
      await removeProductLineApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      await client.cancelQueries();
      client.invalidateQueries({
        queryKey: [ctx.venueId, "areas", "detail", ctx.areaId],
        exact: false,
      });
    },
  });

  return { removeProductLine: mutate, isLoading };
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
    mutationFn: async (vars: SetStorageSpotCountVars) => {
      await setStorageSpotCountApi(vars);
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

export const useMoveStorageSpot = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (vars: MoveSpotVars) => {
      await moveSpotApi(vars);
      return { ...vars };
    },
    onSettled: async ctx => {
      if (!ctx) return;
      client.invalidateQueries([ctx.venueId, "areas", "detail", ctx.areaId]);
    },
  });
  return { moveSpot: mutate };
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
