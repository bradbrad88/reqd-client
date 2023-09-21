import { ProductDetail } from "api/products";
import FixedCallToAction from "common/FixedCallToAction";
import FlexList from "common/FlexList";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useOrderDetail } from "src/hooks/useOrders";
import { useProductList } from "src/hooks/useProducts";
import { useVendorDetail } from "src/hooks/useVendors";

const SubmitVendorOrder = () => {
  const { venueId } = useVenueContext();
  const { orderId, vendorId } = useParams<{ vendorId: string; orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: products } = useProductList(venueId);
  const { data: vendor } = useVendorDetail(vendorId!, venueId);

  type VendorProduct = {
    productId: string;
    displayName: string;
    amount: number;
    packageType: string;
    unitType: string;
    size?: number;
    unitOfMeasurement?: string;
  };

  const productList = useMemo<VendorProduct[]>(() => {
    const productMap = new Map<string, ProductDetail>();
    for (const product of products) {
      productMap.set(product.id, product);
    }
    if (!order) return [];
    const orderMap = new Map<string, { productId: string; totalAmount: number }>();
    for (const item of order.items) {
      orderMap.set(item.productId, item);
    }

    const filteredOrderItems = order.items.filter(
      item => productMap.get(item.productId)?.vendorId === vendorId
    );

    return filteredOrderItems.map(orderItem => {
      const {
        id,
        displayName,
        packageQuantity,
        packageType,
        unitType,
        size,
        unitOfMeasurement,
      } = productMap.get(orderItem.productId)!;

      return {
        productId: id,
        displayName,
        packageType,
        amount: orderItem.totalAmount / packageQuantity,
        unitType,
        size,
        unitOfMeasurement,
      };
    });
  }, [products, order, vendorId]);

  const renderProducts = () => {
    return productList.map(
      ({ productId, amount, displayName, packageType, unitType, size, unitOfMeasurement }) => (
        <div key={productId} className="bg-zinc-900 p-3 rounded-md">
          {displayName} {unitType}s {size}
          {unitOfMeasurement}:{" "}
          <span className="text-lime-400">
            {amount} {packageType}
            {amount === 1 ? "" : "s"}
          </span>
        </div>
      )
    );
  };

  const onCopy = () => {
    const text = productList
      .map(({ displayName, packageType, amount, unitType, size, unitOfMeasurement }) => {
        return `${displayName} ${unitType}s ${size}${unitOfMeasurement}: ${amount} ${packageType}${
          amount === 1 ? "" : "s"
        }`;
      })
      .join(",\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{vendor?.vendorName}</h1>
      <FlexList>{renderProducts()}</FlexList>
      <FixedCallToAction action={onCopy}>Copy Order</FixedCallToAction>
    </div>
  );
};

export default SubmitVendorOrder;
