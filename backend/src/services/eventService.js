import { Op } from "sequelize";
import Event from "../models/Event.js";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildEventFilters = (filters = {}) => {
  const where = {};

  if (filters.q) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${filters.q}%` } },
      { category: { [Op.iLike]: `%${filters.q}%` } },
      { description: { [Op.iLike]: `%${filters.q}%` } },
    ];
  }

  if (filters.title) {
    where.title = { [Op.iLike]: `%${filters.title}%` };
  }

  if (filters.category) {
    where.category = { [Op.iLike]: `%${filters.category}%` };
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.date) {
    where.date = filters.date;
  }

  return where;
};

export const eventService = {
  async create(payload) {
    const event = await Event.create(payload);
    return event;
  },

  async findAll(filters = {}) {
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const offset = (page - 1) * limit;
    const sortBy = filters.sortBy || "date";
    const sortOrder = (filters.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { rows, count } = await Event.findAndCountAll({
      where: buildEventFilters(filters),
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
    const event = await Event.findByPk(id);

    if (!event) {
      throw createServiceError("Event not found.", 404);
    }

    return event;
  },

  async update(id, payload) {
    const event = await Event.findByPk(id);

    if (!event) {
      throw createServiceError("Event not found.", 404);
    }

    await event.update(payload);

    return event;
  },

  async delete(id) {
    const event = await Event.findByPk(id);

    if (!event) {
      throw createServiceError("Event not found.", 404);
    }

    await event.destroy();

    return { success: true };
  },
};

