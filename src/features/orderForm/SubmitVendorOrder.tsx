import { useOutletContext, useParams } from "react-router-dom";
import { OrderDetail } from "api/orders";
import { useVenueContext } from "src/hooks/useContexts";
import { useVendorSummary } from "src/hooks/useOrders";
import FixedCallToAction from "common/FixedCallToAction";
import FlexList from "common/FlexList";

const SubmitVendorOrder = () => {
  const { venueId } = useVenueContext();
  const { vendorId } = useParams<{ vendorId: string; orderId: string }>();
  const { order } = useOutletContext<{ order: OrderDetail }>();
  const { vendorSummary } = useVendorSummary(venueId, order.id, vendorId!);

  const renderProducts = () => {
    if (!vendorSummary) return null;
    return vendorSummary.products.map(
      ({ id, quantity, displayName, packageType, unitType, size, unitOfMeasurement }) => (
        <div key={id} className="bg-zinc-900 p-3 rounded-md">
          {displayName} {unitType.plural} {size}
          {unitOfMeasurement?.value}:{" "}
          <span className="text-lime-400">
            {quantity} {quantity === 1 ? packageType.value : packageType.plural}
          </span>
        </div>
      )
    );
  };

  const onCopy = () => {
    if (!vendorSummary) return;
    const text = vendorSummary.products
      .map(({ displayName, packageType, quantity, unitType, size, unitOfMeasurement }) => {
        return `${displayName} ${size}${unitOfMeasurement?.value} ${
          unitType.plural
        }: ${quantity} ${quantity === 1 ? packageType.value : packageType.plural}`;
      })
      .join(",\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{vendorSummary?.vendor.vendorName}</h1>
      <FlexList>{renderProducts()}</FlexList>
      <FixedCallToAction action={onCopy}>Copy Order</FixedCallToAction>
    </div>
  );
};

export default SubmitVendorOrder;
