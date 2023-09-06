import { Outlet, useParams } from "react-router-dom";
import { useAreaDetail } from "src/hooks/useAreas";
import AreaProducts from "./AreaProducts";
import { useVenueContext } from "src/hooks/useContexts";

const AreaDetails = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data } = useAreaDetail(areaId!, venueId);

  if (!data) return <div>Loading</div>;

  return (
    <div>
      <h2>{data.areaName}</h2>
      <Outlet context={{ areaProducts: data.products }} />
      {/* <AreaProducts products={data.products} /> */}
    </div>
  );
};

export default AreaDetails;
