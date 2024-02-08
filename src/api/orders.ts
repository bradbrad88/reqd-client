import axios from "config/axios";
import { axiosHandler } from "./axiosHandler";
import { SupplyDetails } from "./inventory";

type VendorSummary = { vendorId: string; vendorName: string; productCount: number };

export type OrderList = {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  vendorSummary: VendorSummary[];
}[];

export type OrderDetail = {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  products: {
    [key: string]: {
      productId: string;
      quantity: number;
      supplyDetails: SupplyDetails | null;
    };
  };
  vendorSummary: VendorSummary[];
};

export type OrderVendorSummary = {
  vendor: { id: string; vendorName: string; logo?: string };
  products: {
    id: string;
    quantity: number;
    displayName: string;
    packageQuantity: number;
    packageType: { value: string; plural: string };
    unitOfMeasurement: { value: string } | undefined;
    unitType: { value: string; plural: string };
    size: number;
  }[];
};

export type OrderHistory = {
  periods: Array<[string, string]>;
  products: {
    [product: string]: Array<{
      quantity: number;
    }>;
  };
};

export type CreateOrderVars = {
  orderId: string;
  venueId: string;
};

export type SetProductQuantityVars = {
  orderId: string;
  venueId: string;
  productId: string;
  quantity: number;
  supplyDetails?: string;
};

export type GetVendorSummaryVars = {
  orderId: string;
  venueId: string;
  vendorId: string;
};

const createOrder = async ({ venueId, ...data }: CreateOrderVars) => {
  return await axios.post(`/venue/${venueId}/orders`, data);
};

const setProductQuantity = async ({ orderId, venueId, ...data }: SetProductQuantityVars) => {
  return await axios.put(`/venue/${venueId}/orders/${orderId}/quantity`, data);
};

const getVendorSummary = async ({ venueId, vendorId, orderId }: GetVendorSummaryVars) => {
  return await axios.get<OrderVendorSummary>(
    `/venue/${venueId}/orders/detail/${orderId}/${vendorId}`
  );
};

const getOrderHistory = async ({
  venueId,
  dates,
  orderId,
}: {
  venueId: string;
  dates: Date[];
  orderId: string;
}) => {
  const dateString = dates
    .map(date => {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.toJSON();
    })
    .join(",");
  return await axios.get<OrderHistory>(`/venue/${venueId}/orders/history/${orderId}`, {
    params: {
      dates: dateString,
    },
  });
};

export const createOrderApi = axiosHandler(createOrder);
export const setProductQuantityApi = axiosHandler(setProductQuantity);
export const getVendorSummaryApi = axiosHandler(getVendorSummary);
export const getOrderHistoryApi = axiosHandler(getOrderHistory);
