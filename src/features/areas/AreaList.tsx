import { useAreaList } from "src/hooks/useAreas";
import Area from "./Area";
import { useVenueContext } from "src/hooks/useContexts";

const AreaList = () => {
  const { venueId } = useVenueContext();
  const { data: areaList } = useAreaList(venueId);

  const renderAreas = () => {
    return areaList.map(area => <Area key={area.id} {...area} />);
  };

  return <div>{renderAreas()}</div>;
};

export default AreaList;
