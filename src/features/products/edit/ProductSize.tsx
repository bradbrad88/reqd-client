import { Input } from "common/Inputs";
import { useCallback, useRef, useState } from "react";

import { useVenueContext } from "src/hooks/useContexts";
import useKeyboardSaveOrEscape from "src/hooks/useKeyboardSaveOrEscape";
import { useUpdateProduct } from "src/hooks/useProducts";

type Props = {
  productId: string;
  initialSize?: number | null;
  close: () => void;
};

const EditProductSize = ({ productId, initialSize, close }: Props) => {
  const { venueId } = useVenueContext();
  const { updateProduct } = useUpdateProduct(venueId, productId);
  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(initialSize || undefined);

  const onSave = useCallback(() => {
    updateProduct({ productId, venueId, update: { size } });
  }, [updateProduct, productId, venueId, size]);

  useKeyboardSaveOrEscape(onSave, close);

  const onBlur = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  return (
    <div ref={ref} className="relative">
      <Input
        autoFocus
        type="number"
        value={size}
        onChange={e => setSize(Number(e.target.value))}
        onBlur={onBlur}
      />
      <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
        ✅
      </span>
    </div>
  );
};

export default EditProductSize;
