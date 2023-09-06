import CallToAction from "common/CallToAction";
import FlexList from "common/FlexList";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductDetail } from "src/hooks/useProducts";

type Context = {
  areaProducts: ProductDetail[];
};

const AreaProducts = () => {
  const nav = useNavigate();
  const { areaProducts } = useOutletContext<Context>();
  const renderProducts = () => {
    return areaProducts.map(product => <Product key={product.id} {...product} />);
  };

  const onNav = () => {
    nav("add-product");
  };

  return (
    <div>
      <CallToAction action={onNav}>Add Product</CallToAction>
      <FlexList>{renderProducts()}</FlexList>
    </div>
  );
};

export default AreaProducts;

function Product({ displayName, id, measure, size }: ProductDetail) {
  return (
    <div>
      <div>{displayName}</div>
      <div>{measure}</div>
    </div>
  );
}
