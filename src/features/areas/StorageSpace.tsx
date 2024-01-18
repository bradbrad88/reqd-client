import { useParams, useSearchParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import {
  useEditProductLine,
  useSetProductLine,
  useSetStorageSectionCount,
} from "src/hooks/useAreas";
import StorageSection from "./StorageSection";
import EditParLevel from "./edit/EditParLevel";
import EditSpotProduct from "./edit/EditSpotProduct";

import type {
  AreaDetail,
  StorageSpace as StorageSpaceType,
  UpdateProductLine,
} from "api/areas";

type Props = {
  space: StorageSpaceType;
  area: AreaDetail;
};

const StorageSpace = ({ space }: Props) => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const [params, setParams] = useSearchParams();
  const { setProductLine } = useSetProductLine();
  const { editProductLine } = useEditProductLine();
  const editingProduct = params.get("editProduct") === "true";
  const editingParLevel = params.get("editParLevel") === "true";

  const handleProductLineUpdate = (update: UpdateProductLine) => {
    const spotId = params.get("activeSpot");
    if (!spotId) return;
    const spot = space.spots[spotId];
    if (!spot) return;
    if (spot.productLine) {
      editProductLine({ venueId, areaId: areaId!, productLine: spot.productLine, update });
    } else {
      setProductLine({
        venueId,
        areaId: areaId!,
        location: { storageSpace: space.storageName, spotId },
        productLine: update,
      });
    }
  };

  const renderSections = () => {
    return space.sectionLayout.map(section => (
      <StorageSection key={section} section={space.sections[section]} storageSpace={space} />
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
    handleProductLineUpdate({ productId });
    onSlideoversClose();
  };

  const onParLevelChange = (parLevel: number | null) => {
    handleProductLineUpdate({ parLevel });
    onSlideoversClose();
  };

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="grid gap-4 whitespace-nowrap grid-rows-1 grid-flow-col pb-4 pt-2">
          {renderSections()}
          <AddSection storageSpace={space} />
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

const AddSection = ({ storageSpace }: { storageSpace: StorageSpaceType }) => {
  const { areaId } = useParams<{ areaId: string }>();
  const { venueId } = useVenueContext();
  const { setSectionCount } = useSetStorageSectionCount();

  const onClick = () => {
    setSectionCount({
      venueId,
      areaId: areaId!,
      storageSpace: storageSpace.storageName,
      count: storageSpace.sectionLayout.length + 1,
    });
  };
  return (
    <button onClick={onClick} className="border-lime-600 border-dashed w-72 m-4 ml-0">
      + Section
    </button>
  );
};

export default StorageSpace;
