import { Combo } from "common/Inputs";
import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdateProduct } from "src/hooks/useProducts";

type Props = {
  productId: string;
  initialPackageType: string | null;
  close: () => void;
};

const EditProductPackageType = ({ productId, initialPackageType, close }: Props) => {
  const { venueId } = useVenueContext();
  const [packageType, setPackageType] = useState<string | null>(initialPackageType);

  const { updateProduct } = useUpdateProduct(venueId, productId);

  const onSave = (value: string | null) => {
    if (!value) return; // TODO: rush job, validate properly and provide feedback to user
    updateProduct({ productId, venueId, update: { packageType: value } });
  };

  const onBlur = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  const setSelectedOption = (value: string | null) => {
    onSave(value);
    setPackageType(value);
  };

  const options = [
    { value: "Keg", display: "Keg" },
    { value: "Stubby", display: "Stubby" },
    { value: "Bottle", display: "Bottle" },
  ];

  return (
    <div className="relative">
      <Combo
        selectedOption={packageType}
        setSelectedOption={setSelectedOption}
        label=""
        autoFocus
        options={options}
        onBlur={onBlur}
      />
    </div>
  );
};

export default EditProductPackageType;
