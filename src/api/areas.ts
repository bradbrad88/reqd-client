import axios from "../config/axios";

export const getAreas = async (
  venueId: string
): Promise<{ id: string; areaName: string }[]> => {
  const res = await axios.get(`/venue/${venueId}/area`);
  console.log(res.request);

  return res.data.data;
};
