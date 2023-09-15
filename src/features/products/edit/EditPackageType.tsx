import { ProductDetail } from "api/products";
import { Combo } from "common/Inputs";
import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";
import { usePackaageTypeList } from "src/hooks/useScalars";
import DisplayEditable from "./DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditProductPackageType = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { data: packageTypes } = usePackaageTypeList(venueId);
  const [editMode, setEditMode] = useState(false);
  const [packageType, setPackageType] = useState<string | null>(product.packageType);

  const { updateProduct } = useUpdateProduct(venueId, product.id);

  const onSave = (value: string | null) => {
    if (!value) return; // TODO: rush job, validate properly and provide feedback to user
    updateProduct({ ...product, update: { packageType: value } });
  };

  const onBlur = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  const setSelectedOption = (value: string | null) => {
    onSave(value);
    setPackageType(value);
  };

  const options = packageTypes.map(pack => ({
    display: pack.packageType,
    value: pack.packageType,
  }));

  return (
    <div>
      <label htmlFor="packageType">Package Type</label>
      {editMode ? (
        <div className="relative">
          <Combo
            id="packageType"
            selectedOption={packageType}
            setSelectedOption={setSelectedOption}
            label=""
            autoFocus
            options={options}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.packageType} />
      )}
    </div>
  );
};

export default EditProductPackageType;
