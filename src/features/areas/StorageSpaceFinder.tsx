import { useParams } from "react-router-dom";
import { useAreaContext } from "src/hooks/useContexts";
import StorageSpace from "./StorageSpace";

const StorageSpaceFinder = () => {
  const { storageSpace } = useParams<{ storageSpace: string }>();
  const {
    area: { storageSpaces },
  } = useAreaContext();
  const space = storageSpaces[storageSpace!];
  if (!space) return null;
  return <StorageSpace space={space} />;
};

export default StorageSpaceFinder;
