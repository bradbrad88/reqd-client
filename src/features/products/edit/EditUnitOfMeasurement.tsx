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
    display: unit.unitOfMeasurement,
    value: unit.unitOfMeasurement,
  }));

  const onSave = (value: string | null) => {
    if (!value) return;
    updateProduct({ ...product, update: { unitOfMeasurement: value } });
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
            selectedOption={product.unitOfMeasurement || null}
            setSelectedOption={onSave}
            onBlur={close}
          />
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.unitOfMeasurement} />
      )}
    </div>
  );
};

export default EditUnitOfMeasurement;
