import axios from "axios";

const getWaterStations = async (
  query: string,
  token: string,
  filters: any = {},
) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { name: query, approvalStatus: "approved" },
    ...filters,
  };

  const response = await axios.get(url, config);
  return response.data.data || [];
};

export const WaterStationService = {
  getWaterStations,
};
