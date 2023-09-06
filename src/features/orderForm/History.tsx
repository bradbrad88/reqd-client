import HistoryItem from "./HistoryItem";

import { HistoryItemProps } from "./HistoryItem";

type HistoryProps = {
  history: HistoryItemProps[];
};
const History = ({ history }: HistoryProps) => {
  const renderHistory = history.map((history, idx) => (
    <HistoryItem key={idx} orders={history.orders} sales={history.sales} />
  ));

  return (
    <div className="grid grid-flow-col">
      <div>
        <div className="grid grid-flow-row h-full">
          <p className="self-center">Orders</p>
          <p className="self-center">Sales</p>
        </div>
      </div>
      <div className="grid grid-flow-col grid-cols-5 gap-1 w-full">{renderHistory}</div>
    </div>
  );
};

export default History;
