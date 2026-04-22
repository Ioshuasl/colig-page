import {
  deleteFile,
  deleteFileByUrl,
  fileExistsByObjectName,
  getDownloadUrl,
  getObjectNameFromPresignedUrl,
  uploadToS3,
} from "../config/s3.js";

const DEFAULT_FOLDER = "uploads";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const s3Service = {
  async upload({ file, folder = DEFAULT_FOLDER }) {
    if (!file) {
      throw createServiceError("File is required for upload.", 400);
    }

    const { key, url } = await uploadToS3(file, folder);

    return {
      objectName: key,
      url,
    };
  },

  async get({ objectName, fileUrl }) {
    const resolvedObjectName = objectName || getObjectNameFromPresignedUrl(fileUrl);

    if (!resolvedObjectName) {
      throw createServiceError("objectName or fileUrl is required.", 400);
    }

    const exists = await fileExistsByObjectName(resolvedObjectName);

    if (!exists) {
      throw createServiceError("File not found in S3.", 404);
    }

    return {
      objectName: resolvedObjectName,
      url: getDownloadUrl(resolvedObjectName),
      exists: true,
    };
  },

  async delete({ objectName, fileUrl }) {
    if (!objectName && !fileUrl) {
      throw createServiceError("objectName or fileUrl is required.", 400);
    }

    if (objectName) {
      await deleteFile(objectName);
    } else {
      await deleteFileByUrl(fileUrl);
    }

    return { success: true };
  },
};

