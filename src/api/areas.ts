import axios from "../config/axios";
import { axiosHandler } from "./axiosHandler";

export type StorageSpaceLocation = { storageSpace: string };
export type StorageSectionLocation = StorageSpaceLocation & { sectionId: string };
export type StorageShelfLocation = StorageSpaceLocation & { shelfId: string };
export type StorageSpotLocation = StorageSpaceLocation & { spotId: string };

export type AreaList = {
  id: string;
  areaName: string;
}[];

export type AreaDetail = {
  id: string;
  areaName: string;
  storageSpaces: StorageSpaceMap;
  storageSpaceLayout: string[];
  currentIdSequence: string;
  products: AreaProductMap;
  productLines: ProductLineMap;
};

export type StorageSpaceMap = Record<string, StorageSpace>;

export type StorageSpace = {
  storageName: string;
  sections: StorageSectionMap;
  shelves: StorageShelfMap;
  spots: StorageSpotMap;
  sectionLayout: string[];
  currentIdSequence: string;
};

export type StorageSectionMap = Record<string, StorageSection>;
export type StorageShelfMap = Record<string, StorageShelf>;
export type StorageSpotMap = Record<string, StorageSpot>;
export type AreaProductMap = Record<string, AreaProduct>;
export type ProductLineMap = Record<string, ProductLine>;

export type StorageSection = {
  id: string;
  shelfLayout: string[];
};

export type StorageShelf = {
  id: string;
  spotLayout: string[];
};

export type AreaProduct = {
  productId: string;
  displayName: string;
  size?: number;
  image: string;
  unitOfMeasurement?: { value: string };
  unitType: { value: string; plural: string };
};

export type StorageSpot = {
  id: string;
  shelfId: string;
  productLine: string;
  stackHeight: number;
  columnWidth: number;
};

export type ProductLine = {
  id: string;
  productId: string | null;
  parLevel: number | null;
};

// API Variables
export type CreateAreaVars = {
  venueId: string;
  areaName: string;
  layoutType: "list" | "layout";
};

export type RenameAreaVars = { venueId: string; areaId: string; areaName: string };

export type DeleteAreaVars = { venueId: string; areaId: string };

export type AddStorageSpaceVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  layoutType: "list" | "layout";
};

export type RemoveStorageSpaceVars = {
  venueId: string;
  areaId: string;
} & StorageSpaceLocation;

export type RenameStorageSpaceVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  newName: string;
};

export type MoveStorageSpaceVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  newIndex: number;
};

export type SetProductLineVars = {
  venueId: string;
  areaId: string;
  productLine: UpdateProductLine;
  location: ProductLineLocation;
};

export type UpdateProductLine = { parLevel?: number | null; productId?: string | null };

type ProductLineLocation =
  | { storageSpace: string; index: number }
  | { storageSpace: string; spotId: string };

export type EditProductLineVars = {
  venueId: string;
  areaId: string;
  productLine: string;
  update: UpdateProductLine;
};

export type RemoveProductLineVars = {
  venueId: string;
  areaId: string;
  location: ProductLineLocation;
};

export type SetStorageSectionCountVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  count: number;
};

export type SetStorageShelfCountVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  sectionId: string;
  count: number;
};

export type SetStorageSpotCountVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  shelfId: string;
  count: number;
};

export type UpdateSpot = {
  columnWidth?: number;
  stackHeight?: number;
};

export type UpdateStorageSpotVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  spotId: string;
  update: UpdateSpot;
};

export type RemoveStorageSectionVars = {
  venueId: string;
  areaId: string;
} & StorageSectionLocation;

export type RemoveStorageShelfVars = {
  venueId: string;
  areaId: string;
} & StorageShelfLocation;

export type RemoveStorageSpotVars = {
  venueId: string;
  areaId: string;
} & StorageSpotLocation;

const createArea = async ({ venueId, areaName, layoutType }: CreateAreaVars) => {
  return await axios.post<{ id: string; areaName: string }>(`/venue/${venueId}/areas`, {
    areaName,
    layoutType,
  });
};

const renameArea = async ({ venueId, areaId, areaName }: RenameAreaVars) => {
  return await axios.patch(`/venue/${venueId}/areas/${areaId}`, { areaName });
};

const deleteArea = async ({ venueId, areaId }: DeleteAreaVars) => {
  return await axios.delete(`/venue/${venueId}/areas/${areaId}`);
};

const addStorageSpace = async ({
  areaId,
  storageSpace,
  venueId,
  layoutType,
}: AddStorageSpaceVars) => {
  return await axios.post(`/venue/${venueId}/areas/${areaId}`, { storageSpace, layoutType });
};

const removeStorageSpace = async ({
  venueId,
  areaId,
  ...location
}: RemoveStorageSpaceVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-storage-space`, {
    ...location,
  });
};

const renameStorageSpace = async ({ venueId, areaId, ...data }: RenameStorageSpaceVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/rename-storage-space`, data);
};

const moveStorageSpace = async ({ venueId, areaId, ...data }: MoveStorageSpaceVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/move-storage-space`, data);
};

const setProductLine = async ({
  venueId,
  areaId,
  location,
  productLine,
}: SetProductLineVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/set-product-line`, {
    location,
    productLine,
  });
};

const editProductLine = async ({
  venueId,
  areaId,
  productLine,
  update,
}: EditProductLineVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/edit-product-line`, {
    productLine,
    update,
  });
};

const removeProductLine = async ({ venueId, areaId, location }: RemoveProductLineVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-product-line`, {
    location,
  });
};

const setStorageSectionCount = async ({
  venueId,
  areaId,
  count,
  storageSpace,
}: SetStorageSectionCountVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/section-count`, {
    storageSpace,
    count,
  });
};

const setStorageShelfCount = async ({
  venueId,
  areaId,
  storageSpace,
  sectionId,
  count,
}: SetStorageShelfCountVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/shelf-count`, {
    storageSpace,
    sectionId,
    count,
  });
};

const setStorageSpotCount = async ({
  venueId,
  areaId,
  storageSpace,
  shelfId,
  count,
}: SetStorageSpotCountVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/spot-count`, {
    storageSpace,
    shelfId,
    count,
  });
};

export type MoveSpotVars = {
  venueId: string;
  areaId: string;
  storageSpace: string;
  spotId: string;
  shelfId: string;
  index: number;
};

const moveSpot = async ({ venueId, areaId, ...data }: MoveSpotVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/move-spot`, data);
};

const updateStorageSpot = async ({
  venueId,
  areaId,
  storageSpace,
  spotId,
  update,
}: UpdateStorageSpotVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/update-spot`, {
    storageSpace,
    spotId,
    update,
  });
};

const removeSection = async ({ venueId, areaId, ...location }: RemoveStorageSectionVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-section`, { ...location });
};

const removeShelf = async ({ venueId, areaId, ...location }: RemoveStorageShelfVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-shelf`, { ...location });
};

const removeSpot = async ({ venueId, areaId, ...location }: RemoveStorageSpotVars) => {
  return await axios.put(`/venue/${venueId}/areas/${areaId}/remove-spot`, { ...location });
};

export const createAreaApi = axiosHandler(createArea);
export const renameAreaApi = axiosHandler(renameArea);
export const deleteAreaApi = axiosHandler(deleteArea);
export const addStorageSpaceApi = axiosHandler(addStorageSpace);
export const removeStorageSpaceApi = axiosHandler(removeStorageSpace);
export const renameStorageSpaceApi = axiosHandler(renameStorageSpace);
export const moveStorageSpaceApi = axiosHandler(moveStorageSpace);
export const setProductLineApi = axiosHandler(setProductLine);
export const editProductLineApi = axiosHandler(editProductLine);
export const removeProductLineApi = axiosHandler(removeProductLine);
export const setStorageSectionCountApi = axiosHandler(setStorageSectionCount);
export const setStorageShelfCountApi = axiosHandler(setStorageShelfCount);
export const setStorageSpotCountApi = axiosHandler(setStorageSpotCount);
export const moveSpotApi = axiosHandler(moveSpot);
export const updateStorageSpotApi = axiosHandler(updateStorageSpot);
export const removeStorageSpotApi = axiosHandler(removeSpot);
export const removeStorageShelfApi = axiosHandler(removeShelf);
export const removeStorageSectionApi = axiosHandler(removeSection);
