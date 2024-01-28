import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "utils/cn";

type Props<T extends boolean> = {
  id: UniqueIdentifier;
  type: string;
  handle: T;
  render: T extends true
    ? (Handle: React.ComponentType<{ children: React.ReactNode }>) => React.ReactNode
    : () => React.ReactNode;
};

export const SortableItem = <THandle extends boolean>({
  id,
  type,
  render,
  handle,
}: Props<THandle>) => {
  const { isDragging, setNodeRef, attributes, listeners, transform, transition } = useSortable(
    {
      id,
      data: { type },
    }
  );

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const Handle = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div {...listeners} {...attributes} className="touch-none">
        {children}
      </div>
    );
  };

  if (!handle) return null;
  handle;

  return (
    <div
      ref={setNodeRef}
      {...(!handle && listeners)}
      {...(!handle && attributes)}
      style={style}
      className={cn("", isDragging && "opacity-20", !handle && "touch-none")}
    >
      {render(Handle)}
    </div>
  );
};
