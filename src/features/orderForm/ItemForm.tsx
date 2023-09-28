import { useMemo } from "react";
import { formatDayMonth } from "src/utils/dates";
import { useOrderHistoryContext, useVenueContext } from "src/hooks/useContexts";
import { useSetProductAmount } from "src/hooks/useOrders";
import { createArrayOfLength } from "src/utils/arrays";
import type { ProductLocationAreaMap } from "./EditOrder";
import type { OrderDetail } from "api/orders";
import type { ProductLocation } from "api/areas";

type Props = {
  productLocation: ProductLocation;
  order: OrderDetail;
  product: OrderDetail["items"][number] | undefined;
  productLocationAreaMap: ProductLocationAreaMap;
  areaId: string;
};

const ItemForm = ({
  order,
  productLocation,
  product,
  productLocationAreaMap,
  areaId,
}: Props) => {
  const { venueId } = useVenueContext();
  const { productHistory, dates } = useOrderHistoryContext();
  const incrementAmount = productLocation.packageQuantity;

  const { mutate } = useSetProductAmount(venueId, order.id);

  const areaAmount = useMemo(() => {
    if (!product) return 0;
    const productAmount = product.areaAmounts.find(productAmount => {
      return productAmount.productLocationId === productLocation.id;
    });

    return productAmount?.amount || 0;
  }, [product, productLocation.id]);

  const renderHistory = () => {
    const history =
      productHistory[productLocation.productId] ||
      createArrayOfLength(dates.length).map(() => 0);
    const historyElements = history.map((amount, idx) => {
      const currentDate = idx === dates.length - 1;
      const isCurrent = currentDate && product && product.totalAmount > 0;
      const totalAmount = currentDate ? amount + (product?.totalAmount || 0) : amount;
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

  const renderDates = () => {
    const dateElements = dates.map(date => (
      <div key={date.getTime()} className="text-right text-sm pr-2">
        {formatDayMonth(date)}
      </div>
    ));
    return <>{dateElements}</>;
  };

  const onIncrease = () => {
    const amount = areaAmount + incrementAmount;
    mutate({
      ...order,
      update: {
        productId: productLocation.productId,
        productLocationId: productLocation.id,
        amount,
      },
    });
  };

  const onDecrease = () => {
    const newAmount = areaAmount - incrementAmount;
    const amount = newAmount < 0 ? 0 : newAmount;
    mutate({
      ...order,
      update: {
        productId: productLocation.productId,
        productLocationId: productLocation.id,
        amount,
      },
    });
  };

  return (
    <div className="bg-zinc-950 border-zinc-700 border-[1px] p-2 py-2 rounded-md flex flex-col gap-1">
      <ProductDescription product={productLocation} highlight={areaAmount > 0} />
      {/* Display Sales / Order History Table */}
      <div
        className="grid pb-1"
        style={{
          gridTemplateColumns: `repeat(${dates.length}, minmax(0, 1fr))`,
        }}
      >
        {renderDates()}
        {renderHistory()}
      </div>
      {/* Display Order Amount and Increment / Decrement Buttons */}
      <div className="grid grid-cols-[1fr,_min-content] items-center">
        <OrderAmount product={productLocation} areaAmount={areaAmount} />
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
      <ItemValuesBreakdown
        product={product!}
        areaId={areaId}
        productLocationAreaMap={productLocationAreaMap}
      />
    </div>
  );
};

function ProductDescription({
  product,
  highlight,
}: {
  product: ProductLocation;
  highlight?: boolean;
}) {
  const dynamicStyles = highlight ? "text-white" : "text-zinc-200 italic";

  return (
    <div className={"text-lg font-bold " + dynamicStyles}>
      {product.displayName} {product.unitType}s {product.size}
      {product.unitOfMeasurement} <br />
    </div>
  );
}

function OrderAmount({
  areaAmount,
  product: { packageQuantity, packageType, unitType },
}: {
  areaAmount: number;
  product: ProductLocation;
}) {
  const packageAmount = areaAmount / packageQuantity;
  const dynamicStyles = areaAmount > 0 ? "text-lime-300" : "text-indigo-300";

  return (
    <div className={"font-bold " + dynamicStyles}>
      {packageAmount} {packageType}
      {packageAmount === 1 ? "" : "s"} ({areaAmount} {unitType}
      {areaAmount === 1 ? "" : "s"})
    </div>
  );
}

export default ItemForm;

type BreakdownProps = {
  product: OrderDetail["items"][number] | undefined;
  areaId: string;
  productLocationAreaMap: ProductLocationAreaMap;
};

function ItemValuesBreakdown({ product, areaId, productLocationAreaMap }: BreakdownProps) {
  const renderBreakdown = () => {
    if (!product) return null;
    const productAreasMap = product.areaAmounts.reduce(
      (map, { amount, productLocationId }) => {
        const area = productLocationAreaMap[productLocationId] || {
          areaName: "Unknown area",
          areaId: "",
        };

        const prev = map.get(area.areaId) || { ...area, amount: 0 };
        map.set(area.areaId, { ...prev, amount: (prev?.amount || 0) + amount });
        return map;
      },
      new Map<string, { amount: number; areaName: string; areaId: string }>()
    );

    const productAreas = Array.from(productAreasMap.values());

    productAreas.sort(a => {
      if (a.areaId === areaId) return -1;
      return 0;
    });

    return productAreas.map(area => <BreakdownItem area={area} key={area.areaId} />);
  };

  const breakdown = renderBreakdown();

  return <>{breakdown && breakdown.length > 1 && <div>{breakdown}</div>}</>;
}

type BreakdownItemProps = {
  area: {
    areaName: string;
    areaId: string;
    amount: number;
  };
};

function BreakdownItem({ area }: BreakdownItemProps) {
  return (
    <div>
      {area.areaName}:{area.amount}
    </div>
  );
}
