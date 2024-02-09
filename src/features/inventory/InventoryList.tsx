import { useNavigate, useSearchParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useInventoryList } from "src/hooks/useInventory";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import AvatarList, { AvatarItem } from "common/AvatarList";
import SearchBar from "common/SearchBar";

const InventoryList = () => {
  const { venueId } = useVenueContext();
  const [params, setParams] = useSearchParams();
  const { data: inventory } = useInventoryList(venueId, {
    query: params.get("query") || undefined,
  });
  const nav = useNavigate();

  const onSelect = (productId: string) => {
    nav(productId);
  };

  const items: AvatarItem[] | undefined = inventory?.products.map(item => ({
    id: item.productId,
    displayName: item.displayName,
    description: `${item.size}${item.unitOfMeasurement?.value} ${item.unitType.plural}`,
  }));

  const onSearch = (query: string) => {
    setParams(params => {
      if (!query) {
        params.delete("query");
      } else {
        params.set("query", query);
      }
      return params;
    });
  };

  return (
    <HorizontalSplitFitBottomFillTop
      top={
        <div className="p-3 relative">
          <header>
            <h1 className="text-2xl font-bold mb-2">Search a product...</h1>
          </header>
          <div className="rounded-xl overflow-hidden border-zinc-600 border-[1px]">
            {items && <AvatarList items={items} onSelect={onSelect} />}
          </div>
        </div>
      }
      bottom={
        <div className="p-2">
          <SearchBar autoFocus onSearch={onSearch} />
        </div>
      }
    />
  );
};

export default InventoryList;
