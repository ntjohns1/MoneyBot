import api from "./axiosConfig";

export const subscribe = async (symbol) => {
  try {
    const response = await api.get(`/stream/subscribe/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error subscribing to symbol:", error);
    throw error;
  }
};

export const unsubscribe = async (symbol) => {
  try {
    const response = await api.get(`/stream/unsubscribe/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error unsubscribing from symbol:", error);
    throw error;
  }
}
