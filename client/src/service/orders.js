import api from "./axiosConfig";

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
};

// Get list of orders
export const getOrders = async (params = {}) => {
  try {
    const response = await api.get('/orders', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID: ", error);
    throw error;
  }
};

// Get order by client_order_id
export const getOrderByClientId = async (clientOrderId) => {
  try {
    const response = await api.get(`/orders/by_client_order_id/${clientOrderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by client_order_id: ", error);
    throw error;
  }
};

// Update an order by ID
export const updateOrder = async (id, updateData) => {
  try {
    const response = await api.patch(`/orders/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating order: ", error);
    throw error;
  }
};

// Cancel an order by ID
export const cancelOrder = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling order: ", error);
    throw error;
  }
};

// Cancel all open orders
export const cancelAllOrders = async () => {
  try {
    const response = await api.delete('/orders');
    return response.data;
  } catch (error) {
    console.error("Error canceling all orders: ", error);
    throw error;
  }
};