import axios from '../utils/axiosConfig';

const WATCHLIST_BASE_URL = '/api/admin/watchlist';

/**
 * Get all watchlists
 * @returns {Promise<Array>} Array of watchlist objects
 */
export const getAllWatchlists = async () => {
  try {
    const response = await axios.get(WATCHLIST_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching watchlists:', error);
    throw error;
  }
};

/**
 * Get a specific watchlist by ID
 * @param {string} id - Watchlist ID
 * @returns {Promise<Object>} Watchlist object
 */
export const getWatchlistById = async (id) => {
  try {
    const response = await axios.get(`${WATCHLIST_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching watchlist ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new watchlist
 * @param {string} name - Name of the watchlist
 * @param {Array<string>} symbols - Array of stock symbols
 * @returns {Promise<Object>} Created watchlist object
 */
export const createWatchlist = async (name, symbols = []) => {
  try {
    const response = await axios.post(WATCHLIST_BASE_URL, { name, symbols });
    return response.data;
  } catch (error) {
    console.error('Error creating watchlist:', error);
    throw error;
  }
};

/**
 * Add a symbol to an existing watchlist
 * @param {string} id - Watchlist ID
 * @param {string} symbol - Stock symbol to add
 * @returns {Promise<Object>} Updated watchlist object
 */
export const addSymbolToWatchlist = async (id, symbol) => {
  try {
    const response = await axios.post(`${WATCHLIST_BASE_URL}/${id}/add`, { symbol });
    return response.data;
  } catch (error) {
    console.error(`Error adding symbol ${symbol} to watchlist ${id}:`, error);
    throw error;
  }
};

/**
 * Update a watchlist with new symbols (replaces existing symbols)
 * @param {string} id - Watchlist ID
 * @param {Array<string>} symbols - New array of stock symbols
 * @returns {Promise<Object>} Updated watchlist object
 */
export const updateWatchlist = async (id, symbols) => {
  try {
    const response = await axios.put(`${WATCHLIST_BASE_URL}/${id}`, { symbols });
    return response.data;
  } catch (error) {
    console.error(`Error updating watchlist ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a watchlist
 * @param {string} id - Watchlist ID
 * @returns {Promise<void>}
 */
export const deleteWatchlist = async (id) => {
  try {
    await axios.delete(`${WATCHLIST_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting watchlist ${id}:`, error);
    throw error;
  }
};

/**
 * Remove a symbol from a watchlist
 * @param {string} id - Watchlist ID
 * @param {string} symbol - Stock symbol to remove
 * @returns {Promise<Object>} Updated watchlist object
 */
export const removeSymbolFromWatchlist = async (id, symbol) => {
  try {
    const response = await axios.delete(`${WATCHLIST_BASE_URL}/${id}/symbol/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing symbol ${symbol} from watchlist ${id}:`, error);
    throw error;
  }
};