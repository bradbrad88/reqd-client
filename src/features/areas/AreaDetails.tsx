import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAreaDetail, useDeleteArea } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";

const AreaDetails = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data, status } = useAreaDetail(areaId!, venueId);
  const { deleteArea } = useDeleteArea(venueId);
  const nav = useNavigate();

  const onDelete = () => {
    deleteArea({ venueId, areaId: areaId! });
    nav("../");
  };

  if (status === "error") return <div>Product not found</div>;
  if (!data) return <div>Loading</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">{data.areaName}</h2>
        <button onClick={onDelete}>Remove Area</button>
      </div>
      <Outlet context={{ areaProducts: data.products }} />
    </div>
  );
};

export default AreaDetails;
