import { useOutletContext, useParams } from "react-router-dom";
import StorageSpace from "./StorageSpace";
import type { StorageSpace as StorageSpaceType } from "api/areas";

const StorageSpaceFinder = () => {
  const { storageSpace } = useParams<{ storageSpace: string }>();
  const { storageSpaces } = useOutletContext<{ storageSpaces: StorageSpaceType[] }>();
  const space = storageSpaces.find(space => space.storageName === storageSpace);
  if (!space) return null;
  return <StorageSpace space={space} />;
};

export default StorageSpaceFinder;
