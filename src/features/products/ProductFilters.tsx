import VendorFilter from "features/vendors/VendorFilter";
import FlexList from "common/FlexList";
import { useProductsContext } from "../../hooks/useContexts";

const ProductFilters = () => {
  const { clearFilters } = useProductsContext();

  return (
    <FlexList>
      <button onClick={clearFilters}>Clear Filters</button>
      <VendorFilter />
    </FlexList>
  );
};

export default ProductFilters;
