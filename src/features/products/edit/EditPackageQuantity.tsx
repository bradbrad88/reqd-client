import { ProductDetail } from "api/products";
import { Input } from "common/Inputs";
import { useCallback, useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";
import DisplayEditable from "./DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditPackageQuantity = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, product.id);

  const [editMode, setEditMode] = useState(false);
  const [packageQuantity, setPackageQuantity] = useState<number | null>(
    product.packageQuantity
  );

  const onSave = () => {
    if (packageQuantity == null) return;
    updateProduct({ ...product, update: { packageQuantity } });
  };

  const close = () => {
    setEditMode(false);
    setPackageQuantity(product.packageQuantity);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const num = Number(event.target.value);
    if (isNaN(num)) return setPackageQuantity(null);
    if (num < 0) return setPackageQuantity(0);
    setPackageQuantity(num);
  };

  const onBlur = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  return (
    <div>
      <label htmlFor="packageQuantity">Quantity</label>
      {editMode ? (
        <div className="relative">
          <Input
            id="packageQuantity"
            autoFocus
            value={packageQuantity || ""}
            onChange={onChange}
            onBlur={onBlur}
            onSave={onSave}
            close={close}
            type="number"
          />
          <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
            ✅
          </span>
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.packageQuantity} />
      )}
    </div>
  );
};

export default EditPackageQuantity;
