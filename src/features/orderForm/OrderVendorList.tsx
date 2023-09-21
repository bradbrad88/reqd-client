import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useProductList } from "src/hooks/useProducts";
import { useOrderDetail } from "src/hooks/useOrders";
import FixedCallToAction from "common/FixedCallToAction";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";

const OrderVendorList = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: products } = useProductList(venueId);

  const vendors = useMemo(() => {
    const productMap = new Map<string, { vendorId: string; vendorName: string }>();
    for (const product of products) {
      if (product.vendorId != null && product.vendorName != null) {
        productMap.set(product.id, {
          vendorId: product.vendorId,
          vendorName: product.vendorName,
        });
      }
    }
    const vendors =
      order?.items.reduce((map, item) => {
        if (item.totalAmount === 0) return map;
        const vendorData = productMap.get(item.productId);
        if (vendorData) {
          const vendor = map.get(vendorData.vendorId) || {
            vendorId: vendorData.vendorId,
            vendorName: vendorData.vendorName,
            productCount: 0,
          };
          map.set(vendorData.vendorId, { ...vendor, productCount: vendor.productCount + 1 });
        }
        return map;
      }, new Map<string, { vendorId: string; vendorName: string; productCount: number }>()) ||
      new Map();
    return Array.from(vendors?.values()) as {
      vendorId: string;
      vendorName: string;
      productCount: number;
    }[];
  }, [order?.items, products]);

  const renderVendors = () => {
    return vendors.map(vendor => (
      <Link to={vendor.vendorId} key={vendor.vendorId}>
        <div className="bg-zinc-900 cursor-pointer hover:bg-zinc-900 text-zinc-300 text-lg">
          <ListItem>
            <span className="font-bold text-white mr-3">{vendor.vendorName}</span>
            {vendor.productCount} item{vendor.productCount === 1 ? "" : "s"}
          </ListItem>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <FlexList>{renderVendors()}</FlexList>
      <FixedCallToAction to="edit">Edit</FixedCallToAction>
    </div>
  );
};

export default OrderVendorList;
