import api from "./axiosConfig";

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
