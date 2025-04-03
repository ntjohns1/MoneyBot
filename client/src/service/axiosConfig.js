import axios from 'axios';

// Base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to set the access token
export const setAccessToken = (accessToken) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;