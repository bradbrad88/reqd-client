import { OrderDetail } from "api/orders";
import FixedCallToAction from "common/FixedCallToAction";
import AvatarList from "common/AvatarList";

import type { AvatarItem } from "common/AvatarList";
import { useNavigate } from "react-router-dom";

type Props = {
  order: OrderDetail;
};

const OrderVendorList = ({ order }: Props) => {
  const nav = useNavigate();
  const onSelect = (vendorId: string) => {
    nav(vendorId);
  };

  const items: AvatarItem[] = order.vendorSummary.map(vendor => ({
    id: vendor.vendorId,
    displayName: vendor.vendorName,
    description: vendor.productCount + " item" + (vendor.productCount === 1 ? "" : "s"),
  }));

  return (
    <div className="p-3">
      <div className="rounded-xl border-[1px] border-zinc-600 overflow-hidden">
        <AvatarList items={items} onSelect={onSelect} />
        <FixedCallToAction to="edit">Edit</FixedCallToAction>
      </div>
    </div>
  );
};

export default OrderVendorList;
