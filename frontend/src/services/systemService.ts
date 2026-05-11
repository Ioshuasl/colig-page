import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const systemService = {
  async getHealth() {
    const { data } = await axios.get(`${backendBaseUrl}/health`);
    return data;
  },

  async getApiRoot() {
    const { data } = await axios.get(`${backendBaseUrl}/api`);
    return data;
  },
};
