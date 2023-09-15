import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUnitTypeList } from "src/hooks/useScalars";
import { Combo } from "common/Inputs";
import DisplayEditable from "./DisplayEditable";
import { useUpdateProduct } from "src/hooks/useProducts";
import { ProductDetail } from "api/products";

type Props = {
  product: ProductDetail;
};

const EditUnitType = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { data: unitTypes } = useUnitTypeList(venueId);
  const { updateProduct } = useUpdateProduct(venueId, product.id);

  const [editMode, setEditMode] = useState(false);

  const onBlur = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  const onChange = (value: string | null) => {
    if (!value) return;
    updateProduct({ ...product, update: { unitType: value } });
    setEditMode(false);
  };

  const options = unitTypes.map(unit => ({ value: unit.unitType, display: unit.unitType }));

  return (
    <div>
      <label htmlFor="unitType">Unit Type</label>
      {editMode ? (
        <Combo
          id="unitType"
          autoFocus
          options={options}
          selectedOption={product.unitType}
          setSelectedOption={onChange}
          onBlur={onBlur}
        />
      ) : (
        <DisplayEditable text={product.unitType} onClick={() => setEditMode(true)} />
      )}
    </div>
  );
};

export default EditUnitType;
