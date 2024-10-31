import api from "./axiosConfig";

export const getBarsForSymbol = async (
  symbol,
  start,
  end,
  timeframe,
  timeframeUnit,
  limit = 1000
) => {
  try {
    const response = await api.get(`/stocks/${symbol}`, {
      params: {
        start,
        end,
        timeframe,
        timeframeUnit,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stock bars:", error);
    throw error;
  }
};

export const getAsset = async (symbol) => {
  try {
    const response = await api.get(`/assets/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export const getAssets = async () => {
  try {
    const response = await api.get(`/assets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};
