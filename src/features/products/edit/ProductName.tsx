import { Input } from "common/Inputs";
import { useState } from "react";

import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";

type Props = {
  productId: string;
  initialName: string;
  close: () => void;
};

const EditProductName = ({ productId, initialName, close }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, productId);

  const [displayName, setDisplayName] = useState(initialName);

  const onSave = () => {
    updateProduct({ productId, update: { displayName }, venueId });
    close();
  };

  return (
    <div className="relative">
      <Input
        autoFocus
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        onBlur={close}
      />
      <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
        ✅
      </span>
    </div>
  );
};

export default EditProductName;
