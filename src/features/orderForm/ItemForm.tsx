import { useCallback, useState } from "react";
import { cn } from "utils/cn";
import { AreaProduct, ProductLine } from "api/areas";
import { SupplyDetails } from "api/inventory";
import { formatDayMonth } from "utils/dates";
import { useOrderHistoryContext, useVenueContext } from "src/hooks/useContexts";
import useDebounce from "src/hooks/useDebounce";
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
  const { venueId } = useVenueContext();
  const productExistsInOrder = !!order.products[product.id];
  const { periods, productHistory } = useOrderHistoryContext();
  const initialQuantity = order.products[product.id]?.quantity || 0;
  const [orderQuantity, setQuantityState] = useState(initialQuantity);
  const { setProductQuantity } = useSetProductQuantity();
  const cb = useCallback(
    (quantity: number) => {
      if (!supplyDetails) return;
      setProductQuantity({
        venueId,
        orderId: order.id,
        productId: product.id,
        quantity,
        supplyDetails: productExistsInOrder ? undefined : supplyDetails.vendorRangeId,
      });
    },
    [order.id, product.id, productExistsInOrder, setProductQuantity, supplyDetails, venueId]
  );
  const { debounce: debounceQuantity } = useDebounce(cb, 1000);

  const setQuantity = (quantity: number) => {
    setQuantityState(quantity);
    debounceQuantity(quantity);
  };

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
          orderQuantity={orderQuantity}
          supplyDetails={supplyDetails}
          unitTypePlural={product.unitType.plural}
          setQuantity={setQuantity}
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
  setQuantity,
}: {
  orderQuantity: number;
  supplyDetails: SupplyDetails;
  unitTypePlural: string;
  setQuantity: (quantity: number) => void;
}) {
  const onIncrease = () => {
    const incrementAmount = supplyDetails!.packageQuantity || 1;
    const quantity = orderQuantity + incrementAmount;
    setQuantity(quantity);
  };

  const onDecrease = () => {
    const incrementAmount = supplyDetails!.packageQuantity || 1;
    const newAmount = orderQuantity - incrementAmount;
    const quantity = newAmount < 0 ? 0 : newAmount;
    setQuantity(quantity);
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
  return (
    <div
      className={cn(
        "text-base font-bold flex gap-3",
        highlight ? "text-white" : "text-zinc-200 italic"
      )}
    >
      <div className="flex h-14 w-14 bg-zinc-800 rounded-full overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.displayName + " product"} />
        ) : (
          <div className="text-xs text-zinc-400 place-self-center p-2 text-center truncate">
            {product.displayName}
          </div>
        )}
      </div>
      <div>
        <p>{product.displayName}</p>
        <p className="text-sm italic text-zinc-300">
          {product.size}
          {product.unitOfMeasurement?.value} {product.unitType.plural}
        </p>
      </div>
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
