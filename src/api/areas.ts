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
