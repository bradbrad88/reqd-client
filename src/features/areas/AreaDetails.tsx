import { Outlet, useParams } from "react-router-dom";
import { useAreaDetail } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";

const AreaDetails = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data, status } = useAreaDetail(areaId!, venueId);

  if (status === "error") return <div>Product not found</div>;
  if (!data) return <div>Loading</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">{data.areaName}</h2>
      <Outlet context={{ areaProducts: data.products }} />
    </div>
  );
};

export default AreaDetails;
