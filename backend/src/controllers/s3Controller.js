import { s3Service } from "../services/s3Service.js";

export const s3Controller = {
  async upload(req, res, next) {
    try {
      const result = await s3Service.upload({
        file: req.file,
        folder: req.body?.folder,
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    try {
      const result = await s3Service.get({
        objectName: req.query.objectName,
        fileUrl: req.query.fileUrl,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await s3Service.delete({
        objectName: req.body?.objectName || req.query.objectName,
        fileUrl: req.body?.fileUrl || req.query.fileUrl,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
};

