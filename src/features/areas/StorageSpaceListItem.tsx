import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "common/ListItem";
import { MenuIcon, DragIcon } from "common/icons";
import TransitionCollapseItem from "common/TransitionCollapseItem";
import EditStorageSpace from "./edit/EditStorageSpace";

type Props = {
  space: string;
  Handle?: React.ComponentType<{ children: React.ReactNode }>;
  isDragging?: boolean;
};

const EmptyHandle = (props: PropsWithChildren) => {
  return <div>{props.children}</div>;
};

const StorageSpaceListItem = ({ space, Handle = EmptyHandle, isDragging = false }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const onClick: MouseEventHandler = e => {
    e.stopPropagation();
    setEditMode(!editMode);
  };

  return (
    <ListItem dragging={isDragging}>
      <div className="flex justify-between">
        <Link to={`spaces/${space}`} className="text-white w-full">
          <div>{space}</div>
        </Link>
        <div onClick={e => onClick(e)} className="mx-3">
          <MenuIcon size={24} fill="white" />
        </div>
        <Handle>
          <DragIcon size={24} fill="white" />
        </Handle>
      </div>
      <TransitionCollapseItem fold={!editMode}>
        <EditStorageSpace space={space} />
      </TransitionCollapseItem>
    </ListItem>
  );
};

export default StorageSpaceListItem;
