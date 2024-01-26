import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "common/ListItem";
import MenuIcon from "common/icons/Menu";
import TransitionCollapseItem from "common/TransitionCollapseItem";
import EditStorageSpace from "./edit/EditStorageSpace";

type Props = {
  space: string;
};

const StorageSpaceListItem = ({ space }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const onClick: MouseEventHandler = e => {
    e.stopPropagation();
    setEditMode(!editMode);
  };

  return (
    <ListItem>
      <div className="flex justify-between">
        <Link to={`spaces/${space}`} className="text-white w-full">
          <div>{space}</div>
        </Link>
        <div onClick={e => onClick(e)} className="">
          <MenuIcon />
        </div>
      </div>
      <TransitionCollapseItem fold={!editMode}>
        <EditStorageSpace space={space} />
      </TransitionCollapseItem>
    </ListItem>
  );
};

export default StorageSpaceListItem;
