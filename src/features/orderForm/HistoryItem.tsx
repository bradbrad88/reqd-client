export type HistoryItemProps = {
  sales: number;
  orders: number;
};

const HistoryItem = ({ sales, orders }: HistoryItemProps) => {
  return (
    <div className="relative flex flex-col items-center border-indigo-300 border-2 w-16 min-w-fit rounded-md shadow-md shadow-black">
      <p className="p-2 pb-1">{orders}</p>
      <hr className="absolute w-full top-1/2 border-indigo-300" />
      <p className="p-2 pt-1">{sales}</p>
    </div>
  );
};

export default HistoryItem;
