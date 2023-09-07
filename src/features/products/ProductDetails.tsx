import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useDeleteProduct, useProductDetail } from "src/hooks/useProducts";

const ProductDetails = () => {
  const { venueId } = useVenueContext();
  const { productId } = useParams<{ productId: string }>();
  const { data: product } = useProductDetail(productId!, venueId);
  const { deleteProduct } = useDeleteProduct(venueId);
  const nav = useNavigate();

  if (!product) return <div>Product not found</div>;

  const onDelete = () => {
    deleteProduct(
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
