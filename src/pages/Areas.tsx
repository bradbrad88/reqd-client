import { ProductsProvider } from "ctx/ProductsContext";
import { Outlet } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";

const Areas = () => {
  const { venueId } = useVenueContext();
  return (
    <ProductsProvider venueId={venueId}>
      <div className="flex p-3 flex-col gap-3">
        <Outlet />
      </div>
    </ProductsProvider>
  );
};

export default Areas;
