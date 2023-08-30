import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createArea } from "../../api/areas";

type Props = {
  close: () => void;
};

const CreateArea = ({ close }: Props) => {
  const [areaName, setAreaName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation("areas", createArea, {
    onSuccess: () => {
      setAreaName("");
      queryClient.invalidateQueries("areas");
    },
  });

  const venueId = "fab75a74-a16b-46db-b8c7-b32cd6a641fa";

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    // event.preventDefault();
    const { value } = event.target;
    setAreaName(value);
  };
  const onCreate = () => {
    mutation.mutate({ venueId, areaName });
  };

  return (
    <div className="border-[1px] border-indigo-700 rounded-md shadow-md shadow-black p-2 flex flex-col gap-5">
      <div className="flex">
        <h2 className="text-xl">Create a new area in your venue</h2>
        <button className="bg-orange-800 font-bold text-lg p-1 px-6" onClick={close}>
          Close
        </button>
      </div>
      <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col text-lg">
          <label htmlFor="areaName" className="font-bold">
            Area Name
          </label>
          <input
            type="text"
            id="areaName"
            placeholder="...New Area Name"
            className="p-2 px-4 rounded-full"
            onChange={onChange}
            value={areaName}
          />
        </div>
        <button onClick={onCreate} className="p-2 bg-lime-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateArea;
