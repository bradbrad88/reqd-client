import { VendorDetail } from "api/vendors";
import ClickToEdit from "common/ClickToEdit";
import { useVenueContext } from "src/hooks/useContexts";
import { useUpdatePreferredVendorContact } from "src/hooks/useVendors";

type Props = {
  vendor: VendorDetail;
};

const EditRepContactNumber = ({ vendor }: Props) => {
  const { venueId } = useVenueContext();
  const { updatePreferredVendorContact, status } = useUpdatePreferredVendorContact();

  const onSave = (value: string) => {
    updatePreferredVendorContact({ venueId, vendorId: vendor.id, contactNumber: value });
  };

  return (
    <ClickToEdit
      onSave={onSave}
      value={vendor.contactNumber || ""}
      label="Contact Number"
      isWorking={status === "loading"}
    />
  );
};

export default EditRepContactNumber;
