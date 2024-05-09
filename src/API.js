import axios from "axios";

axios.defaults.baseURL = `https://dummyjson.com/`;

export const fetch = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    return error.message;
  }
};
