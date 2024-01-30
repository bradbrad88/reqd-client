import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useRemoveVendorFromVenue, useVendorDetail } from "src/hooks/useVendors";

const VendorDetails = () => {
  const { venueId } = useVenueContext();
  const { vendorId } = useParams<{ vendorId: string }>();
  const { data: vendor } = useVendorDetail(vendorId!, venueId);

  const { removeVendor } = useRemoveVendorFromVenue();
  const nav = useNavigate();

  const onDelete = () => {
    removeVendor(
      { vendorId: vendorId!, venueId },
      {
        onSuccess: () => {
          nav("../", { relative: "path", replace: true });
        },
      }
    );
  };

  return (
    <div>
      {vendor?.vendorName}
      <div>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default VendorDetails;
