type Props = {
  top: React.ReactNode;
  bottom: React.ReactNode;
};

const HorizontalSplitFitBottomFillTop = ({ top, bottom }: Props) => {
  return (
    <div className="h-full grid grid-cols-1 grid-rows-[minmax(0,_1fr),_auto]">
      <div className="h-full overflow-y-auto">{top}</div>
      {bottom}
    </div>
  );
};

export default HorizontalSplitFitBottomFillTop;
