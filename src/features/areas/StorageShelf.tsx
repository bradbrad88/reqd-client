import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddStorageSpot } from "src/hooks/useAreas";
import StorageSpotSlot from "./StorageSpotSlot";
import StorageSpot from "./StorageSpot";

import type { StorageShelf as StorageShelfType } from "api/areas";

const StorageShelf = ({
  shelf,
  position,
  section,
  storageSpace,
}: {
  shelf: StorageShelfType;
  storageSpace: string;
  section: number;
  position: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const renderSpots = () => {
    return shelf.spots.map((spot, idx) => (
      <StorageSpot
        key={`section-${section}-shelf-${shelf}-spot-${idx}`}
        spot={{ ...spot }}
        section={section}
        shelf={position}
        position={idx}
        storageSpace={storageSpace}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className="flex relative bg-white bg-opacity-10 border-[1px] border-zinc-600 rounded-lg gap-6 p-6 shadow-black shadow-md mt-auto"
    >
      {renderSpots()}
      <AddSpot storageSpace={storageSpace} section={section} shelf={position} />
    </div>
  );
};

const AddSpot = ({
  section,
  shelf,
  storageSpace,
}: {
  shelf: number;
  section: number;
  storageSpace: string;
}) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { addSpot } = useAddStorageSpot();

  const onClick = () => {
    addSpot({ venueId, areaId: areaId!, storageSpace, section, shelf, spot: {} });
  };

  return (
    <StorageSpotSlot>
      <button
        className="border-lime-300 focus-within:border-lime-300 w-full h-full"
        onClick={onClick}
      >
        + Spot
      </button>
    </StorageSpotSlot>
  );
};

export default StorageShelf;
