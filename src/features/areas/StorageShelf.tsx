import { useRef } from "react";
import { useParams } from "react-router-dom";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddStorageSpot } from "src/hooks/useAreas";
import StorageSpotSlot from "./StorageSpotSlot";
import StorageSpot from "./StorageSpot";
import { SortableItem } from "common/dnd/SortableItem";

import type { StorageShelf as StorageShelfType, StorageSpace } from "api/areas";

const StorageShelf = ({
  shelf,
  storageSpace,
}: {
  shelf: StorageShelfType;
  storageSpace: StorageSpace;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const renderSpots = () => {
    return shelf.spotLayout.map(spot => (
      <SortableItem
        key={spot}
        id={spot}
        type="spot"
        handle
        render={Handle => (
          <StorageSpot
            spot={storageSpace.spots[spot]}
            storageSpace={storageSpace}
            Handle={Handle}
          />
        )}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className="flex relative bg-white bg-opacity-10 border-[1px] border-zinc-600 rounded-lg gap-3 p-6 shadow-black shadow-md mt-auto"
    >
      <SortableContext
        items={shelf.spotLayout}
        strategy={horizontalListSortingStrategy}
        id={shelf.id}
      >
        {renderSpots()}
      </SortableContext>
      <AddSpot storageSpace={storageSpace} shelf={shelf} />
    </div>
  );
};

const AddSpot = ({
  shelf,
  storageSpace,
}: {
  storageSpace: StorageSpace;
  shelf: StorageShelfType;
}) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { addSpot } = useAddStorageSpot();

  const onClick = () => {
    addSpot({
      venueId,
      areaId: areaId!,
      storageSpace: storageSpace.storageName,
      shelfId: shelf.id,
      count: shelf.spotLayout.length + 1,
    });
  };

  return (
    <StorageSpotSlot>
      <button
        className="border-lime-300 focus-within:border-lime-600 border-dashed w-full h-full"
        onClick={onClick}
      >
        + Spot
      </button>
    </StorageSpotSlot>
  );
};

export default StorageShelf;
