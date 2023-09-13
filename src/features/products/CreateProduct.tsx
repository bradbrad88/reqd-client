import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "src/hooks/useProducts";
import { useVendorList } from "src/hooks/useVendors";
import { useVenueContext } from "src/hooks/useContexts";
import CallToAction from "../../common/CallToAction";
import Form from "../../common/Form";
import Field from "common/Field";
import { Combo, Input } from "common/Inputs";
import {
  usePackaageTypeList,
  useUnitOfMeasurementsList,
  useUnitTypeList,
} from "src/hooks/useScalars";

const CreateProduct = () => {
  const nav = useNavigate();
  const { venueId } = useVenueContext();
  const { createProduct, status } = useCreateProduct(venueId);
  const { data: vendors } = useVendorList(venueId);

  const [vendorId, setVendorId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [unitType, setUnitType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [packageQuantity, setPackageQuantity] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("mL");

  const { data: unitTypes } = useUnitTypeList(venueId);
  const { data: packageTypes } = usePackaageTypeList(venueId);
  const { data: unitOfMeasurements } = useUnitOfMeasurementsList(venueId);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const onCreate = () => {
    if (!verifyFields()) return;
    console.log("Creating");
    createProduct(
      {
        displayName,
        vendorId,
        venueId,
        unitType,
        packageType,
        packageQuantity: packageQuantity!,
        unitOfMeasurement: unitOfMeasurement || undefined,
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

  const unitTypeOptions = unitTypes.map(unit => ({
    display: unit.unitType,
    value: unit.unitType,
  }));
  const packageTypeOptions = packageTypes.map(unit => ({
    display: unit.packageType,
    value: unit.packageType,
  }));
  const unitOfMeasurementsOptions = unitOfMeasurements.map(unit => ({
    display: unit.unitOfMeasurement,
    value: unit.unitOfMeasurement,
  }));

  const onVendorChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setVendorId(event.target.value);
  };

  const onUnitTypeChange = (value: string | null) => {
    if (!value) return setUnitType("");
    setUnitType(value);
  };

  const onPackageTypeChange = (value: string | null) => {
    setPackageType(value || "");
  };

  const onPackageQuantityChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const num = Number(event.target.value);
    if (isNaN(num)) return;
    setPackageQuantity(num);
  };

  const onSizeChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newSize = Number(event.target.value);
    if (Number.isNaN(newSize)) return setSize(null);
    setSize(newSize);
  };

  const onUnitOfMeasurementChange = (value: string | null) => {
    setUnitOfMeasurement(value || "");
  };

  const verifyFields = () => {
    return [
      validateDisplayName(displayName),
      validateUnitType(unitType),
      validatePackageType(packageType),
      validatePackageQuantity(packageQuantity),
    ].every(res => res);
  };

  function validateDisplayName(name: string | null) {
    if (name == null) return false;
    if (name.length < 2) return false;
    return true;
  }

  function validateUnitType(unitType: string | null) {
    if (unitType == null) return false;
    if (unitType.length < 1) return false;
    return true;
  }

  function validatePackageType(packageType: string | null) {
    if (packageType == null) return false;
    if (packageType.length < 1) return false;
    return true;
  }

  function validatePackageQuantity(qty: number | null) {
    if (qty == null) return false;
    if (isNaN(qty)) return false;
    if (qty < 1) return false;

    return true;
  }

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
            autoFocus
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
        <Field>
          <label htmlFor="unitType">Unit Type</label>
          <Combo
            id="unitType"
            selectedOption={unitType}
            setSelectedOption={onUnitTypeChange}
            options={unitTypeOptions}
          />
        </Field>
        <Field>
          <label htmlFor="packageType">Package Type</label>
          <Combo
            id="packageType"
            selectedOption={packageType}
            setSelectedOption={onPackageTypeChange}
            options={packageTypeOptions}
          />
        </Field>
        <Field>
          <label htmlFor="packageQuantity">Package Quantity</label>
          <Input
            id="packageQuantity"
            onChange={onPackageQuantityChange}
            value={packageQuantity || ""}
            type="number"
          />
        </Field>
        <Field>
          <label htmlFor="size">Size</label>
          <Input
            id="size"
            onChange={onSizeChange}
            value={size || ""}
            placeholder="size..."
            type="number"
          />
        </Field>
        <div className="flex flex-col">
          <label htmlFor="measure">Unit of measurement</label>
          <Combo
            id="unitOfMeasurement"
            setSelectedOption={onUnitOfMeasurementChange}
            selectedOption={unitOfMeasurement}
            options={unitOfMeasurementsOptions}
          />
        </div>
        <CallToAction disabled={!verifyFields() || status === "loading"} action={onCreate}>
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
