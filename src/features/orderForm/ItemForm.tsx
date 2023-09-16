import { ProductLocation } from "api/areas";
import { useMemo } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { OrderDetail, useSetProductAmount } from "src/hooks/useOrders";

type Props = {
  productLocation: ProductLocation;
  order: OrderDetail;
  productAmounts?: OrderDetail["items"][number]["areaAmounts"];
};

const ItemForm = ({ order, productLocation, productAmounts = [] }: Props) => {
  const { venueId } = useVenueContext();

  const incrementAmount = productLocation.packageQuantity;

  const { mutate } = useSetProductAmount(venueId, order.id);

  const areaAmount = useMemo(() => {
    const productAmount = productAmounts.find(productAmount => {
      return productAmount.productLocationId === productLocation.id;
    });

    return productAmount?.amount || 0;
  }, [productAmounts, productLocation.id]);

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

  const packageAmount = areaAmount / productLocation.packageQuantity;

  const zeroAmountTitleStyles = "text-zinc-400";
  const positiveAmountTitleStyles = "text-white";

  const zeroAmountDetailStyles = "text-indigo-300";
  const positiveAmountDetailStyles = "text-lime-300";

  return (
    <div className="bg-zinc-900 p-2 py-1 rounded-md flex flex-col gap-1">
      <div
        className={
          "text-lg font-bold " +
          (areaAmount > 0 ? positiveAmountTitleStyles : zeroAmountTitleStyles)
        }
      >
        {productLocation.displayName} {productLocation.unitType}s {productLocation.size}
        {productLocation.unitOfMeasurement} <br />
      </div>
      <div className="grid grid-cols-[3rem,_1fr,_3rem]">
        <button
          className="p-0 px-1 h-min border-indigo-600 bg-zinc-950 border-[1px] font-bold text-xl"
          onClick={onDecrease}
        >
          -
        </button>
        <div
          className={
            "text-center font-bold " +
            (areaAmount > 0 ? positiveAmountDetailStyles : zeroAmountDetailStyles)
          }
        >
          {packageAmount} {productLocation.packageType}
          {packageAmount === 1 ? "" : "s"} ({areaAmount} {productLocation.unitType}
          {areaAmount === 1 ? "" : "s"})
        </div>
        <button
          className="p-0 px-1 h-min bg-zinc-950 outline-none focus-within:outline-none focus-visible:outline-none focus-within:border-lime-300 border-lime-600 border-[1px] font-bold text-xl"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

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
