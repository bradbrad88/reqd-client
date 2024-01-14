import { Outlet, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaDetail } from "src/hooks/useAreas";

const AreaDetailOutlet = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data, status } = useAreaDetail(areaId!, venueId);
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>An error occurred</div>;
  if (!data) return null;
  return <Outlet context={{ area: data }} />;
};

export default AreaDetailOutlet;
