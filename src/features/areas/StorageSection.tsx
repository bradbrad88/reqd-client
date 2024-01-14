import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useSetStorageShelfCount } from "src/hooks/useAreas";
import StorageShelf from "./StorageShelf";

import type { StorageSection as StorageSectionType } from "api/areas";

const StorageSection = ({
  section,
  position,
  storageSpace,
}: {
  storageSpace: string;
  section: StorageSectionType;
  position: number;
}) => {
  const renderShelves = () => {
    return section.shelves.map((shelf, idx) => (
      <StorageShelf
        key={`section-${position}-shelf-${idx}`}
        shelf={shelf}
        position={idx}
        section={position}
        storageSpace={storageSpace}
      />
    ));
  };

  return (
    <div className="relative w-fit text-sm m-4">
      <div className="border-[1px] border-zinc-600 shadow-black shadow-md rounded-lg p-6 flex flex-col gap-6 bg-zinc-950">
        {renderShelves()}
        <AddShelf
          storageSpace={storageSpace}
          section={position}
          shelfCount={section.shelves.length}
        />
      </div>
    </div>
  );
};

const AddShelf = ({
  storageSpace,
  section,
  shelfCount,
}: {
  storageSpace: string;
  section: number;
  shelfCount: number;
}) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { setShelfCount } = useSetStorageShelfCount();

  const onClick = () => {
    setShelfCount({
      areaId: areaId!,
      venueId,
      section,
      shelfCount: shelfCount + 1,
      storageSpace,
    });
  };

  return (
    <button onClick={onClick} className="border-lime-300">
      + Shelf
    </button>
  );
};

export default StorageSection;
