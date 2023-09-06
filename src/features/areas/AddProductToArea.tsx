import { addProductToVenueArea, removeProductFromVenueArea } from "api/areas";
import { keys } from "api/querieFactory";
import { useMutation, useQueryClient } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { useAddProductToArea } from "src/hooks/useAreas";
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
  const client = useQueryClient();
  const { mutate: removeProduct } = useMutation(removeProductFromVenueArea, {
    onMutate: async () => {
      const key = keys.detail(venueId, "areas", areaId!);
      await client.cancelQueries(key);
      const previous = client.getQueryData(key) as {
        products: { id: string; displayName: string }[];
      };
      if (previous) {
        client.setQueryData(key, {
          ...previous,
          products: previous.products.filter(product => product.id !== id),
        });
      }
      return { previous };
    },
    onSettled: (_, __, vars) => {
      const key = keys.detail(vars.venueId, "areas", vars.areaId);
      client.invalidateQueries(key);
    },
    onError: (_, vars, context) => {
      const key = keys.detail(vars.venueId, "areas", vars.areaId);
      if (context?.previous) {
        client.setQueryData(key, context.previous);
      }
    },
  });
  const { mutate: addProduct } = useAddProductToArea(venueId, areaId!);
  // const { mutate: addProduct } = useMutation(addProductToVenueArea, {
  //   onMutate: async () => {
  //     const key = keys.detail(venueId, "areas", areaId!);
  //     await client.cancelQueries(key);
  //     const prev = client.getQueryData(key) as {
  //       products: { id: string; displayName: string }[];
  //     };
  //     client.setQueryData(key, {
  //       ...prev,
  //       products: prev.products.concat({ id, displayName }),
  //     });
  //   },
  //   onSettled: (_, __, { venueId }) => {
  //     const key = keys.detail(venueId, "areas", areaId!);
  //     client.invalidateQueries(key);
  //   },
  // });
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
