import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaList } from "src/hooks/useAreas";
import BackButton from "common/BackButton";
import HorizontalScrollNavigation from "common/HorizontalScrollNavigation";
import HorizontalScrollNavigationItem from "common/HorizontalScrollNavigationItem";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";

const EditOrder = () => {
  return <HorizontalSplitFitBottomFillTop top={<Outlet />} bottom={<HorizontalNavBar />} />;
};

export default EditOrder;

function HorizontalNavBar() {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data: areas } = useAreaList(venueId);
  const nav = useNavigate();

  useEffect(() => {
    if (areaId) return;
    if (areas && areas.length > 0) nav(areas[0].id);
  }, [areaId, areas, nav]);

  const renderAreas = () => {
    if (!areas) return null;
    return areas.map(area => {
      return (
        <HorizontalScrollNavigationItem key={area.id} to={area.id} active={areaId === area.id}>
          {area.areaName}
        </HorizontalScrollNavigationItem>
      );
    });
  };

  return (
    <HorizontalScrollNavigation>
      <BackButton />
      {renderAreas()}
    </HorizontalScrollNavigation>
  );
}
