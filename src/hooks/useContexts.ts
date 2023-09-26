import { useContext } from "react";
import venueContext from "ctx/VenueContext";
import productsContext from "ctx/ProductsContext";
import orderHistoryContext from "ctx/OrderHistoryContext";

const factory = <T>(context: React.Context<T>) => {
  return () => {
    const contextInstance = useContext(context);
    if (!contextInstance) throw new Error("Context hook must be used inside its provider");
    return { ...contextInstance };
  };
};

export const useVenueContext = factory(venueContext);
export const useProductsContext = factory(productsContext);
export const useOrderHistoryContext = factory(orderHistoryContext);
