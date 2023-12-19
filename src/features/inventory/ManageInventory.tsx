import { useState } from "react";
import { ProductDetail } from "api/products";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import SearchBar from "common/SearchBar";
import Spinner from "common/Spinner";
import TickIcon from "common/icons/Tick";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddToInventory, useRemoveFromInventory } from "src/hooks/useInventory";
import { useProductList } from "src/hooks/useProducts";

const AddProduct = () => {
  const [query, setQuery] = useState<string>("");
  const { products } = useProductList({ query: query || undefined }, 1);

  const renderProducts = () =>
    products.map(product => <Product key={product.id} product={product} />);

  return (
    <div className="p-3 flex flex-col gap-5">
      <SearchBar onSearch={query => setQuery(query)} />
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default AddProduct;

type ProductProps = {
  product: ProductDetail;
};

const Product = ({ product }: ProductProps) => {
  const { venueId } = useVenueContext();
  const { addToInventory, loading: loadingAdd } = useAddToInventory();
  const { removeFromInventory, loading: loadingRemove } = useRemoveFromInventory();
  const onClick = () => {
    if (loadingAdd || loadingRemove) return;
    if (product.inInventory) {
      removeFromInventory({ venueId, productId: product.id });
    } else {
      addToInventory({ venueId, productId: product.id, defaultSupply: null });
    }
  };

  return (
    <ListItem key={product.id}>
      <div className={product.inInventory ? "text-lime-400" : ""} onClick={onClick}>
        <div className="flex justify-between relative">
          <div>
            <p>{product.displayName}</p>
            <p className="italic">
              {product.size}
              {product.unitOfMeasurement?.value} {product.unitType.plural}
            </p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {(loadingAdd || loadingRemove) && <Spinner />}
          </div>
          <div className="self-center">{product.inInventory && <TickIcon />}</div>
        </div>
      </div>
    </ListItem>
  );
};
