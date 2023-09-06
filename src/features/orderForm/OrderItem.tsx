import History from "./History";

import { HistoryItemProps } from "./HistoryItem";
import ItemForm from "./ItemForm";

type Props = {
  itemId: string;
  history: HistoryItemProps[];
};

const OrderItem = ({ history, itemId }: Props) => {
  return (
    <div className="p-3 border-slate-700 border-2 rounded-md shadow-black shadow-md">
      <ItemForm itemId={itemId} area={"first area"} />
      <History history={history} />
    </div>
  );
};

export default OrderItem;
