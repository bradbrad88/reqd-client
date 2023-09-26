import { useMemo } from "react";
import { formatDayMonth } from "src/utils/dates";
import { useOrderHistoryContext, useVenueContext } from "src/hooks/useContexts";
import { useSetProductAmount } from "src/hooks/useOrders";
import { createArrayOfLength } from "src/utils/arrays";
import type { OrderDetail } from "api/orders";
import type { ProductLocation } from "api/areas";

type Props = {
  productLocation: ProductLocation;
  order: OrderDetail;
  product: OrderDetail["items"][number] | undefined;
};

const ItemForm = ({ order, productLocation, product }: Props) => {
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
      return (
        <div
          key={idx}
          className="w-full text-right pr-2 border-zinc-600 border-[1px]"
          style={{
            fontWeight: currentDate && product && product.totalAmount > 0 ? "bold" : "",
          }}
        >
          {currentDate ? amount + (product?.totalAmount || 0) : amount}
        </div>
      );
    });
    return <>{historyElements}</>;
  };

  const renderDates = () => {
    const dateElements = dates.map(date => (
      <div className="text-right text-sm pr-2">{formatDayMonth(date)}</div>
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
    <div className="bg-zinc-900 p-2 py-1 rounded-md flex flex-col gap-1">
      <ProductDescription product={productLocation} highlight={areaAmount > 0} />
      {/* Display Sales / Order History Table */}
      <div
        className="grid"
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
  const dynamicStyles = highlight ? "text-white" : "text-zinc-400";

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

// type BreakdownProps = {
//   productId: string;
//   area: string;
// };

// function ItemValuesBreakdown({ productId, area }: BreakdownProps) {
//   const renderBreakdown = () => {
//     return null;
//     // const item = items.find(item => item.productId === productId);
//     // if (!item || item.areas.length < 2) return null;

//     // const areas = item.areas;

//     // areas.sort(a => {
//     //   if (a.area === area) return -1;
//     //   return 0;
//     // });
//     // return areas.map(area => (
//     //   <BreakdownItem area={area.area} amount={area.amount} key={area.area} />
//     // ));
//   };

//   return <div>{renderBreakdown()}</div>;
// }

// type BreakdownItemProps = {
//   area: string;
//   amount: number;
// };

// function BreakdownItem({ area, amount }: BreakdownItemProps) {
//   return (
//     <div>
//       {area}:{amount}
//     </div>
//   );
// }
