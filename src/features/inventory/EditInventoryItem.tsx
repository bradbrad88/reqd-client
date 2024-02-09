import { useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "utils/cn";
import { useVenueContext } from "src/hooks/useContexts";
import { useChangeDefaultSupplier, useInventoryDetail } from "src/hooks/useInventory";
import Card from "common/Card";
import Button from "common/Button";
import Spinner from "common/Spinner";
import EditDefaultSupplier from "./edit/EditDefaultSupplier";

const EditInventoryItem = () => {
  const { venueId } = useVenueContext();
  const { productId } = useParams<{ productId: string }>();
  const { data: product, status } = useInventoryDetail(productId!, venueId);
  const [editSupplier, setEditSupplier] = useState(false);
  const onEditSupplier = () => {
    setEditSupplier(true);
  };
  const { changeDefaultSupplier } = useChangeDefaultSupplier();

  if (!product && status === "loading") return <Spinner />;
  if (!product) return <div>Error</div>;

  const setDefaultSupplier = (vendorRangeId: string) => {
    changeDefaultSupplier({
      venueId,
      productId: product.productId,
      defaultSupply: vendorRangeId,
      isNew: !product.isInInventory,
    });
  };

  console.log(product);

  const inventoryStatus = product.isInInventory ? "In your inventory" : "Currently not using";

  return (
    <>
      <header className="p-3">
        <h1 className="text-2xl font-bold">Product Details</h1>
      </header>
      <main className="flex flex-col p-3 gap-3">
        <Card>
          <div className="flex gap-3">
            <div className="rounded-full w-20 h-20 bg-zinc-800 overflow-hidden flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.displayName + " product"} />
              ) : (
                <div className="truncate p-2 text-sm">{product.displayName}</div>
              )}
            </div>
            <div>
              <h2 className="text-white font-bold">{product.displayName}</h2>
              <p className="text-sm text-zinc-300 italic">
                {product.size}
                {product.unitOfMeasurement?.value || ""} {product.unitType.value}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={cn(product.isInInventory ? "text-lime-500" : "text-zinc-400")}
                >
                  {inventoryStatus}
                </span>
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold mb-2">Supplier</h2>
          {product.defaultSupply ? (
            <div className="flex gap-3">
              <div className="flex items-center justify-center h-20 w-20 rounded-full overflow-hidden bg-zinc-800">
                {product.defaultSupply.vendor.logo ? (
                  <img />
                ) : (
                  <div className="truncate p-1">{product.defaultSupply.vendor.vendorName}</div>
                )}
              </div>
              <div>
                <p>{product.defaultSupply.vendor.vendorName}</p>
                <p className="capitalize">
                  {product.defaultSupply.packageType.value} (
                  {product.defaultSupply.packageQuantity})
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <p>
                Choose the way you most commonly order this product. You can change this per
                order if need be.
              </p>
              <Button onClick={onEditSupplier} className="ml-auto px-6">
                Choose
              </Button>
              <EditDefaultSupplier
                setDefaultSupplier={setDefaultSupplier}
                productId={product.productId}
                open={editSupplier}
                setOpen={setEditSupplier}
              />
            </div>
          )}
        </Card>
        {product.isInInventory && (
          <Card>
            <h2 className="text-xl font-bold">Don't use this product any more?</h2>
          </Card>
        )}
      </main>
    </>
  );
};

export default EditInventoryItem;
