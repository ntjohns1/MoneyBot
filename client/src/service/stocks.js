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
