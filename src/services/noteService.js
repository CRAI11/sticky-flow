import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const getNotes = async (signal) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`, { signal });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
