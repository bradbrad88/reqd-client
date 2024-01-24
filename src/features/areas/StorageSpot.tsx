import { ComponentType, MouseEventHandler } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "utils/cn";
import { createArrayOfLength } from "utils/arrays";
import { useAreaContext, useVenueContext } from "src/hooks/useContexts";
import { useUpdateStorageSpot } from "src/hooks/useAreas";
import Button from "common/Button";
import DragIcon from "common/icons/Drag";
import StorageSpotSlot from "./StorageSpotSlot";
import "./storageSpot.css";

import type {
  AreaProduct,
  StorageSpace as StorageSpaceType,
  StorageSpot as StorageSpotType,
  UpdateSpot,
} from "api/areas";

const StorageSpot = ({
  spot,
  storageSpace,
  Handle,
  isDragging = false,
}: {
  spot: StorageSpotType;
  storageSpace: StorageSpaceType;
  Handle: ComponentType<{ children: React.ReactNode }>;
  isDragging?: boolean;
}) => {
  const { venueId } = useVenueContext();
  const {
    area: { id: areaId, productLines, products },
  } = useAreaContext();
  const { updateSpot } = useUpdateStorageSpot();
  const productLine = productLines[spot.productLine] || null;
  const product = (products[productLine?.productId || ""] || null) as AreaProduct | null;
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
          <div className={cn("relative gap-3 w-full h-full", isDragging && "dragging")}>
            <div
              className={cn("h-full w-full", originalColumn ? "opacity-100" : "opacity-40")}
              onClick={originalColumn ? onEditingProduct : () => {}}
            >
              <ProductSpotPresentation
                product={product}
                Handle={originalColumn ? Handle : null}
                isDragging={isDragging}
              />
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

  return <div className="flex text-sm gap-3">{renderColumns()}</div>;
};

type PresentationProps = {
  product: AreaProduct | null;
  Handle: React.ComponentType<{ children: React.ReactNode }> | null;
  isDragging: boolean;
};

function ProductSpotPresentation({ product, Handle, isDragging = false }: PresentationProps) {
  return (
    <div
      className={cn(
        "h-full w-full border-[1px] rounded-lg overflow-hidden bg-zinc-800",
        isDragging ? "border-white" : "border-zinc-400"
      )}
    >
      {product ? (
        <div
          style={{ backgroundImage: product.image }}
          className="h-full w-full bg-gradient-to-t from-transparent to-black/40 from-40% to-80%  p-2"
        >
          <div className="flex">
            <p className="whitespace-normal leading-tight">{product.displayName}</p>
            {Handle && (
              <span className="relative float-right ml-auto h-fit">
                <Handle>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"></div>
                  <div className="h-fit">
                    <DragIcon />
                  </div>
                </Handle>
              </span>
            )}
          </div>
          <p className="italic leading-none mt-1 text-zinc-400 text-sm">
            {product.size}
            {product.unitOfMeasurement?.value} {product.unitType.plural}
          </p>
        </div>
      ) : (
        <div className="flex h-full w-full whitespace-normal items-center  text-center text-zinc-200 italic p-2">
          <div className="relative flex h-full w-full items-center text-center">
            Choose a product
            {Handle && (
              <span className="absolute top-0 right-0">
                <Handle>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"></div>
                  <div className="h-fit">
                    <DragIcon />
                  </div>
                </Handle>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StorageSpot;
