import { Op } from "sequelize";
import News from "../models/News.js";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildNewsFilters = (filters = {}) => {
  const where = {};

  if (filters.q) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${filters.q}%` } },
      { summary: { [Op.iLike]: `%${filters.q}%` } },
    ];
  }

  if (filters.title) {
    where.title = { [Op.iLike]: `%${filters.title}%` };
  }

  if (filters.date) {
    where.date = filters.date;
  }

  return where;
};

export const newsService = {
  async create(payload) {
    const news = await News.create(payload);
    return news;
  },

  async findAll(filters = {}) {
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const offset = (page - 1) * limit;
    const sortBy = filters.sortBy || "date";
    const sortOrder = (filters.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { rows, count } = await News.findAndCountAll({
      where: buildNewsFilters(filters),
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async findById(id) {
    const news = await News.findByPk(id);

    if (!news) {
      throw createServiceError("News not found.", 404);
    }

    return news;
  },

  async update(id, payload) {
    const news = await News.findByPk(id);

    if (!news) {
      throw createServiceError("News not found.", 404);
    }

    await news.update(payload);

    return news;
  },

  async delete(id) {
    const news = await News.findByPk(id);

    if (!news) {
      throw createServiceError("News not found.", 404);
    }

    await news.destroy();

    return { success: true };
  },
};

