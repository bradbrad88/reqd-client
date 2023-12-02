import { useNavigate, useParams } from "react-router-dom";
import { useVenueContext } from "src/hooks/useContexts";
import { useDeleteProduct, useProductDetail } from "src/hooks/useProducts";
import EditDisplayName from "./edit/EditDisplayName";
import EditSize from "./edit/EditSize";
import EditPackageType from "./edit/EditPackageType";
import EditUnitType from "./edit/EditUnitType";
import EditPackageQuantity from "./edit/EditPackageQuantity";
import EditUnitOfMeasurement from "./edit/EditUnitOfMeasurement";
import EditVendor from "./edit/EditVendor";
import DescribeProduct from "./edit/DescribeProduct";

const ProductDetails = () => {
  const { venueId } = useVenueContext();
  const { productId } = useParams<{ productId: string }>();
  const { data: product } = useProductDetail(productId!, venueId);
  const { deleteProduct } = useDeleteProduct(venueId);

  const nav = useNavigate();

  const onDelete = () => {
    deleteProduct(product!, {
      onSuccess: () => {
        nav("../", { relative: "path" });
      },
    });
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">Edit Product</h2>
      <div className="">
        <EditDisplayName product={product} />
        <EditVendor product={product} />
        <EditUnitType product={product} />
        <div className="grid grid-cols-[2fr,_1fr] gap-3">
          <EditPackageType product={product} />
          <EditPackageQuantity product={product} />
        </div>
        <div className="grid grid-cols-[2fr,_1fr] gap-3">
          <EditSize product={product} />
          <EditUnitOfMeasurement product={product} />
        </div>
        <button className="p-1 bg-orange-500" onClick={onDelete}>
          Delete
        </button>
      </div>
      <DescribeProduct
        product={{
          unitType: product.unitType.value,
          displayName: product.displayName,
          packageQuantity: product.packageQuantity,
          packageType: product.packageType.value,
        }}
      />
    </div>
  );
};

export default ProductDetails;
