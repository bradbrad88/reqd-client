import { useState } from "react";
import { useQuery } from "react-query";
import { getAreas } from "../../api/areas";
import Area from "./Area";
import CreateArea from "./CreateArea";

const Areas = () => {
  const [toggleCreateForm, setToggleCreateForm] = useState(false);
  const { data } = useQuery(
    ["areas", "fab75a74-a16b-46db-b8c7-b32cd6a641fa"],
    ({ queryKey }) => getAreas(queryKey[1] as string)
  );

  const renderAreas = () => {
    if (!data) return null;
    return data.map(area => <Area key={area.id} {...area} />);
  };

  const openForm = () => {
    setToggleCreateForm(true);
  };

  const closeForm = () => {
    setToggleCreateForm(false);
  };

  return (
    <div className="flex p-3 flex-col gap-3">
      <h1 className="text-3xl p-2 ">Areas</h1>
      {toggleCreateForm ? (
        <CreateArea close={closeForm} />
      ) : (
        <button className="w-full bg-lime-600 font-bold text-lg" onClick={openForm}>
          Create
        </button>
      )}

      <div className="flex flex-col gap-2">{renderAreas()}</div>
    </div>
  );
};

export default Areas;
