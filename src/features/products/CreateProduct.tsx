import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "src/hooks/useProducts";
import { useVendorList } from "src/hooks/useVendors";
import { useVenueContext } from "src/hooks/useContexts";
import CallToAction from "../../common/CallToAction";
import Form from "../../common/Form";
import Field from "common/Field";
import { Input, Select } from "common/Inputs";
const renderMeasureOptions = () => {
  const measures = ["mL", "g", "rolls"];

  return measures.map(measure => <Option key={measure} display={measure} id={measure} />);
};

const CreateProduct = () => {
  const nav = useNavigate();
  const { venueId } = useVenueContext();
  const { createProduct, status } = useCreateProduct(venueId);
  const { data: vendors } = useVendorList(venueId);

  const [displayName, setDisplayName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [measure, setMeasure] = useState("mL");
  const [size, setSize] = useState<number | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const onCreate = () => {
    createProduct(
      {
        displayName,
        vendorId,
        venueId,
        measure: measure || undefined,
        size: size || undefined,
      },
      {
        onSuccess: () => {
          resetFields();
        },
      }
    );
  };

  const resetFields = () => {
    setDisplayName("");
  };

  const renderOptions = () => {
    if (!vendors) return null;
    return vendors.map(vendor => (
      <Option key={vendor.id} display={vendor.vendorName} id={vendor.id} />
    ));
  };

  const onVendorChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setVendorId(event.target.value);
  };

  const onSizeChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newSize = Number(event.target.value);
    if (Number.isNaN(newSize)) return setSize(null);
    setSize(newSize);
  };

  const onMeasureChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setMeasure(event.target.value);
  };

  const verifyFields = () => {
    return !(displayName && vendorId);
  };

  const onClose = () => {
    nav("../", { relative: "path" });
  };

  return (
    <div className="border-[1px] border-indigo-700 rounded-md shadow-md shadow-black p-2 flex flex-col gap-5">
      <div className="flex gap-2">
        <h2 className="text-xl bg-indigo-800 font-bold rounded-md p-2">
          Create a new product in your venue
        </h2>
        <button
          className="bg-orange-800 font-bold text-lg p-1 px-4 max-h-12"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <Form>
        <Field>
          <label htmlFor="displayName">Product Name</label>

          <Input
            type="text"
            id="displayName"
            placeholder="...New Product Name"
            className="p-2 px-4 rounded-full"
            onChange={onChange}
            value={displayName}
          />
        </Field>
        <Field>
          <label htmlFor="vendorId">Vendor</label>
          <select
            id="vendorId"
            onChange={onVendorChange}
            value={vendorId}
            className="p-2 px-4 pr-8 rounded-full "
          >
            <Option display="Select a vendor" id="" />
            {renderOptions()}
          </select>
        </Field>
        <div className="flex flex-col">
          <label htmlFor="size">Size</label>
          <input
            id="size"
            onChange={onSizeChange}
            value={size || ""}
            placeholder="...Size"
            className="p-2 px-4 pr-8 rounded-full "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="measure">Vendor</label>
          <Select
            id="measure"
            onChange={onMeasureChange}
            value={measure}
            className="p-2 px-4 pr-8 rounded-full "
          >
            {renderMeasureOptions()}
          </Select>
        </div>

        <CallToAction disabled={verifyFields() || status === "loading"} action={onCreate}>
          Create
        </CallToAction>
      </Form>
    </div>
  );
};

export default CreateProduct;

const Option = ({ display, id }: { display: string; id: string }) => {
  return <option value={id}>{display}</option>;
};
