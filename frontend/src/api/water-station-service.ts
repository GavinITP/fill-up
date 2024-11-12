import axios from "axios";

const getWaterStations = async (
  query: string,
  token: string,
  filters: { [key: string]: string | number | boolean } = {},
) => {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value !== undefined,
    ),
  );

  if (validFilters.isFree === false) {
    delete validFilters.isFree;
  }

  const params = {
    name: query,
    approvalStatus: "approved",
    ...validFilters,
  };

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/water-station/`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params,
  };

  const response = await axios.get(url, config);
  return response.data.data || [];
};

export const WaterStationService = {
  getWaterStations,
};
