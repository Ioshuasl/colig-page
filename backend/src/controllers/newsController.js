import { newsService } from "../services/newsService.js";

const parseId = (value) => Number(value);

export const newsController = {
  async create(req, res, next) {
    try {
      const news = await newsService.create(req.body);
      return res.status(201).json(news);
    } catch (error) {
      return next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await newsService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const news = await newsService.findById(parseId(req.params.id));
      return res.status(200).json(news);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const news = await newsService.update(parseId(req.params.id), req.body);
      return res.status(200).json(news);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await newsService.delete(parseId(req.params.id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  },
};

