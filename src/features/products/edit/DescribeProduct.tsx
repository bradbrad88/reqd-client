import { CreateProduct } from "api/products";

type Props = {
  product: Partial<
    Pick<CreateProduct, "displayName" | "unitType" | "packageType" | "packageQuantity">
  >;
};

const DescribeProduct = ({ product }: Props) => {
  return (
    <div>
      <p className="pb-1">Does the following statement make sense?</p>

      <p className="border-indigo-600 border-[1px] rounded-md shadow-black shadow-md p-2 bg-zinc-900">
        <Highlight>{product.displayName || "*Enter Product Name*"}</Highlight> is sold/consumed
        by the <Highlight>{product.unitType || "*Enter Unit Type*"}</Highlight>. You order by
        the <Highlight>{product.packageType || "*Enter Package Type*"}</Highlight>.{" "}
        {product.packageQuantity !== 1 && (
          <>
            There are{" "}
            <Highlight>{product.packageQuantity || "*Enter Package Quantity*"}</Highlight>{" "}
            <Highlight>{product.unitType || "*Enter Unit Type*"}</Highlight>(s) in a{" "}
            <Highlight>{product.packageType || "*Enter Package Type*"}</Highlight>.
          </>
        )}
      </p>
    </div>
  );
};

export default DescribeProduct;

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-lime-200">{children}</span>;
}
