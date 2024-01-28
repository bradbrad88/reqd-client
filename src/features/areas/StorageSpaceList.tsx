import { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { moveArrayItem } from "utils/arrays";
import { useAreaContext, useVenueContext } from "src/hooks/useContexts";
import useSensors from "src/hooks/useSensors";
import { useMoveStorageSpace } from "src/hooks/useAreas";
import DragOverlay from "common/dnd/DragOverlay";
import { SortableItem } from "common/dnd/SortableItem";
import FlexList from "common/FlexList";
import StorageSpaceListItem from "./StorageSpaceListItem";

type Props = {
  storageSpaceLayout: string[];
};

const StorageSpaceList = ({ storageSpaceLayout }: Props) => {
  const { venueId } = useVenueContext();
  const { area, setArea } = useAreaContext();
  const { moveStorageSpace } = useMoveStorageSpace();
  const [isDragging, setIsDragging] = useState<string | null>(null);

  const sensors = useSensors();

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = String(e.active.id);
    if (!e.over) return;
    const overId = String(e.over.id);
    if (!overId) return;
    const oldIndex = storageSpaceLayout.indexOf(activeId);
    const newIndex = storageSpaceLayout.indexOf(overId);
    setArea(area => {
      const storageSpaceLayout = moveArrayItem(area.storageSpaceLayout, oldIndex, newIndex);
      console.log(storageSpaceLayout);
      return {
        ...area,
        storageSpaceLayout,
      };
    });
    moveStorageSpace({ venueId, areaId: area.id, storageSpace: activeId, newIndex });
    setIsDragging(null);
  };

  const onDragStart = (e: DragStartEvent) => {
    setIsDragging(String(e.active.id));
  };

  const onDragCancel = () => {
    setIsDragging(null);
  };

  return (
    <FlexList>
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragCancel={onDragCancel}
        collisionDetection={closestCenter}
        sensors={sensors}
      >
        <SortableContext items={storageSpaceLayout} strategy={verticalListSortingStrategy}>
          {storageSpaceLayout.map(space => (
            <SortableItem
              key={space}
              handle
              id={space}
              type="storage-space-layout"
              render={Handle => (
                <StorageSpaceListItem key={space} space={space} Handle={Handle} />
              )}
            />
          ))}
        </SortableContext>
        <DragOverlay isDragging={!!isDragging}>
          <StorageSpaceListItem space={isDragging!} isDragging />
        </DragOverlay>
      </DndContext>
    </FlexList>
  );
};

export default StorageSpaceList;
