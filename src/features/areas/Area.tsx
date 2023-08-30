type Props = {
  id: string;
  areaName: string;
};

const Area = ({ areaName }: Props) => {
  return (
    <div className="border-indigo-500 border-[1px] rounded-md p-2 shadow-md shadow-black">
      {areaName}
    </div>
  );
};

export default Area;
