import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type StorageSpaceLocation = { storageSpace: string };
export type StorageSectionLocation = StorageSpaceLocation & { section: number };
export type StorageShelfLocation = StorageSectionLocation & { shelf: number };
export type StorageSpotLocation = StorageShelfLocation & { spot: number };

export type AreaList = {
  id: string;
  areaName: string;
}[];

export type AreaDetail = {
  id: string;
  areaName: string;
  storageSpaces: StorageSpace[];
};

export type StorageSpace = {
  storageName: string;
  sections: StorageSection[];
};

export type StorageSection = {
  position: number;
  shelves: StorageShelf[];
};

export type StorageShelf = {
  position: number;
  spots: StorageSpot[];
};

export type StorageSpot = {
  position: number;
  parLevel: number;
  productId: string | null;
  columnSpan: number;
  product?: {
    productId: string;
    displayName: string;
    size?: number;
    image: string;
    unitOfMeasurement?: { value: string };
    unitType: { value: string; plural: string };
  };
};

export type AddStorageSpaceVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
};

export type RenameAreaVars = { venueId: string; areaId: string; areaName: string };

export type DeleteAreaVars = { venueId: string; areaId: string };

export type SetStorageSectionCountVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  sectionCount: number;
};

export type SetStorageShelfCountVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  section: number;
  shelfCount: number;
};

export type AddStorageSpotVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  section: number;
  shelf: number;
  spot: {
    productId?: string;
    parLevel?: number;
    columnSpan?: number;
  };
};

export type UpdateSpot = {
  parLevel?: number | null;
  columnSpan?: number;
  productId?: string | null;
};

export type UpdateStorageSpotVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  section: number;
  shelf: number;
  spot: number;
  update: UpdateSpot;
};

export type RemoveStorageSpotVars = {
  venueId: string;
  areaId: string;
} & StorageSpotLocation;

export type RemoveStorageShelfVars = {
  venueId: string;
  areaId: string;
} & StorageShelfLocation;

export type RemoveStorageSectionVars = {
  venueId: string;
  areaId: string;
} & StorageSectionLocation;

export type RemoveStorageSpaceVars = {
  venueId: string;
  areaId: string;
} & StorageSpaceLocation;

export type CreateAreaVars = { venueId: string; areaName: string };

const createArea = async ({ venueId, areaName }: CreateAreaVars) => {
  return await axios.post<{ id: string; areaName: string }>(`/venue/${venueId}/areas`, {
    areaName,
  });
};

const renameArea = async ({ venueId, areaId, areaName }: RenameAreaVars) => {
  return await axios.patch(`/venue/${venueId}/areas/${areaId}`, { areaName });
};

const deleteArea = async ({ venueId, areaId }: DeleteAreaVars) => {
  return await axios.delete(`/venue/${venueId}/areas/${areaId}`);
};

const addStorageSpace = async ({ areaId, storageSpace, venueId }: AddStorageSpaceVars) => {
  return await axios.post(`/venue/${venueId}/areas/${areaId}`, { storageSpace });
};

const setStorageSectionCount = async ({
  venueId,
  areaId,
  sectionCount,
  storageSpace,
}: SetStorageSectionCountVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/section-count`, {
    storageSpace,
    sectionCount,
  });
};

const setStorageShelfCount = async ({
  venueId,
  areaId,
  storageSpace,
  section,
  shelfCount,
}: SetStorageShelfCountVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/shelf-count`, {
    storageSpace,
    section,
    shelfCount,
  });
};

const addStorageSpot = async ({
  venueId,
  areaId,
  storageSpace,
  section,
  shelf,
  spot,
}: AddStorageSpotVars) => {
  return await axios.post(`/venue/${venueId}/areas/${areaId}/spot`, {
    storageSpace,
    section,
    shelf,
    spot,
  });
};

const updateStorageSpot = async ({
  venueId,
  areaId,
  storageSpace,
  section,
  shelf,
  spot,
  update,
}: UpdateStorageSpotVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/spot`, {
    storageSpace,
    section,
    shelf,
    spot,
    update,
  });
};

const removeSpot = async ({ venueId, areaId, ...location }: RemoveStorageSpotVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-spot`, { ...location });
};

const removeShelf = async ({ venueId, areaId, ...location }: RemoveStorageShelfVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-shelf`, { ...location });
};

const removeSection = async ({ venueId, areaId, ...location }: RemoveStorageSectionVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-section`, { ...location });
};

const removeStorageSpace = async ({
  venueId,
  areaId,
  ...location
}: RemoveStorageSpaceVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-section`, { ...location });
};

export const createAreaApi = axiosHandler(createArea);
export const renameAreaApi = axiosHandler(renameArea);
export const deleteAreaApi = axiosHandler(deleteArea);
export const addStorageSpaceApi = axiosHandler(addStorageSpace);
export const setStorageSectionCountApi = axiosHandler(setStorageSectionCount);
export const setStorageShelfCountApi = axiosHandler(setStorageShelfCount);
export const addStorageSpotApi = axiosHandler(addStorageSpot);
export const updateStorageSpotApi = axiosHandler(updateStorageSpot);
export const removeStorageSpotApi = axiosHandler(removeSpot);
export const removeStorageShelfApi = axiosHandler(removeShelf);
export const removeStorageSectionApi = axiosHandler(removeSection);
export const removeStorageSpaceApi = axiosHandler(removeStorageSpace);
