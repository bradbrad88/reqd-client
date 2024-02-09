import { useVenueContext } from "src/hooks/useContexts";
import { useGetProductVendorOptions } from "src/hooks/useInventory";
import Slideover from "common/Slideover";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import AvatarList, { AvatarItem } from "common/AvatarList";
import Button from "common/Button";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  productId: string;
  setDefaultSupplier: (vendorRangeId: string) => void;
};

const EditDefaultSupplier = ({ open, setOpen, productId, setDefaultSupplier }: Props) => {
  const { venueId } = useVenueContext();
  const { vendorOptions } = useGetProductVendorOptions(venueId, productId);

  const onSelect = (vendorRangeId: string) => {
    setDefaultSupplier(vendorRangeId);
    setOpen(false);
  };

  const items: AvatarItem[] | undefined = vendorOptions?.map(
    ({ vendorRangeId, vendor: { vendorName, logo }, packageType, packageQuantity }) => ({
      id: vendorRangeId,
      displayName: vendorName,
      imageUrl: logo,
      description: `${packageType.value} (${packageQuantity} units)`,
    })
  );

  return (
    <Slideover open={open} title="Choose a supplier" setOpen={setOpen} closeButton={false}>
      <HorizontalSplitFitBottomFillTop
        top={<>{items && <AvatarList items={items} onSelect={onSelect} />}</>}
        bottom={
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        }
      />
    </Slideover>
  );
};

export default EditDefaultSupplier;
