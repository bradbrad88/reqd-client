import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useDeleteProduct, useProductDetail } from "src/hooks/useProducts";
import EditIcon from "src/common/icons/Edit";
import EditProductName from "./edit/ProductName";
import EditProductSize from "./edit/ProductSize";

const ProductDetails = () => {
  const { venueId } = useVenueContext();
  const { productId } = useParams<{ productId: string }>();
  const { data: product } = useProductDetail(productId!, venueId);
  const { deleteProduct } = useDeleteProduct(venueId);

  const [editName, setEditName] = useState(false);
  const [editSize, setEditSize] = useState(false);
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
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">Edit Product</h2>
      <div className="grid grid-cols-[min-content,_auto] gap-3 items-center">
        <label className="w-full">Product</label>
        {editName ? (
          <EditProductName
            productId={product.id}
            initialName={product.displayName}
            close={() => setEditName(false)}
          />
        ) : (
          <div
            onClick={() => setEditName(true)}
            className="flex gap-2 text-indigo-100 bg-zinc-700 rounded-lg p-2 px-3"
          >
            <span className="place-self-center">
              <EditIcon />
            </span>
            {product.displayName}
          </div>
        )}

        <label className="">Size</label>
        {editSize ? (
          <EditProductSize
            productId={product.id}
            initialSize={product.size}
            close={() => setEditSize(false)}
          />
        ) : (
          <div
            onClick={() => setEditSize(true)}
            className="flex gap-2 text-indigo-100 bg-zinc-700 rounded-lg p-2 px-3 w-full"
          >
            <span className="place-self-center">
              <EditIcon />
            </span>
            {product.size}
          </div>
        )}

        <button className="p-1 bg-orange-500" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
