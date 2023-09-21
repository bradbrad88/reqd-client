import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Filters from "./ProductFilters";
import FlexList from "common/FlexList";
import CallToAction from "common/CallToAction";
import { useProductsContext } from "../../hooks/useContexts";

type Filters = {
  vendorId: string[];
  areaId: string[];
  query: string;
};

const ProductList = () => {
  const { products } = useProductsContext();
  const nav = useNavigate();

  const renderProducts = () => {
    if (!products) return null;
    return products.map(product => <Product key={product.id} product={product} />);
  };

  const openForm = () => {
    nav("create");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* <Filters /> */}
      <CallToAction action={openForm}>Create</CallToAction>
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default ProductList;
