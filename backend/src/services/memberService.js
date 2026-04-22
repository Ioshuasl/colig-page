import { Op } from "sequelize";
import Member from "../models/Member.js";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const buildMemberFilters = (filters = {}) => {
  const where = {};

  if (filters.q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${filters.q}%` } },
      { role: { [Op.iLike]: `%${filters.q}%` } },
      { description: { [Op.iLike]: `%${filters.q}%` } },
    ];
  }

  if (filters.name) {
    where.name = { [Op.iLike]: `%${filters.name}%` };
  }

  if (filters.role) {
    where.role = { [Op.iLike]: `%${filters.role}%` };
  }

  return where;
};

export const memberService = {
  async create(payload) {
    const member = await Member.create(payload);
    return member;
  },

  async findAll(filters = {}) {
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const offset = (page - 1) * limit;
    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = (filters.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { rows, count } = await Member.findAndCountAll({
      where: buildMemberFilters(filters),
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
    const member = await Member.findByPk(id);

    if (!member) {
      throw createServiceError("Member not found.", 404);
    }

    return member;
  },

  async update(id, payload) {
    const member = await Member.findByPk(id);

    if (!member) {
      throw createServiceError("Member not found.", 404);
    }

    await member.update(payload);

    return member;
  },

  async delete(id) {
    const member = await Member.findByPk(id);

    if (!member) {
      throw createServiceError("Member not found.", 404);
    }

    await member.destroy();

    return { success: true };
  },
};

