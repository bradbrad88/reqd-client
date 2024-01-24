import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import HorizontalScrollNavigation from "common/HorizontalScrollNavigation";
import HorizontalScrollNavigationItem from "common/HorizontalScrollNavigationItem";

import { useAreaContext } from "src/hooks/useContexts";

const StorageSpaceOutlet = () => {
  // const { venueId } = useVenueContext();
  const { storageSpace } = useParams<{ areaId: string; storageSpace: string }>();
  // const { data, status } = useAreaDetail(areaId!, venueId);
  const nav = useNavigate();
  const {
    area: { storageSpaces, storageSpaceLayout },
  } = useAreaContext();
  // const {
  //   area,
  //   area: { storageSpaces, storageSpaceLayout },
  // } = useOutletContext<{ area: AreaDetail }>();

  useEffect(() => {
    if (storageSpace) return;
    if (!storageSpaces[0]) return;
    nav(`view/${storageSpaces[0].storageName}`);
  }, [nav, storageSpace, storageSpaces]);

  const renderSections = () => {
    return storageSpaceLayout.map(space => (
      <StorageSpaceNavItem key={space} storageName={space} to={space} />
    ));
  };

  // if (status === "error") return <div>An error occurred retrieving data from the server</div>;
  // if (status === "loading") return <Spinner />;

  const renderStorageSpaceNavigation = () => {
    return (
      <div className="bg-indigo-800 h-12">
        <HorizontalScrollNavigation>{renderSections()}</HorizontalScrollNavigation>
      </div>
    );
  };

  return (
    <HorizontalSplitFitBottomFillTop
      top={<Outlet />}
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
