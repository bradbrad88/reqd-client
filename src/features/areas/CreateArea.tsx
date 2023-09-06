import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createArea } from "../../api/areas";
import Form from "../../common/Form";
import CallToAction from "../../common/CallToAction";
import { useNavigate } from "react-router-dom";
import { useVenueContext } from "../../hooks/useContexts";

const CreateArea = () => {
  const [areaName, setAreaName] = useState("");
  const { venueId } = useVenueContext();

  const queryClient = useQueryClient();
  const nav = useNavigate();
  const mutation = useMutation("areas", createArea, {
    onSuccess: () => {
      setAreaName("");
      queryClient.invalidateQueries("areas");
    },
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;
    setAreaName(value);
  };
  const onCreate = () => {
    mutation.mutate({ venueId, areaName });
  };

  const onClose = () => {
    nav("../", { relative: "path" });
  };

  return (
    <div className="border-[1px] border-indigo-700 rounded-md shadow-md shadow-black p-2 flex flex-col gap-5">
      <div className="flex">
        <h2 className="text-xl">Create a new area in your venue</h2>
        <button className="bg-orange-800 font-bold text-lg p-1 px-6" onClick={onClose}>
          Close
        </button>
      </div>
      <Form>
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
        <CallToAction action={onCreate}>Create</CallToAction>
      </Form>
    </div>
  );
};

export default CreateArea;
