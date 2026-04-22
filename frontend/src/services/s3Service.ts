import { api } from "./api";

export interface S3UploadResponse {
  objectName: string;
  url: string;
}

export interface S3GetResponse {
  objectName: string;
  url: string;
  exists: boolean;
}

export interface S3DeletePayload {
  objectName?: string;
  fileUrl?: string;
}

export const s3Service = {
  async upload(file: File, folder = "uploads"): Promise<S3UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const { data } = await api.post<S3UploadResponse>("/s3/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },

  async get(params: { objectName?: string; fileUrl?: string }): Promise<S3GetResponse> {
    const { data } = await api.get<S3GetResponse>("/s3", { params });
    return data;
  },

  async remove(payload: S3DeletePayload): Promise<{ success: boolean }> {
    const { data } = await api.delete<{ success: boolean }>("/s3", {
      data: payload,
      params: payload,
    });
    return data;
  },
};
