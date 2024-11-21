import api from "./axiosConfig";

export const getAccountInfo = async () => {
  try {
    const response = await api.get(`/accounts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account info: ", error);
    throw error;
  }
};

export const getAccountConfigurations = async () => {
  try {
    const response = await api.get(`/accounts/configurations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account config: ", error);
    throw error;
  }
};

export const getAccountActivities = async (
  activityTypes,
  until,
  after,
  direction,
  date,
  pageSize,
  pageToken
) => {
  try {
    const response = await api.get(`/accounts/activities`, {
      params: {
        activityTypes,
        until,
        after,
        direction,
        date,
        pageSize,
        pageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account activities: ", error);
    throw error;
  }
};

export const getPortfolioHistory = async (
  date_start,
  date_end,
  period,
  timeframe,
  extended_hours = false
) => {
  try {
    console.log("date_start: ", date_start);
    console.log("date_end", date_end);
    console.log("period:", period);
    console.log("timeframe:", timeframe);
    
    
    const response = await api.get(`/accounts/portfolio/history`, {
      params: {
        date_start,
        date_end,
        period,
        timeframe,
        extended_hours,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account activities: ", error);
    throw error;
  }
};
