import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { createArrayOfLength } from "src/utils/arrays";
import { OrderHistoryProvider } from "ctx/OrderHistoryContext";
import { useVenueContext } from "src/hooks/useContexts";
import { useAreaList } from "src/hooks/useAreas";
import { useOrderDetail } from "src/hooks/useOrders";
import Area from "./Area";
import BackButton from "common/BackButton";

export type ProductLocationAreaMap = { [key: string]: { areaName: string; areaId: string } };

const EditOrder = () => {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: areas } = useAreaList(venueId);
  const [searchParams] = useSearchParams();
  const orderHistoryLength = 6;

  const productLocationAreaMap = useMemo(() => {
    return areas.reduce((map, area) => {
      for (const location of area.productLocations) {
        map[location.id] = { areaId: area.id, areaName: area.areaName };
      }
      return map;
    }, {} as ProductLocationAreaMap);
  }, [areas]);

  const orderHistoryDates = () => {
    if (!order) return [];
    const currentWeek = new Date(order.createdAt);
    return createArrayOfLength(orderHistoryLength).map((_, idx) => {
      const date = new Date(currentWeek);
      date.setDate(date.getDate() - idx * 7);
      return date;
    });
  };

  const renderAreaOrderForm = () => {
    const areaId = searchParams.get("area");
    const area = areaId ? areas.find(area => area.id === areaId) : areas[0];
    if (!area) return null;
    if (!order) return null;
    return (
      <Area areaId={area.id} order={order} productLocationAreaMap={productLocationAreaMap} />
    );
  };

  return (
    <OrderHistoryProvider venueId={venueId} dates={orderHistoryDates()} orderId={orderId!}>
      <div className="grid grid-rows-[minmax(0,_1fr),_4rem] h-full w-full">
        <div className="h-full overflow-y-auto">{renderAreaOrderForm()}</div>
        <nav className="h-full items-center w-full overflow-hidden">
          <HorizontalNavBar />
        </nav>
      </div>
    </OrderHistoryProvider>
  );
};

export default EditOrder;

function HorizontalNavBar() {
  const { venueId } = useVenueContext();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useOrderDetail(orderId!, venueId);
  const { data: areas } = useAreaList(venueId);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("area") && areas[0]) {
      setSearchParams({ area: areas[0].id });
    }
  }, [areas, setSearchParams, searchParams]);

  const onSetArea = (area: string) => {
    setSearchParams({ area });
  };

  const renderAreas = () => {
    if (!areas) return null;
    if (!order) return null;
    return areas.map(area => {
      const isSelected = searchParams.get("area") === area.id;
      const dynamicStyles = isSelected
        ? "text-white shadow-black text-shadow-sm"
        : "text-indigo-200";
      return (
        <div
          key={area.id}
          onClick={() => onSetArea(area.id)}
          className={"w-max whitespace-nowrap " + dynamicStyles}
          style={{ textShadow: isSelected ? "0px 0px 7px rgba(20,20,40)" : "" }}
        >
          {area.areaName}
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-[4rem,_minmax(0,_1fr)] h-full items-center bg-indigo-900">
      <div className="place-self-center">
        <BackButton />
      </div>
      <div className="flex gap-8 overflow-x-auto text-xl h-full items-center px-3">
        {renderAreas()}
      </div>
    </div>
  );
}
