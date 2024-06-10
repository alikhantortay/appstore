import axios from "axios";

axios.defaults.baseURL = `https://dummyjson.com/`;

export const fetch = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response;
};
