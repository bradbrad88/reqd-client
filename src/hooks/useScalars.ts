import { listFactory } from "api/querieFactory";

export const useUnitTypeList = listFactory<{ unitType: string }[], undefined>("unit-types");
export const usePackaageTypeList = listFactory<{ packageType: string }[], undefined>(
  "package-types"
);
export const useUnitOfMeasurementsList = listFactory<
  { unitOfMeasurement: string }[],
  undefined
>("unit-of-measurements");
