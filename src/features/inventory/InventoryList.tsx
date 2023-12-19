import FixedCallToAction from "common/FixedCallToAction";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import { useVenueContext } from "src/hooks/useContexts";
import { useInventoryList } from "src/hooks/useInventory";

const InventoryList = () => {
  const { venueId } = useVenueContext();
  const { data: inventory } = useInventoryList(venueId);

  const renderInventory = () =>
    inventory.map(item => (
      <ListItem key={item.productId}>
        <div className="font-bold">{item.displayName}</div>
        <div className="italic -mt-1 capitalize">
          {item.size}
          {item.unitOfMeasurement.value} {item.unitType.plural}
        </div>
      </ListItem>
    ));

  return (
    <div className="p-3">
      <FlexList>{renderInventory()}</FlexList>
      <FixedCallToAction to="add">Add</FixedCallToAction>
    </div>
  );
};

export default InventoryList;
