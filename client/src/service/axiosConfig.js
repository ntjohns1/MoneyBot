import axios from 'axios';

// Base configuration
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

export default api;