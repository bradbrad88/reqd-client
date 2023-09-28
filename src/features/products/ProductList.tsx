import Product from "./Product";
import Filters from "./ProductFilters";
import FlexList from "common/FlexList";
import { useProductsContext } from "../../hooks/useContexts";
import FixedCallToAction from "common/FixedCallToAction";

type Filters = {
  vendorId: string[];
  areaId: string[];
  query: string;
};

const ProductList = () => {
  const { products } = useProductsContext();

  const renderProducts = () => {
    if (!products) return null;
    return products.map(product => <Product key={product.id} product={product} />);
  };

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto overflow-hidden">
      {/* <Filters /> */}
      <FixedCallToAction to="create">Create</FixedCallToAction>
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default ProductList;
