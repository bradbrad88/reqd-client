import { useState } from "react";
import { useVenueContext } from "src/hooks/useContexts";
import { useInventoryList } from "src/hooks/useInventory";
import AvatarList from "common/AvatarList";
import SearchBar from "common/SearchBar";
import Button from "common/Button";
import { XIcon } from "common/icons";

type Props = {
  onValueChange: (value: string) => void;
  close?: () => void;
};

const SearchAndPickProduct = ({ onValueChange, close = () => {} }: Props) => {
  const { venueId } = useVenueContext();
  const [query, setQuery] = useState<string | undefined>(undefined);
  const { data: inventory } = useInventoryList(venueId, { query });

  const onSearch = (query: string) => {
    setQuery(query || undefined);
  };

  const items = inventory.map(item => ({
    id: item.productId,
    displayName: item.displayName,
    description: `${item.size}${item.unitOfMeasurement.value} ${item.unitType.plural}`,
  }));

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="h-full overflow-y-auto border-[1px] border-zinc-600 rounded-t-2xl overflow-hidden">
        <AvatarList items={items} onSelect={onValueChange} />
      </div>
      <div className="flex items-center">
        <SearchBar onSearch={onSearch} autoFocus />
        <Button onClick={close} variant={"ghost"}>
          <XIcon />
        </Button>
      </div>
    </div>
  );
};

export default SearchAndPickProduct;
