import axios from "axios";

axios.defaults.baseURL = `https://dummyjson.com/products`;

export const fetch = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response;
};

