import { Outlet } from "react-router-dom";

import { useVenueContext } from "src/hooks/useContexts";
import { useVendorList } from "src/hooks/useVendors";

const Vendors = () => {
  const { venueId } = useVenueContext();
  const { data: vendors } = useVendorList(venueId);
  return (
    <div>
      Vendors
      <Outlet context={{ vendors }} />
    </div>
  );
};

export default Vendors;
