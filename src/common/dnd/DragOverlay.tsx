import { DragOverlay as DragOverlayCore } from "@dnd-kit/core";

const DragOverlay = ({
  isDragging,
  children,
}: {
  isDragging: boolean;
  children: React.ReactNode;
}) => {
  return <DragOverlayCore>{isDragging && children}</DragOverlayCore>;
};

export default DragOverlay;
