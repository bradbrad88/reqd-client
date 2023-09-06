import { useNavigate, useParams } from "react-router-dom";
import venueContext from "ctx/VenueContext";
import { useDeleteProduct, useProductDetail } from "./queries";
import { useContext } from "react";

const ProductDetails = () => {
  const { venueId } = useContext(venueContext);
  const { productId } = useParams<{ productId: string }>();
  const { product } = useProductDetail(venueId, productId!);
  const { mutate } = useDeleteProduct(venueId, productId!);
  const nav = useNavigate();

  if (!product) return <div>Product not found</div>;

  const onDelete = () => {
    mutate(
      { productId: productId!, venueId },
      {
        onSuccess: () => {
          nav("../", { relative: "path" });
        },
      }
    );
  };

  return (
    <div>
      {product?.displayName}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProductDetails;
