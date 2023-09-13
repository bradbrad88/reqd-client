import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddProductToArea, useAreaDetail } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import { useProductList } from "src/hooks/useProducts";
import { ProductList } from "api/products";
import { Combo } from "common/Inputs";
import { Input } from "common/Inputs";
import CallToAction from "common/CallToAction";

const AddProductToArea = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const { data } = useAreaDetail(areaId!, venueId);
  const { data: products } = useProductList(venueId);
  const [productId, setProductId] = useState<string | null>(null);
  const [parLevel, setParLevel] = useState<number | null>(null);
  const { mutate: addProduct } = useAddProductToArea(venueId, areaId!);

  const onClick = () => {
    if (!data) return;
    if (!productId) return;
    addProduct({ areaId: data.id, venueId, productId, parLevel: parLevel || undefined });
  };

  const isCallToActionDisabled = () => {
    if (!productId) return true;
  };

  if (!data) return <div>Loading</div>;

  return (
    <div className="grid grid-cols-[2fr,_1fr] gap-2 items-start">
      <ProductCombo setProductId={setProductId} productId={productId} products={products} />
      <ParLevel setParLevel={setParLevel} parLevel={parLevel} />
      <CallToAction disabled={isCallToActionDisabled()} action={onClick}>
        Add to {data.areaName}
      </CallToAction>
    </div>
  );
};

export default AddProductToArea;

type ProductProps = {
  productId: string | null;
  setProductId: (value: string | null) => void;
  products: ProductList;
};

function ProductCombo({ productId, setProductId, products }: ProductProps) {
  const renderOptions = () => {
    return products.map(product => ({
      value: product.id,
      display: product.displayName,
      subDisplay: product.packageType
        ? product.packageType + " " + product.size + product.measure
        : "",
    }));
  };

  return (
    <div>
      <Combo
        label="Select Product"
        selectedOption={productId}
        setSelectedOption={setProductId}
        options={renderOptions()}
      />
    </div>
  );
}

type ParLevelProps = {
  parLevel: number | null;
  setParLevel: (value: number | null) => void;
};

function ParLevel({ parLevel, setParLevel }: ParLevelProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    let value = Number(event.target.value);
    if (isNaN(value)) return setParLevel(null);
    if (value < 0) value = 0;
    setParLevel(value);
  };

  return (
    <div className="">
      <label htmlFor="par-level">Par Level</label>
      <Input value={parLevel || ""} onChange={onChange} id="par-level" type="number" />
    </div>
  );
}
