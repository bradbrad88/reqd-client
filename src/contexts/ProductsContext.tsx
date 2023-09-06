import { createContext, useState } from "react";
// import { useVenueContext } from "../hooks/useContexts";
// import { useProductList } from "features/products/queries";
import { ProductList } from "api/products";
import { useProductList } from "src/hooks/useProducts";

type Filters = {
  vendorId: string[];
  areaId: string[];
  query: string;
};

type Props = {
  children?: React.ReactNode;
  venueId: string;
};

type FilterMethod = (value: string) => void;

type ContextType = {
  products: ProductList;
  addToVendorFilter: (value: string) => void;
  addToAreaFilter: FilterMethod;
  removeFromVendorFilter: FilterMethod;
  removeFromAreaFilter: FilterMethod;
  clearFilters: () => void;
  filterIncludes: (filter: keyof Filters, value: string) => boolean;
  setQuery: (query: string) => void;
};

const Context = createContext<ContextType | null>(null);

export const ProductsProvider = ({ children, venueId }: Props) => {
  // const { venueId } = useVenueContext();
  const [filters, setFilters] = useState<Filters>({ vendorId: [], areaId: [], query: "" });
  const { data: products } = useProductList(venueId, filters);
  // const { products } = useProductList(venueId, filters);

  // Filter method factories
  const addToFilter = (key: Exclude<keyof Filters, "query">) => (value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].concat(value),
    }));
  };

  const removeFromFilter = (key: Exclude<keyof Filters, "query">) => (value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].filter(v => v !== value),
    }));
  };

  const clearFilters = () => {
    setFilters({ areaId: [], query: "", vendorId: [] });
  };

  const addToVendorFilter = addToFilter("vendorId");
  const addToAreaFilter = addToFilter("areaId");
  const removeFromVendorFilter = removeFromFilter("vendorId");
  const removeFromAreaFilter = removeFromFilter("areaId");
  const setQuery = (query: string) => setFilters(prev => ({ ...prev, query }));

  const filterIncludes = (filter: keyof Filters, value: string): boolean => {
    return filters[filter].includes(value);
  };

  return (
    <Context.Provider
      value={{
        products,
        addToVendorFilter,
        addToAreaFilter,
        removeFromVendorFilter,
        removeFromAreaFilter,
        clearFilters,
        filterIncludes,
        setQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
