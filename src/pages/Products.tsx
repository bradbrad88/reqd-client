import { ProductsProvider } from "ctx/ProductsContext";
import { Outlet } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";

const Products = () => {
  const { venueId } = useVenueContext();
  return (
    <ProductsProvider venueId={venueId}>
      <div className="flex flex-col gap-5">
        <h1>Products</h1>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </ProductsProvider>
  );
};

export default Products;
