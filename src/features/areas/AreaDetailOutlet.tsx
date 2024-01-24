import { Outlet, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaDetail } from "src/hooks/useAreas";
import { AreaContextProvider } from "ctx/AreaContext";

const AreaDetailOutlet = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data, status } = useAreaDetail(areaId!, venueId);
  if (status === "loading" && !data) return <div>Loading...</div>;
  if (status === "error") return <div>An error occurred</div>;
  if (!data) return null;
  return (
    <AreaContextProvider initialAreaDetail={data}>
      <Outlet />
    </AreaContextProvider>
  );
};

export default AreaDetailOutlet;
