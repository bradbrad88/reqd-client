import Area from "./Area";
type AreaType = {
  areaName: string;
};

type History = {
  date: Date;
};

type AreaAmount = {
  area: string;
  amount: number;
};

type Item = {
  itemName: string;
  areas: AreaAmount[];
  history: History[];
};

type Order = {
  venueId: string;
  orderDate: Date;
  items: Item[];
};

const Areas = (areas: AreaType[], order: Order) => {
  const render;

  const;

  const renderAreas = areas.map(area => {
    return <Area />;
  });

  return (
    <div>
      <Area />
      {renderAreas}
    </div>
  );
};

export default Areas;
