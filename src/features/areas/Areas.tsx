import { useQuery } from "react-query";
import { getAreas } from "../../api/areas";
import Area from "./Area";

const Areas = () => {
  const { data } = useQuery<{ id: string; areaName: string }[]>(
    ["areas", "fab75a74-a16b-46db-b8c7-b32cd6a641fa"],
    ({ queryKey }) => getAreas(queryKey[1] as string)
  );

  const renderAreas = () => {
    if (!data) return null;
    return data.map(area => <Area {...area} />);
  };

  return (
    <div className="p-3">
      <h1 className="mb-3 text-3xl p-2 ">Areas</h1>
      <div className="flex flex-col gap-1">{renderAreas()}</div>
    </div>
  );
};

export default Areas;
