import { ProductDetail } from "api/products";
import { Input } from "common/Inputs";
import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";
import DisplayEditable from "./DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditSize = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, product.id);
  const [editMode, setEditMode] = useState(false);
  const [size, setSize] = useState(product.size);

  const onSave = () => {
    updateProduct({ ...product, update: { size } });
  };

  const onBlur = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  return (
    <div>
      <label htmlFor="size">Size</label>
      {editMode ? (
        <div className="relative">
          <Input
            id="size"
            autoFocus
            value={size}
            onChange={e => setSize(Number(e.target.value))}
            onSave={onSave}
            close={() => setEditMode(false)}
            onBlur={onBlur}
            type="number"
          />
          <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
            ✅
          </span>
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.size} />
      )}
    </div>
  );
};

export default EditSize;
