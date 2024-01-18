import { MouseEventHandler } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { cn } from "utils/cn";
import { createArrayOfLength } from "utils/arrays";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateStorageSpot } from "src/hooks/useAreas";
import StorageSpotSlot from "./StorageSpotSlot";
import Button from "common/Button";

import type {
  AreaDetail,
  AreaProduct,
  StorageSpace as StorageSpaceType,
  StorageSpot as StorageSpotType,
  UpdateSpot,
} from "api/areas";

const StorageSpot = ({
  spot,
  storageSpace,
}: {
  spot: StorageSpotType;
  storageSpace: StorageSpaceType;
}) => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { area } = useOutletContext<{ area: AreaDetail }>();
  const { updateSpot } = useUpdateStorageSpot();
  const productLine = area.productLines[spot.productLine] || null;
  const product = (area.products[productLine?.productId || ""] || null) as AreaProduct | null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setParams] = useSearchParams();

  const onEditingProduct = () => {
    setParams(params => {
      params.set("editProduct", "true");
      params.set("activeSpot", spot.id);
      return params;
    });
  };

  const onEditingParLevel = () => {
    setParams(params => {
      params.set("editParLevel", "true");
      params.set("activeSpot", spot.id);
      params.set("activeParLevel", String(productLine.parLevel));
      return params;
    });
  };

  const handleSpotUpdate = (update: UpdateSpot) => {
    updateSpot({
      venueId,
      areaId: areaId!,
      storageSpace: storageSpace.storageName,
      spotId: spot.id,
      update,
    });
  };

  const onAddColumn: MouseEventHandler = e => {
    e.stopPropagation();
    handleSpotUpdate({ columnWidth: spot.columnWidth + 1 });
  };

  const onRemoveColumn: MouseEventHandler = e => {
    e.stopPropagation();
    handleSpotUpdate({ columnWidth: spot.columnWidth - 1 });
  };

  const renderColumns = () => {
    return createArrayOfLength(spot.columnWidth).map(idx => {
      const originalColumn = idx === 0;
      const finalColumn = idx === spot.columnWidth - 1;
      return (
        <StorageSpotSlot key={idx}>
          <div
            className={cn(
              "relative border-[1px] border-zinc-200 rounded-lg gap-3 w-full h-full bg-white bg-opacity-10 overflow-hidden",
              originalColumn ? "border-white" : "border-zinc-400"
            )}
          >
            <div
              onClick={onEditingProduct}
              className={cn("h-full w-full", !originalColumn && "opacity-50")}
            >
              {product ? (
                <div
                  style={{ backgroundImage: product.image }}
                  className="h-full w-full bg-gradient-to-t from-transparent to-black/40 from-40% to-80%  p-2 "
                >
                  <p
                    className={cn(
                      "whitespace-normal leading-tight",
                      !originalColumn && "opacity-50"
                    )}
                  >
                    {product ? (
                      product.displayName
                    ) : (
                      <span className="text-zinc-300 italic text-center">
                        Choose a product
                      </span>
                    )}
                  </p>
                  <p className="italic leading-none mt-1 text-zinc-400 text-sm">
                    {product.size}
                    {product.unitOfMeasurement?.value} {product.unitType.plural}
                  </p>
                </div>
              ) : (
                <div className="flex h-full w-full whitespace-normal items-center  text-center text-zinc-200 italic">
                  Choose a product
                </div>
              )}
            </div>

            {/* Button panel */}
            <div className="absolute w-full flex justify-between gap-2 bottom-0 left-0 h-8">
              {/* Par Level feature */}
              {originalColumn && (
                <Button
                  className="h-full border-[1px] border-zinc-500 bg-zinc-800 px-1 rounded-lg rounded-br-none rounded-tl-none"
                  onClick={onEditingParLevel}
                >
                  <span className="min-w-[2rem] max-w-[4rem] truncate">
                    {productLine?.parLevel == null
                      ? "Par"
                      : `${productLine?.parLevel}${
                          product ? " " + product.unitType.plural : ""
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
