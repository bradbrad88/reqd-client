import { MouseEventHandler } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { cn } from "utils/cn";
import { createArrayOfLength } from "utils/arrays";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateStorageSpot } from "src/hooks/useAreas";
import StorageSpotSlot from "./StorageSpotSlot";
import Button from "common/Button";

import type { StorageSpot as StorageSpotType, UpdateSpot } from "api/areas";

const StorageSpot = ({
  spot,
  storageSpace,
  section,
  shelf,
  position,
}: {
  spot: StorageSpotType;
  storageSpace: string;
  section: number;
  shelf: number;
  position: number;
}) => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { updateSpot } = useUpdateStorageSpot();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setParams] = useSearchParams();

  const onEditingProduct = () => {
    setParams(params => {
      params.set("editProduct", "true");
      params.set("activeSection", String(section));
      params.set("activeShelf", String(shelf));
      params.set("activeSpot", String(position));
      return params;
    });
  };

  const onEditingParLevel = () => {
    setParams(params => {
      params.set("editParLevel", "true");
      params.set("activeSection", String(section));
      params.set("activeShelf", String(shelf));
      params.set("activeSpot", String(position));
      params.set("activeParLevel", String(spot.parLevel));
      return params;
    });
  };

  const handleSpotUpdate = (update: UpdateSpot) => {
    updateSpot({
      venueId,
      areaId: areaId!,
      storageSpace,
      section,
      shelf,
      spot: position,
      update,
    });
  };

  const onAddColumn: MouseEventHandler = e => {
    e.stopPropagation();
    handleSpotUpdate({ columnSpan: spot.columnSpan + 1 });
  };

  const onRemoveColumn: MouseEventHandler = e => {
    e.stopPropagation();
    handleSpotUpdate({ columnSpan: spot.columnSpan - 1 });
  };

  const renderColumns = () => {
    return createArrayOfLength(spot.columnSpan).map(idx => {
      const originalColumn = idx === 0;
      const finalColumn = idx === spot.columnSpan - 1;
      return (
        <StorageSpotSlot key={idx}>
          <div
            className={cn(
              "relative border-[1px] border-zinc-200 rounded-lg gap-3 w-full h-full bg-white bg-opacity-10 p-2",
              originalColumn ? "border-white" : "border-zinc-400"
            )}
          >
            <div
              onClick={onEditingProduct}
              className={cn("h-full w-full", !originalColumn && "opacity-50")}
            >
              {spot.product?.image ? (
                <img
                  className={cn(
                    "h-full w-full block whitespace-normal",
                    !originalColumn && "opacity-50"
                  )}
                  src={spot.product?.image}
                  alt={spot.product?.displayName}
                />
              ) : (
                <div className="whitespace-normal">
                  <p
                    className={cn(
                      "whitespace-normal leading-tight",
                      !originalColumn && "opacity-50"
                    )}
                  >
                    {spot.product?.displayName}
                  </p>
                  <p className="italic leading-none mt-1 text-zinc-400 text-sm">
                    {spot.product?.size}
                    {spot.product?.unitOfMeasurement?.value} {spot.product?.unitType.plural}
                  </p>
                </div>
              )}
            </div>

            {/* Button panel */}
            <div className="absolute w-full flex justify-between gap-2 bottom-0 left-0 h-8">
              {/* Par Level feature */}
              {originalColumn && (
                <Button
                  className="h-full bg-zinc-800 px-1 rounded-lg rounded-br-none rounded-tl-none"
                  onClick={onEditingParLevel}
                >
                  <span className="min-w-[2rem] max-w-[4rem] truncate">
                    {spot.parLevel == null
                      ? "Par"
                      : `${spot.parLevel}${
                          spot.product ? " " + spot.product.unitType.plural : ""
                        }`}
                  </span>
                </Button>
              )}

              {/* Column span feature */}
              {finalColumn && !originalColumn && (
                <div
                  onClick={onRemoveColumn}
                  className="border-[1px] border-indigo-700 bg-zinc-800 rounded-lg rounded-br-none rounded-tl-none w-full max-w-[2rem] flex items-center justify-center"
                >
                  {"-"}
                </div>
              )}
              {finalColumn && (
                <div
                  onClick={onAddColumn}
                  className="border-[1px] border-lime-700 bg-zinc-800 rounded-lg rounded-bl-none rounded-tr-none w-full max-w-[2rem] flex items-center justify-center"
                >
                  {"+"}
                </div>
              )}
            </div>
          </div>
        </StorageSpotSlot>
      );
    });
  };
  const columns = renderColumns();

  return columns;
};

export default StorageSpot;
