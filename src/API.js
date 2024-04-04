import axios from "axios";

axios.defaults.baseURL = `https://api.escuelajs.co/api/v1/`;

export const fetch = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response;
  } catch (error) {
    return error.message;
  }
};
