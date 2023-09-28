import { ProductsProvider } from "ctx/ProductsContext";
import { Outlet } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";

const Products = () => {
  const { venueId } = useVenueContext();
  return (
    <ProductsProvider venueId={venueId}>
      <Outlet />
    </ProductsProvider>
  );
};

export default Products;
