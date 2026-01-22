import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiController = async ({ url, method, data, headers, signal }) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      headers,
      signal,
    });
    return response?.data || response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request intentionally canceled");
      return null;
    }
    throw error?.response?.data || error;
  }
};
