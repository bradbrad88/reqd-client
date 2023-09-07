import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useDeleteVendor, useVendorDetail } from "src/hooks/useVendors";

const VendorDetails = () => {
  const { venueId } = useVenueContext();
  const { vendorId } = useParams<{ vendorId: string }>();
  const { data: vendor } = useVendorDetail(vendorId!, venueId);

  const { deleteVendor } = useDeleteVendor(venueId);
  const nav = useNavigate();

  const onDelete = () => {
    deleteVendor(
      { vendorId: vendorId!, venueId },
      {
        onSuccess: () => {
          nav("../", { relative: "path" });
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
