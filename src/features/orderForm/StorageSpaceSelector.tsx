import { AreaDetail, StorageSpace } from "api/areas";
import StorageSpaceDetailedLayout from "./StorageSpaceDetailedLayout";
import StorageSpaceListLayout from "./StorageSpaceListLayout";
import { OrderDetail } from "api/orders";

type Props = {
  storageSpace: StorageSpace;
  area: AreaDetail;
  order: OrderDetail;
};

const StorageSpaceSelector = ({ storageSpace, area, order }: Props) => {
  switch (storageSpace.layoutType) {
    case "layout":
      return (
        <StorageSpaceDetailedLayout storageSpace={storageSpace} area={area} order={order} />
      );
    case "list":
      return <StorageSpaceListLayout storageSpace={storageSpace} area={area} />;

    default:
      return <div>Unknown storage space type</div>;
  }
};

export default StorageSpaceSelector;
