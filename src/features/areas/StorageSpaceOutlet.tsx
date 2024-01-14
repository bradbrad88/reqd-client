import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAreaDetail } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import HorizontalScrollNavigation from "common/HorizontalScrollNavigation";
import HorizontalScrollNavigationItem from "common/HorizontalScrollNavigationItem";
import Spinner from "common/Spinner";

const StorageSpaceOutlet = () => {
  const { venueId } = useVenueContext();
  const { areaId, storageSpace } = useParams<{ areaId: string; storageSpace: string }>();
  const { data, status } = useAreaDetail(areaId!, venueId);
  const nav = useNavigate();

  useEffect(() => {
    if (!data) return;
    if (storageSpace) return;
    if (!data.storageSpaces[0]) return;
    nav(`view/${data.storageSpaces[0].storageName}`);
  }, [data, nav, storageSpace]);

  const renderSections = () => {
    if (!data) return null;
    return data.storageSpaces.map(space => (
      <StorageSpaceNavItem
        key={space.storageName}
        storageName={space.storageName}
        to={space.storageName}
      />
    ));
  };

  if (status === "error") return <div>An error occurred retrieving data from the server</div>;
  if (status === "loading") return <Spinner />;
  if (!data) return null;

  const renderStorageSpaceNavigation = () => {
    return (
      <div className="bg-indigo-800 h-12">
        <HorizontalScrollNavigation>{renderSections()}</HorizontalScrollNavigation>
      </div>
    );
  };

  return (
    <HorizontalSplitFitBottomFillTop
      top={<Outlet context={{ storageSpaces: data.storageSpaces }} />}
      bottom={renderStorageSpaceNavigation()}
    />
  );
};

export default StorageSpaceOutlet;

const StorageSpaceNavItem = ({ storageName, to }: { storageName: string; to: string }) => {
  const { storageSpace } = useParams<{ storageSpace: string }>();
  const active = storageSpace === storageName;

  return (
    <HorizontalScrollNavigationItem to={to} active={active}>
      {storageName}
    </HorizontalScrollNavigationItem>
  );
};
