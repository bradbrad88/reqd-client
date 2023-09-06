import { useAreaList } from "src/hooks/useAreas";
import Area from "./Area";
import { useVenueContext } from "src/hooks/useContexts";
import CallToAction from "common/CallToAction";
import { useNavigate } from "react-router-dom";
import FlexList from "common/FlexList";

const AreaList = () => {
  const { venueId } = useVenueContext();
  const { data: areaList } = useAreaList(venueId);
  const nav = useNavigate();

  const renderAreas = () => {
    return areaList.map(area => <Area key={area.id} {...area} />);
  };

  const onCreate = () => {
    nav("create");
  };

  return (
    <div className="flex flex-col gap-5">
      <CallToAction action={onCreate}>Create</CallToAction>
      <FlexList>{renderAreas()}</FlexList>
    </div>
  );
};

export default AreaList;
