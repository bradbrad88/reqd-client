import { listFactory } from "api/querieFactory";

export const useUnitTypeList = listFactory<{ value: string; plural: string }[], undefined>(
  "unit-types"
);
export const usePackaageTypeList = listFactory<{ value: string; plural: string }[], undefined>(
  "package-types"
);
export const useUnitOfMeasurementsList = listFactory<{ value: string }[], undefined>(
  "unit-of-measurements"
);
