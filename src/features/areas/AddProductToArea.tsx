import { useOutletContext, useParams } from "react-router-dom";
import { useAddProductToArea, useRemoveProductFromArea } from "src/hooks/useAreas";
import { useProductsContext, useVenueContext } from "src/hooks/useContexts";
import { ProductDetail } from "src/hooks/useProducts";

type Context = {
  areaProducts?: ProductDetail[];
};

const AddProductToArea = () => {
  const { areaProducts } = useOutletContext<Context>();
  const { products, setQuery } = useProductsContext();

  const renderProducts = () => {
    return products.map(product => (
      <Product
        key={product.id}
        {...product}
        active={areaProducts?.some(areaProduct => areaProduct.id === product.id) || false}
      />
    ));
  };

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} type="text" />
      {renderProducts()}
    </div>
  );
};

export default AddProductToArea;

type ProductProps = {
  id: string;
  displayName: string;
  active: boolean;
};

function Product({ id, displayName, active }: ProductProps) {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { mutate: removeProduct } = useRemoveProductFromArea(venueId, areaId!);

  const { mutate: addProduct } = useAddProductToArea(venueId, areaId!);

  const onClick = () => {
    if (active) {
      removeProduct({ venueId, areaId: areaId!, productId: id });
    } else {
      addProduct({ venueId, areaId: areaId!, productId: id });
    }
  };

  return (
    <div onClick={onClick}>
      <div className="flex justify-between text-xl">
        {displayName}
        <Toggle value={active} />
      </div>
    </div>
  );
}

function Toggle({ value }: { value: boolean }) {
  const classNames = value ? "" : "";
  return <div className={classNames}>{value ? "✅" : "☑️"}</div>;
}
