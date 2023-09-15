import { ProductDetail } from "api/products";
import { Input } from "common/Inputs";
import { useCallback, useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";
import DisplayEditable from "./DisplayEditable";

type Props = {
  product: ProductDetail;
};

const EditDisplayName = ({ product }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, product.id);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(product.displayName);

  const close = () => {
    setEditMode(false);
    setDisplayName(product.displayName);
  };

  const onSave = useCallback(() => {
    updateProduct({ ...product, update: { displayName } });
  }, [updateProduct, product, displayName]);

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  return (
    <div>
      <label htmlFor="displayName">Product Name</label>
      {editMode ? (
        <div className="relative">
          <Input
            id="displayName"
            autoFocus
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            onBlur={onBlur}
            onSave={onSave}
            close={close}
          />
          <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
            ✅
          </span>
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={product.displayName} />
      )}
    </div>
  );
};

export default EditDisplayName;
