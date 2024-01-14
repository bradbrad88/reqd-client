import { useParams, useSearchParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useSetStorageSectionCount, useUpdateStorageSpot } from "src/hooks/useAreas";
import StorageSection from "./StorageSection";
import EditParLevel from "./edit/EditParLevel";
import EditSpotProduct from "./edit/EditSpotProduct";

import type { StorageSpace as StorageSpaceType, UpdateSpot } from "api/areas";

type Props = {
  space: StorageSpaceType;
};

const StorageSpace = ({ space }: Props) => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const [params, setParams] = useSearchParams();
  const { updateSpot } = useUpdateStorageSpot();

  const editingProduct = params.get("editProduct") === "true";
  const editingParLevel = params.get("editParLevel") === "true";

  const handleSpotUpdate = (update: UpdateSpot) => {
    const section = Number(params.get("activeSection"));
    const shelf = Number(params.get("activeShelf"));
    const spot = Number(params.get("activeSpot"));
    updateSpot({
      venueId,
      areaId: areaId!,
      storageSpace: space.storageName,
      section,
      shelf,
      spot,
      update,
    });
  };

  const renderSections = () => {
    return space.sections.map((section, idx) => (
      <StorageSection
        key={`section-${idx}`}
        section={section}
        position={idx}
        storageSpace={space.storageName}
      />
    ));
  };

  const onSlideoversClose = () => {
    setTimeout(() => {
      setParams(params => {
        params.delete("editProduct");
        params.delete("editParLevel");
        params.delete("activeSection");
        params.delete("activeShelf");
        params.delete("activeSpot");
        params.delete("activeParLevel");
        return params;
      });
    }, 0);
  };

  const onProductChange = (productId: string | null) => {
    handleSpotUpdate({ productId });
    onSlideoversClose();
  };

  const onParLevelChange = (parLevel: number | null) => {
    handleSpotUpdate({ parLevel });
    onSlideoversClose();
  };

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="grid gap-4 whitespace-nowrap grid-rows-1 grid-flow-col pb-4 pt-2">
          {renderSections()}
          <AddSection storageSpace={space.storageName} sectionCount={space.sections.length} />
        </div>
      </div>
      <EditParLevel
        open={editingParLevel}
        onParLevelChange={onParLevelChange}
        parLevel={Number(params.get("activeParLevel"))}
        close={onSlideoversClose}
      />
      <EditSpotProduct
        open={editingProduct}
        onProductChange={onProductChange}
        close={onSlideoversClose}
      />
    </>
  );
};

const AddSection = ({
  storageSpace,
  sectionCount,
}: {
  storageSpace: string;
  sectionCount: number;
}) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { setSectionCount } = useSetStorageSectionCount();
  const onClick = () => {
    setSectionCount({
      venueId,
      areaId: areaId!,
      storageSpace,
      sectionCount: sectionCount + 1,
    });
  };
  return (
    <button onClick={onClick} className="border-lime-300 max-h-[4rem]">
      + Section
    </button>
  );
};

export default StorageSpace;
