import { useNavigate } from "react-router-dom";
import { useAreaList } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import FlexList from "common/FlexList";
import FixedCallToAction from "common/FixedCallToAction";
import ListItem from "common/ListItem";
import Spinner from "common/Spinner";

const AreaList = () => {
  const { venueId } = useVenueContext();
  const { data: areaList, status } = useAreaList(venueId);
  const nav = useNavigate();

  const renderAreas = () => {
    return areaList.map(area => <Area key={area.id} {...area} />);
  };

  const onCreate = () => {
    nav("create");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5">Areas</h1>
      {status === "loading" && <Spinner />}
      <div className="flex flex-col gap-5">
        <FlexList>{renderAreas()}</FlexList>
      </div>
      <FixedCallToAction action={onCreate}>Create</FixedCallToAction>
    </div>
  );
};

type Props = {
  id: string;
  areaName: string;
};

const Area = ({ areaName, id }: Props) => {
  const nav = useNavigate();

  const onNavigate = () => {
    nav(id);
  };

  return (
    <ListItem>
      <div onClick={onNavigate}>{areaName}</div>
    </ListItem>
  );
};

export default AreaList;
