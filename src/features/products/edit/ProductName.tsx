import { Input } from "common/Inputs";
import { useCallback, useRef, useState } from "react";
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
  const ref = useRef<HTMLSpanElement>(null);

  const [displayName, setDisplayName] = useState(initialName);

  const onSave = useCallback(() => {
    updateProduct({ productId, update: { displayName }, venueId });
  }, [updateProduct, productId, displayName, venueId]);

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  return (
    <div className="relative">
      <Input
        onSave={onSave}
        close={close}
        autoFocus
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        onBlur={onBlur}
      />
      <span ref={ref} onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
        ✅
      </span>
    </div>
  );
};

export default EditProductName;
