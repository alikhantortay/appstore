import axios from "axios";

axios.defaults.baseURL = `https://appstore.up.railway.app/shop-service/api/public`;

export const fetch = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response;
};

