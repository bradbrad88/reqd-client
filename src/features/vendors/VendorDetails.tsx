import { useNavigate, useParams } from "react-router-dom";
import { useDeleteVendor, useVendorDetail } from "./queries";
import { useContext } from "react";
import venueContext from "ctx/VenueContext";
import { useVenueContext } from "src/hooks/useContexts";

const VendorDetails = () => {
  const { venueId } = useVenueContext();
  const { vendorId } = useParams<{ vendorId: string }>();
  const { vendor } = useVendorDetail(vendorId!);

  const { mutate } = useDeleteVendor(venueId);
  const nav = useNavigate();

  const onDelete = () => {
    mutate(
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
