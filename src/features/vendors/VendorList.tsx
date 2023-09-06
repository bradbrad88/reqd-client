import { VendorList as VendorListType } from "api/vendors";
import CallToAction from "common/CallToAction";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import { useNavigate, useOutletContext } from "react-router-dom";

type VendorListItemProps = {
  id: string;
  vendorName: string;
};

const VendorListItem = ({ id, vendorName }: VendorListItemProps) => {
  const nav = useNavigate();
  const onClick = () => {
    nav(id);
  };

  return (
    <ListItem>
      <div onClick={onClick}>{vendorName}</div>
    </ListItem>
  );
};

const VendorList = () => {
  const { vendors } = useOutletContext<{ vendors: VendorListType }>();
  const nav = useNavigate();
  const renderVendors = () => {
    if (!vendors) return null;
    return vendors.map(vendor => (
      <VendorListItem key={vendor.id} id={vendor.id} vendorName={vendor.vendorName} />
    ));
  };

  const onCreate = () => {
    nav("create");
  };

  return (
    <div className="flex flex-col gap-5">
      <CallToAction action={onCreate}>Create</CallToAction>
      <FlexList>{renderVendors()}</FlexList>
    </div>
  );
};

export default VendorList;
