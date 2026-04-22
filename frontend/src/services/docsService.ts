import { api } from "./api";

export const docsService = {
  async getSwaggerJson() {
    const { data } = await api.get("/docs/json");
    return data;
  },
};
