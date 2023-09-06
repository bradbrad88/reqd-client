import Field from "common/Field";
import { Checkbox } from "common/Inputs";
import { useProductsContext, useVenueContext } from "../../hooks/useContexts";
import { useVendorList } from "src/hooks/useVendors";

const VendorFilter = () => {
  const { addToVendorFilter, removeFromVendorFilter, filterIncludes } = useProductsContext();
  const { venueId } = useVenueContext();
  const { data: vendors, status } = useVendorList(venueId);

  const onChecked: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { id, checked } = event.target;
    if (checked) {
      addToVendorFilter(id);
    } else {
      removeFromVendorFilter(id);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  const renderVendors = () => {
    if (!vendors) return null;
    return vendors.map(vendor => (
      <div key={vendor.id} className="flex flex-row gap-3">
        <Checkbox
          id={vendor.id}
          onChange={onChecked}
          key={vendor.id}
          checked={filterIncludes("vendorId", vendor.id)}
        />
        <label htmlFor={vendor.id}>{vendor.vendorName}</label>
      </div>
    ));
  };

  return (
    <Field>
      <h2 className="text-xl font-bold">Filter vendor</h2>
      <div className="flex flex-col gap-0 text-xl">{renderVendors()}</div>
    </Field>
  );
};

export default VendorFilter;
