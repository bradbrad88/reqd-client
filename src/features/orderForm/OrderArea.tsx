import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { OrderDetail } from "api/orders";
import { AreaDetail } from "api/areas";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import HorizontalScrollNavigation from "common/HorizontalScrollNavigation";
import HorizontalScrollNavigationItem from "common/HorizontalScrollNavigationItem";
import StorageSpaceSelector from "./StorageSpaceSelector";

type Props = {
  area: AreaDetail;
  order: OrderDetail;
};

const OrderArea = ({ area, order }: Props) => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const space = params.get("space");
    if (space) return;
    const firstSpace = area.storageSpaceLayout[0];
    if (!firstSpace) return;
    setParams({ space: firstSpace });
  }, [params, setParams, area.storageSpaceLayout]);

  const renderStorageSpaceNavItems = () => {
    return area.storageSpaceLayout.map(space => {
      const active = params.get("space") === space;
      return (
        <HorizontalScrollNavigationItem
          key={space}
          active={active}
          to={{ search: `?space=${space}` }}
        >
          {space}
        </HorizontalScrollNavigationItem>
      );
    });
  };

  const selectedSpace = params.get("space");
  const space = selectedSpace ? area.storageSpaces[selectedSpace] : null;

  return (
    <HorizontalSplitFitBottomFillTop
      top={
        <div className="pt-3 pb-6 px-4">
          {space ? (
            <StorageSpaceSelector storageSpace={space} area={area} order={order} />
          ) : (
            <div>Create a storage space to order from</div>
          )}
        </div>
      }
      bottom={
        <HorizontalScrollNavigation>{renderStorageSpaceNavItems()}</HorizontalScrollNavigation>
      }
    />
  );
};

export default OrderArea;
