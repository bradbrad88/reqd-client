import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useProductDetail } from "./queries";
import { useVenueContext } from "src/hooks/useContexts";

const ProductDetails = () => {
  const { venueId } = useVenueContext();
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
      {product.displayName}
      {product.size}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ProductDetails;
