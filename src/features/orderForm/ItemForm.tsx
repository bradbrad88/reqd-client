import { AreaProduct, ProductLine } from "api/areas";
import { SupplyDetails } from "api/inventory";
import { formatDayMonth } from "utils/dates";
import { useOrderHistoryContext, useVenueContext } from "src/hooks/useContexts";
import { useSetProductQuantity } from "src/hooks/useOrders";
import Card from "common/Card";
import Button from "common/Button";

import type { OrderDetail, OrderHistory } from "api/orders";

type Props = {
  order: OrderDetail;
  areaId: string;
  product: AreaProduct;
  productLine: ProductLine;
  supplyDetails: SupplyDetails | null;
};

const ItemForm = ({ order, product, supplyDetails }: Props) => {
  const orderQuantity = order.products[product.id]?.quantity || 0;
  const productExistsInOrder = !!order.products[product.id];
  const { periods, productHistory } = useOrderHistoryContext();

  return (
    <Card className="p-3">
      <ProductDescription product={product} highlight={orderQuantity > 0} />
      <RenderHistory
        periods={periods}
        productHistory={productHistory[product.id] || []}
        currentOrderQuantity={orderQuantity}
      />

      {/* Display Order Amount and Increment / Decrement Buttons */}
      {supplyDetails ? (
        <SupplyControl
          orderId={order.id}
          productId={product.id}
          orderQuantity={orderQuantity}
          supplyDetails={supplyDetails}
          unitTypePlural={product.unitType.plural}
          productExists={productExistsInOrder}
        />
      ) : (
        <MissingSupplyDetails />
      )}
    </Card>
  );
};

function RenderHistory({
  periods,
  productHistory,
  currentOrderQuantity,
}: {
  periods: Array<[string, string]>;
  productHistory: OrderHistory["products"][string];
  currentOrderQuantity: number;
}) {
  const renderDates = () => {
    const dateElements = periods.map(([startDate]) => (
      <div key={new Date(startDate).getTime()} className="text-right text-sm pr-2">
        {formatDayMonth(new Date(startDate))}
      </div>
    ));
    return <>{dateElements}</>;
  };

  const renderHistory = () => {
    const history =
      productHistory.length === 0 ? periods.map(() => ({ quantity: 0 })) : productHistory;
    const historyElements = history.map(({ quantity }, idx) => {
      const isCurrentDate = idx === periods.length - 1;
      const isCurrent = isCurrentDate && currentOrderQuantity > 0;
      const totalAmount = isCurrentDate ? quantity + currentOrderQuantity : quantity;
      return (
        <div
          key={idx}
          className="w-full text-right pr-2 border-zinc-600 border-[1px]"
          style={{
            fontWeight: isCurrent ? "bold" : "",
          }}
        >
          {totalAmount > 0 ? totalAmount : "-"}
        </div>
      );
    });
    return <>{historyElements}</>;
  };

  return (
    <div
      className="grid pb-1"
      style={{
        gridTemplateColumns: `repeat(${periods.length}, minmax(0, 1fr))`,
      }}
    >
      {renderDates()}
      {renderHistory()}
    </div>
  );
}

function SupplyControl({
  orderQuantity,
  supplyDetails,
  unitTypePlural,
  orderId,
  productId,
  productExists,
}: {
  orderQuantity: number;
  supplyDetails: SupplyDetails;
  unitTypePlural: string;
  orderId: string;
  productId: string;
  productExists: boolean;
}) {
  const { venueId } = useVenueContext();
  const { setProductQuantity } = useSetProductQuantity();
  const onIncrease = () => {
    const incrementAmount = supplyDetails!.packageQuantity || 1;
    const quantity = orderQuantity + incrementAmount;
    setProductQuantity({
      venueId,
      orderId,
      productId,
      quantity,
      supplyDetails: productExists ? undefined : supplyDetails.vendorRangeId,
    });
  };

  const onDecrease = () => {
    const incrementAmount = supplyDetails!.packageQuantity || 1;
    const newAmount = orderQuantity - incrementAmount;
    const quantity = newAmount < 0 ? 0 : newAmount;
    setProductQuantity({
      venueId,
      orderId,
      productId,
      quantity,
      supplyDetails: productExists ? undefined : supplyDetails.vendorRangeId,
    });
  };
  return (
    <div className="grid grid-cols-[1fr,_min-content] items-center">
      <OrderAmount
        unitType={unitTypePlural}
        orderQuantity={orderQuantity}
        supplyDetails={supplyDetails}
      />
      <div className="flex gap-6">
        <button
          className="w-12 p-1 h-min border-indigo-600 bg-zinc-950 border-[1px] font-bold text-xl"
          onClick={onDecrease}
        >
          -
        </button>
        <button
          className="w-12 p-1 h-min bg-zinc-950 outline-none focus-within:outline-none focus-visible:outline-none focus-within:border-lime-300 border-lime-600 border-[1px] font-bold text-xl"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ProductDescription({
  product,
  highlight,
}: {
  product: AreaProduct;
  highlight?: boolean;
}) {
  const dynamicStyles = highlight ? "text-white" : "text-zinc-200 italic";

  return (
    <div className={"text-base font-bold " + dynamicStyles}>
      <p>{product.displayName}</p>
      <p className="text-sm italic text-zinc-300">
        {product.size}
        {product.unitOfMeasurement?.value} {product.unitType.plural}
      </p>
    </div>
  );
}

function OrderAmount({
  orderQuantity,
  unitType,
  supplyDetails,
}: {
  orderQuantity: number;
  unitType: string;
  supplyDetails: SupplyDetails;
}) {
  const { packageQuantity, packageType } = supplyDetails;
  const packageAmount = orderQuantity / packageQuantity;
  const dynamicStyles = orderQuantity > 0 ? "text-lime-300" : "text-indigo-300";

  return (
    <div className={"font-bold " + dynamicStyles}>
      {packageAmount} {packageType.plural} ({orderQuantity} {unitType})
    </div>
  );
}

export default ItemForm;

function MissingSupplyDetails() {
  return (
    <div className="flex gap-3">
      <p className="text-sm leading-tight italic text-zinc-300">
        This product doesn't have a default vendor. We need to know who you order this from,
        and how it's packaged
      </p>
      <Button className="h-8 self-end" variant={"outline"}>
        Setup
      </Button>
    </div>
  );
}
