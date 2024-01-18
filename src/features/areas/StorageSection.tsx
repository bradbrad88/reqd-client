import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useSetStorageShelfCount } from "src/hooks/useAreas";
import StorageShelf from "./StorageShelf";

import type { StorageSection as StorageSectionType, StorageSpace } from "api/areas";

const StorageSection = ({
  section,
  storageSpace,
}: {
  storageSpace: StorageSpace;
  section: StorageSectionType;
}) => {
  const renderShelves = () => {
    return section.shelfLayout.map(shelf => (
      <StorageShelf
        key={shelf}
        shelf={storageSpace.shelves[shelf]}
        storageSpace={storageSpace}
      />
    ));
  };

  return (
    <div className="relative w-fit text-sm m-4">
      <div className="border-[1px] border-zinc-600 shadow-black shadow-md rounded-lg p-6 flex flex-col gap-6 bg-zinc-950">
        {renderShelves()}
        <AddShelf storageSpace={storageSpace} section={section} />
      </div>
    </div>
  );
};

const AddShelf = ({
  storageSpace,
  section,
}: {
  storageSpace: StorageSpace;
  section: StorageSectionType;
}) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { setShelfCount } = useSetStorageShelfCount();

  const onClick = () => {
    setShelfCount({
      areaId: areaId!,
      venueId,
      storageSpace: storageSpace.storageName,
      sectionId: section.id,
      count: section.shelfLayout.length + 1,
    });
  };

  return (
    <button onClick={onClick} className="border-lime-600 border-dashed border-2">
      + Shelf
    </button>
  );
};

export default StorageSection;
