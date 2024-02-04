import { VendorDetail } from "api/vendors";
import ClickToEdit from "common/ClickToEdit";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdatePreferredVendorContact } from "src/hooks/useVendors";

type Props = {
  vendor: VendorDetail;
};

const EditRepEmail = ({ vendor }: Props) => {
  const { venueId } = useVenueContext();
  const { updatePreferredVendorContact, status } = useUpdatePreferredVendorContact();

  const onSave = (value: string) => {
    updatePreferredVendorContact({ venueId, vendorId: vendor.id, email: value });
  };

  return (
    <ClickToEdit
      onSave={onSave}
      value={vendor.email || ""}
      label="Email"
      isWorking={status === "loading"}
    />
  );
};

export default EditRepEmail;
