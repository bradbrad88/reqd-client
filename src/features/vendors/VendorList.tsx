import { useNavigate } from "react-router-dom";
import { useVendorList } from "src/hooks/useVendors";
import { useVenueContext } from "src/hooks/useContexts";
import AvatarList, { AvatarItem } from "common/AvatarList";
import FixedCallToAction from "common/FixedCallToAction";

const VendorList = () => {
  const { venueId, venueName } = useVenueContext();
  const { data: vendors } = useVendorList(venueId);
  const nav = useNavigate();

  const onSelectVendor = (vendor: string) => {
    nav(vendor);
  };

  const renderVendors = () => {
    if (!vendors) return null;
    const items: AvatarItem[] = vendors.map(vendor => ({
      id: vendor.id,
      description: "",
      displayName: vendor.vendorName,
      imageUrl: vendor.logo,
    }));
    return (
      <ul className="rounded-xl overflow-hidden border-[1px] border-zinc-600">
        <AvatarList items={items} onSelect={onSelectVendor} />
      </ul>
    );
  };

  const onCreate = () => {
    nav("create");
  };

  return (
    <main className="p-3">
      <header className="mb-3 mt-3">
        <h1 className="text-2xl">Vendors currently used at {venueName}</h1>
      </header>
      <div className="flex flex-col gap-5">
        <FixedCallToAction action={onCreate}>Add Vendor</FixedCallToAction>
        {renderVendors()}
      </div>
    </main>
  );
};

export default VendorList;
