import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useRemoveVendorFromVenue, useVendorDetail } from "src/hooks/useVendors";
import DestructiveDialog from "common/DestructiveDialog";
import Card from "common/Card";
import Button from "common/Button";

const VendorDetails = () => {
  const { venueId, venueName } = useVenueContext();
  const { vendorId } = useParams<{ vendorId: string }>();
  const { data: vendor } = useVendorDetail(vendorId!, venueId);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4 mt-3">
        Edit the details of your relationship with {vendor?.vendorName}
      </h1>
      <div className="">
        <Card className="flex flex-col">
          <p className="text-orange-400">Warning! (Permanent)</p>
          <h2 className="text-lg font-bold">
            Remove <span className="italic">{vendor?.vendorName}</span> from {venueName}
          </h2>
          <p>
            If you no longer use this vendor then remove them from your preferred vendors by
            clicking here
          </p>
          <Button
            onClick={() => setConfirmDelete(true)}
            variant={"destructive"}
            className="mt-3 ml-auto"
          >
            Remove Vendor
          </Button>
          <DestructiveDialog
            open={confirmDelete}
            actionButtonText={`Remove ${vendor?.vendorName}`}
            onAction={onDelete}
            setOpen={setConfirmDelete}
            title={`Remove ${vendor?.vendorName}?`}
          >
            Are you sure you wish to remove this vendor from your venue? This action can not be
            undone...
          </DestructiveDialog>
        </Card>
      </div>
    </div>
  );
};

export default VendorDetails;
