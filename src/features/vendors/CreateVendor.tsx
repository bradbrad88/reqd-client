import CallToAction from "common/CallToAction";
import { useCreateVendor } from "./queries";
import { useContext, useState } from "react";
import venueContext from "ctx/VenueContext";
import { useNavigate } from "react-router-dom";
import Form from "common/Form";
import Field from "common/Field";
import { Input } from "common/Inputs";

const CreateVendor = () => {
  const { mutate, status } = useCreateVendor();
  const nav = useNavigate();
  const { venueId } = useContext(venueContext);
  const [vendorName, setVendorName] = useState("");
  const [repName, setRepName] = useState("");

  const resetForm = () => {
    setVendorName("");
    setRepName("");
  };

  const verifyFields = () => {
    return false;
  };
  const onCreate = () => {
    mutate(
      { venueId, vendorName },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  const onClose = () => {
    nav("../", { relative: "path" });
  };

  const onVendorNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setVendorName(event.target.value);
  };

  const onRepNameChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setRepName(event.target.value);
  };

  const isLoading = status === "loading";

  return (
    <div>
      <h1 className="text-2xl">Create a vendor</h1>
      <button onClick={onClose}>Close</button>
      <Form>
        <Field>
          <label>Vendor Name</label>
          <Input value={vendorName} onChange={onVendorNameChange} />
        </Field>
        <Field>
          <label>Representative Contact Name</label>
          <Input value={repName} onChange={onRepNameChange} />
        </Field>

        <CallToAction
          loading={isLoading}
          disabled={verifyFields() || isLoading}
          action={onCreate}
        >
          Create
        </CallToAction>
      </Form>
    </div>
  );
};

export default CreateVendor;
