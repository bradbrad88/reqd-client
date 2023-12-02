import { useState } from "react";
import { ProductDetail } from "api/products";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";
import { useUnitOfMeasurementsList } from "src/hooks/useScalars";
import { Combo } from "common/Inputs";
import DisplayEditable from "./DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditUnitOfMeasurement = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, product.id);
  const [editMode, setEditMode] = useState(false);
  const { data: unitOfMeasurementList } = useUnitOfMeasurementsList(venueId);

  const unitOfMeasurementOptions = unitOfMeasurementList.map(unit => ({
    display: unit.value,
    value: unit.value,
  }));

  const onSave = (value: string | null) => {
    let unitOfMeasurement: { value: string } | null | undefined;
    if (value === null) unitOfMeasurement = null;
    if (value) unitOfMeasurement = unitOfMeasurementList.find(um => um.value === value);
    if (unitOfMeasurement === undefined) return;
    updateProduct({ ...product, update: { unitOfMeasurement } });
  };

  const close = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  return (
    <div>
      <label htmlFor="unitOfMeasurement">Unit</label>
      {editMode ? (
        <div className="relative">
          <Combo
            id="unitOfMeasurement"
            autoFocus
            options={unitOfMeasurementOptions}
            selectedOption={product.unitOfMeasurement?.value || null}
            setSelectedOption={onSave}
            onBlur={close}
          />
        </div>
      ) : (
        <DisplayEditable
          onClick={() => setEditMode(true)}
          text={product.unitOfMeasurement?.value || ""}
        />
      )}
    </div>
  );
};

export default EditUnitOfMeasurement;
