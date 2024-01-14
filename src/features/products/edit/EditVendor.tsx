import { useState } from "react";
import { ProductDetail } from "api/products";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProductVendor } from "src/hooks/useProducts";
import { useVendorList } from "src/hooks/useVendors";
import { Combo } from "common/Inputs";
import DisplayEditable from "common/DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditVendor = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { data: vendors } = useVendorList(venueId);
  const { updateVendor } = useUpdateProductVendor(venueId, product.id);
  const [editMode, setEditMode] = useState(false);

  const vendorOptions: { display: string; value: string | null }[] = vendors.map(vendor => ({
    display: vendor.vendorName,
    value: vendor.id,
  }));

  const onSave = (value: string | null) => {
    const vendorName = value
      ? vendorOptions.find(option => option.value === value)!.display
      : "";

    updateVendor({ ...product, vendorId: value, vendorName });
  };

  const close = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  return (
    <div>
      <label htmlFor="vendorId">Vendor</label>
      {editMode ? (
        <Combo
          id="vendorId"
          autoFocus
          options={vendorOptions}
          selectedOption={product.vendorId || null}
          setSelectedOption={onSave}
          onBlur={close}
        />
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.vendorName} />
      )}
    </div>
  );
};

export default EditVendor;
