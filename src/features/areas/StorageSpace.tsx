import { useParams, useSearchParams } from "react-router-dom";
import { useAreaContext, useVenueContext } from "src/hooks/useContexts";
import {
  useEditProductLine,
  useMoveStorageSpot,
  useSetProductLine,
  useSetStorageSectionCount,
} from "src/hooks/useAreas";
import StorageSection from "./StorageSection";
import EditParLevel from "./edit/EditParLevel";
import EditSpotProduct from "./edit/EditSpotProduct";

import type { StorageSpace as StorageSpaceType, UpdateProductLine } from "api/areas";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import StorageSpot from "./StorageSpot";
import DragOverlay from "common/dnd/DragOverlay";

type Props = {
  space: StorageSpaceType;
};

const StorageSpace = ({ space }: Props) => {
  const { venueId } = useVenueContext();
  const { area, setArea, resetAreaState } = useAreaContext();
  const [params, setParams] = useSearchParams();
  const { setProductLine } = useSetProductLine();
  const { editProductLine } = useEditProductLine();
  const { moveSpot } = useMoveStorageSpot();

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // A normal swipe on mobile should scroll, even on a handle. Hold for 200ms to pick up an item
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 21, delay: 200, tolerance: 20 },
  });
  const sensors = useSensors(touchSensor, mouseSensor);
  const editingProduct = params.get("editProduct") === "true";
  const editingParLevel = params.get("editParLevel") === "true";
  const [activeDrag, setActiveDrag] = useState<{ id: UniqueIdentifier; type: string } | null>(
    null
  );

  const handleProductLineUpdate = (update: UpdateProductLine) => {
    const spotId = params.get("activeSpot");
    if (!spotId) return;
    const spot = space.spots[spotId];
    if (!spot) return;
    if (spot.productLine) {
      editProductLine({ venueId, areaId: area.id, productLine: spot.productLine, update });
    } else {
      setProductLine({
        venueId,
        areaId: area.id,
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

  const onDragStart = (e: DragStartEvent) => {
    const { id } = e.active;
    const { type } = e.active.data.current!;
    setActiveDrag({ id, type });
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.data.current?.type === "spot") {
      const draggingRect = active.rect.current.translated!;
      if (!e.over) return;
      const spotId = String(e.active.id);
      const overId = String(e.over.id);
      if (!overId) return;
      const overShelfId = e.over?.data.current?.sortable.containerId as string | undefined;
      const initialShelfId = e.active.data.current?.sortable.containerId as string | undefined;
      if (!overShelfId || !initialShelfId) return;
      const overShelf = space.shelves[overShelfId];
      const overItems = overShelf.spotLayout;
      const overIndex = overItems.indexOf(overId);

      let index = overShelf.spotLayout.length + 1;
      const isBelowLastItem =
        over &&
        overIndex === overItems.length - 1 &&
        draggingRect.left > over.rect.left + over.rect.width;
      const modifier = isBelowLastItem ? 1 : 0;
      index = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

      moveSpot({
        venueId,
        areaId: area.id,
        storageSpace: space.storageName,
        spotId,
        shelfId: overShelfId,
        index,
      });

      setArea(area => {
        const shelves = { ...space.shelves };
        shelves[initialShelfId] = {
          ...shelves[initialShelfId],
          spotLayout: shelves[initialShelfId].spotLayout.filter(id => id !== spotId),
        };
        const layout = shelves[overShelfId].spotLayout;
        shelves[overShelfId] = {
          ...shelves[overShelfId],
          spotLayout: [
            ...layout.slice(0, index),
            spotId,
            ...layout.slice(index, layout.length),
          ],
        };
        return {
          ...area,
          storageSpaces: {
            ...area.storageSpaces,
            [space.storageName]: {
              ...space,
              shelves,
            },
          },
        };
      });
    }
  };

  const onDragOver = (e: DragOverEvent) => {
    const { over, active } = e;
    if (!over) return;
    const overId = String(over.id);

    if (active.data.current?.type === "spot") {
      if (overId == null || active.id in area.storageSpaces[space.storageName].shelves) return;
      const spot = active.id;
      const draggingRect = active.rect.current.translated;
      if (!draggingRect) return;
      const overShelfId = e.over?.data.current?.sortable.containerId;
      const initialShelfId = e.active.data.current?.sortable.containerId;
      if (!overShelfId || !initialShelfId) return;
      if (overShelfId === initialShelfId) return;

      const storageSpace = area.storageSpaces[space.storageName];
      const initialShelf = storageSpace.shelves[initialShelfId];
      const overShelf = storageSpace.shelves[overShelfId];

      let newIndex = overShelf.spotLayout.length + 1;
      const overItems = overShelf.spotLayout;
      const overIndex = overItems.indexOf(overId);
      const isBelowLastItem =
        over &&
        overIndex === overItems.length - 1 &&
        draggingRect.left > over.rect.left + over.rect.width;
      const modifier = isBelowLastItem ? 1 : 0;
      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

      setArea(area => {
        const overShelfSpotLayout = [
          ...overShelf.spotLayout.slice(0, newIndex),
          spot,
          ...overShelf.spotLayout.slice(newIndex, overShelf.spotLayout.length),
        ];
        const initialShelfSpotLayout = initialShelf.spotLayout.filter(id => id !== spot);
        return {
          ...area,
          storageSpaces: {
            ...area.storageSpaces,
            [storageSpace.storageName]: {
              ...storageSpace,
              shelves: {
                ...storageSpace.shelves,
                [overShelfId]: { ...overShelf, spotLayout: overShelfSpotLayout },
                [initialShelfId]: { ...initialShelf, spotLayout: initialShelfSpotLayout },
              },
            },
          },
        };
      });
    }
  };

  const EmptyHandle = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  };

  const renderOverlayComponent = () => {
    if (!activeDrag) return null;
    const { id, type } = activeDrag;
    switch (type) {
      case "spot":
        return (
          <StorageSpot
            isDragging
            spot={space.spots[id]}
            storageSpace={space}
            Handle={EmptyHandle}
          />
        );

      default:
        return null;
    }
  };

  const onDragCancel = () => {
    resetAreaState();
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
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
      <DragOverlay isDragging={!!activeDrag}>{renderOverlayComponent()}</DragOverlay>
    </DndContext>
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
