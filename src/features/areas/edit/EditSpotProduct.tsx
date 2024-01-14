import Slideover from "common/Slideover";
import SearchAndPickProduct from "features/inventory/SearchAndPickProduct";

type Props = {
  open: boolean;
  onProductChange: (productId: string | null) => void;
  close: () => void;
};

const EditSpotProduct = ({ open, onProductChange, close }: Props) => {
  const onValueChange = (productId: string | null) => {
    onProductChange(productId);
    close();
  };

  return (
    <Slideover
      open={open}
      title="What product belongs here?"
      closeButton={false}
      setOpen={close}
    >
      <SearchAndPickProduct close={close} onValueChange={onValueChange} />
    </Slideover>
  );
};

export default EditSpotProduct;
