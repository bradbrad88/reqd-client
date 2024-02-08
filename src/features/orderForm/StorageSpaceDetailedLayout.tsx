import {
  AreaDetail,
  StorageSpaceDetailedLayout as StorageSpaceDetailedLayoutType,
} from "api/areas";
import { OrderDetail } from "api/orders";
import ItemForm from "./ItemForm";

type Props = {
  storageSpace: StorageSpaceDetailedLayoutType;
  area: AreaDetail;
  order: OrderDetail;
};

const StorageSpaceDetailedLayout = ({ storageSpace, area, order }: Props) => {
  const renderSections = () =>
    storageSpace.sectionLayout.map((section, sectionIdx) => (
      <div key={section} className="flex flex-col">
        {storageSpace.sections[section].shelfLayout.map((shelf, shelfIdx) => (
          <div key={shelf} className="flex flex-col gap-3">
            {storageSpace.shelves[shelf].spotLayout.map(spot => (
              <Spot key={spot} spot={storageSpace.spots[spot]} area={area} order={order} />
            ))}
            {shelfIdx < storageSpace.sections[section].shelfLayout.length - 1 && (
              <hr className="mt-[6px] mb-[18px] border-zinc-700 border-[6px]" />
            )}
          </div>
        ))}
        {sectionIdx < storageSpace.sectionLayout.length - 1 && (
          <hr className="mt-[24px] mb-[24px] border-zinc-700 border-[6px]" />
        )}
      </div>
    ));

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold mt-2 mb-3">
          {area.areaName} {storageSpace.storageName}
        </h1>
      </header>
      <main>{renderSections()}</main>
    </div>
  );
};

const Spot = ({
  spot,
  area,
  order,
}: {
  area: AreaDetail;
  spot: StorageSpaceDetailedLayoutType["spots"][string];
  order: OrderDetail;
}) => {
  const productLine = area.productLines[spot.productLine];
  if (!productLine || !productLine.productId) return null;

  const product = area.products[productLine.productId];
  const orderProduct = order.products[product.id];
  const supplyDetails = orderProduct
    ? order.products[product.id].supplyDetails
    : product.defaultSupply;
  return (
    <ItemForm
      areaId={area.id}
      order={order}
      product={product}
      productLine={productLine}
      supplyDetails={supplyDetails}
    />
  );
};

export default StorageSpaceDetailedLayout;
