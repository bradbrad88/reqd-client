import AvatarList, { AvatarItem } from "common/AvatarList";
import SearchBar from "common/SearchBar";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddVendorToVenue, useGlobalVendorList } from "src/hooks/useVendors";

const AddVendorToVenue = () => {
  const { venueId } = useVenueContext();
  const [query, setQuery] = useState("");
  const { globalVendorList, status } = useGlobalVendorList(venueId, query);
  const { addVendor } = useAddVendorToVenue();

  const avatarList: AvatarItem[] = globalVendorList.map(vendor => ({
    id: vendor.id,
    description: vendor.vendorName,
    displayName: vendor.vendorName,
    imageUrl: vendor.logo,
    selected: vendor.isPreferred,
  }));

  const onSelect = (vendorId: string) => {
    addVendor({ venueId, vendorId });
  };

  const onSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <HorizontalSplitFitBottomFillTop
      top={
        status === "loading" ? (
          <div>Loading</div>
        ) : (
          <div className="p-3">
            <h1 className="text-2xl"></h1>
            <div className="rounded-xl overflow-hidden border-[1px] border-zinc-600">
              <AvatarList items={avatarList} onSelect={onSelect} />
            </div>
          </div>
        )
      }
      bottom={
        <div className="p-3">
          <SearchBar autoFocus onSearch={onSearch} placeholder="Search vendors..." />
        </div>
      }
    />
  );
};

export default AddVendorToVenue;
