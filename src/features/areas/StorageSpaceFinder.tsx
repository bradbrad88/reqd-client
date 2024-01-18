import { useOutletContext, useParams } from "react-router-dom";
import StorageSpace from "./StorageSpace";
import type { AreaDetail } from "api/areas";

const StorageSpaceFinder = () => {
  const { storageSpace } = useParams<{ storageSpace: string }>();
  const { area } = useOutletContext<{ area: AreaDetail }>();
  const space = area.storageSpaceLayout.find(space => space === storageSpace);
  if (!space) return null;
  return <StorageSpace space={area.storageSpaces[space]} area={area} />;
};

export default StorageSpaceFinder;
