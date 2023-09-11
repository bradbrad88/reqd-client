import { useMemo } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { OrderDetail, useSetProductAmount } from "src/hooks/useOrders";

type Props = {
  orderId: string;
  productId: string;
  displayName: string;
  size: number;
  measure: string;
  areaId: string;
  productAmounts?: OrderDetail["items"][number]["areaAmounts"];
};

const ItemForm = ({
  orderId,
  productId,
  areaId,
  displayName,
  size,
  measure,
  productAmounts = [],
}: Props) => {
  const { venueId } = useVenueContext();
  // TODO: Bring in increment amount - should be part of Product object
  const incrementAmount = 6;

  const { mutate } = useSetProductAmount(venueId, orderId);
  const units = "cases";

  const areaAmount = useMemo(() => {
    const productAmount = productAmounts.find(
      productAmount => productAmount.areaId === areaId
    );
    return productAmount?.amount || 0;
  }, [productAmounts, areaId]);

  const onIncrease = () => {
    const amount = areaAmount + incrementAmount;
    mutate({ venueId, orderId, data: { productId, areaId, amount } });
  };

  const onDecrease = () => {
    const newAmount = areaAmount - incrementAmount;
    const amount = newAmount < 0 ? 0 : newAmount;
    mutate({ venueId, orderId, data: { productId, areaId, amount } });
  };

  return (
    <div>
      {displayName} {size}
      {measure} <br />
      Test: {areaAmount} <br />
      Order: {areaAmount} {units}
      <div className="flex flex-row justify-between">
        <button className="p-1 px-5 h-full" onClick={onDecrease}>
          Decrease
        </button>
        <button className="p-1 px-5 h-full" onClick={onIncrease}>
          Increase
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
