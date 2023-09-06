import { useContext } from "react";
import { OrderContext } from "../../contexts/orderContext";

type Props = {
  itemId: string;
  area: string;
};

const ItemForm = ({ itemId, area }: Props) => {
  const { setItemValue, getItemValue, getItemAreaValue } = useContext(OrderContext);
  const incrementAmount = 6;
  const units = "cases";

  const onIncrease = () => {
    const amount = getItemAreaValue(itemId, area) + incrementAmount;
    setItemValue(itemId, area, amount);
  };

  const onDecrease = () => {
    const amount = Math.max(getItemAreaValue(itemId, area) - incrementAmount, 0);
    setItemValue(itemId, area, amount);
  };

  return (
    <div>
      Item:{itemId} <br />
      Order: {getItemValue(itemId)} {units}
      <div className="flex flex-row justify-between">
        <button className="p-1 px-5 h-full" onClick={onDecrease}>
          Decrease
        </button>
        <button className="p-1 px-5 h-full" onClick={onIncrease}>
          Increase
        </button>
      </div>
      <ItemValuesBreakdown itemId={itemId} area={area} />
    </div>
  );
};

export default ItemForm;

type BreakdownProps = {
  itemId: string;
  area: string;
};

function ItemValuesBreakdown({ itemId, area }: BreakdownProps) {
  const { items } = useContext(OrderContext);

  const renderBreakdown = () => {
    const item = items.find(item => item.itemId === itemId);
    if (!item || item.areas.length < 2) return null;

    const areas = item.areas;

    areas.sort(a => {
      if (a.area === area) return -1;
      return 0;
    });
    return areas.map(area => (
      <BreakdownItem area={area.area} amount={area.amount} key={area.area} />
    ));
  };

  return <div>{renderBreakdown()}</div>;
}

type BreakdownItemProps = {
  area: string;
  amount: number;
};

function BreakdownItem({ area, amount }: BreakdownItemProps) {
  return (
    <div>
      {area}:{amount}
    </div>
  );
}
