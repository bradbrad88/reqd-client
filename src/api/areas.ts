import axios from "../config/axios";

export const getAreas = async (
  venueId: string
): Promise<{ id: string; areaName: string }[]> => {
  const res = await axios.get(`/venue/${venueId}/area`);
  return res.data.data;
};

export const createArea = async ({
  venueId,
  areaName,
}: {
  venueId: string;
  areaName: string;
}) => {
  await axios.post(`/venue/${venueId}/area`, { areaName });
};

export const deleteArea = async ({ venueId, areaId }: { venueId: string; areaId: string }) => {
  await axios.delete(`/venue/${venueId}/area/${areaId}`);
};

export const getAreaProducts = async ({
  venueId,
  areaId,
}: {
  venueId: string;
  areaId: string;
}): Promise<{ productId: string; displayName: string; parLevel?: number }[]> => {
  const res = await axios.get(`/venue/${venueId}/area/${areaId}/products`);
  return res.data.data;
};

export const addProductToVenueArea = async ({
  venueId,
  areaId,
  productId,
  parLevel,
}: {
  venueId: string;
  areaId: string;
  productId: string;
  parLevel?: number;
}): Promise<{ ghost: string }> => {
  const res = await axios.post(`/venue/${venueId}/areas/${areaId}/products`, {
    productId,
    parLevel,
  });
  return res.data.data;
};

export const removeProductFromVenueArea = async ({
  areaId,
  productId,
  venueId,
}: {
  venueId: string;
  areaId: string;
  productId: string;
}) => {
  await axios.delete(`venue/${venueId}/areas/${areaId}/products`, { data: { productId } });
};

export const getArea = async ({
  areaId,
  venueId,
}: {
  areaId: string;
  venueId: string;
}): Promise<{ id: string; areaName: string }> => {
  return new Promise(resolve => {
    const res = axios.get(`/venue/${venueId}/area/${areaId}`);
    setTimeout(() => {
      resolve(res.then(data => data.data.data));
    }, 500);
  });
  // const res = await axios.get(`/venue/${venueId}/area/${areaId}`);
  // return res.data.data;
};
