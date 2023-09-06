import { ProductsProvider } from "ctx/ProductsContext";
import { Outlet } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";

const Areas = () => {
  const { venueId } = useVenueContext();
  return (
    <ProductsProvider venueId={venueId}>
      <div className="flex p-3 flex-col gap-3">
        <h1 className="text-3xl p-2 ">Areas</h1>
        <Outlet />
      </div>
    </ProductsProvider>
  );
};

export default Areas;
