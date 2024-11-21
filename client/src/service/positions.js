import api from "./axiosConfig";

export const getAllPostions = async () => {
  try {
    const response = await api.get(`/positions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching positions: ", error);
    throw error;
  }
};

export const getPosition = async (symbol) => {
    try {
        const response = await api.get(`/positions/${symbol}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching position: ", error);
        throw error;
    }
};

export const closeAllPositions = async () => {
  try {
    const response = await api.delete(`/positions`);
    return response.data;
  } catch (error) {
    console.error("Error closing positions: ", error);
    throw error;
  }
};

export const closePosition = async (symbol) => {
  try {
    const response = await api.delete(`/positions/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error closing position: ", error);
    throw error;
  }
};

