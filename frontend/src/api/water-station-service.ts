import axios from "axios";

const getWaterStations = async (query: string, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { name: query, approvalStatus: "approved" },
  };

  const response = await axios.get(url, config);
  return response.data.data || [];
};

export const WaterStationService = {
  getWaterStations,
};
