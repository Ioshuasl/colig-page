import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User.js";
import { env } from "../config/env.js";

const SALT_ROUNDS = 10;
const revokedTokens = new Set();

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user.toJSON();
  return safeUser;
};

const buildUserFilters = (filters = {}) => {
  const where = {};

  if (filters.q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${filters.q}%` } },
      { username: { [Op.iLike]: `%${filters.q}%` } },
      { email: { [Op.iLike]: `%${filters.q}%` } },
    ];
  }

  if (filters.name) {
    where.name = { [Op.iLike]: `%${filters.name}%` };
  }

  if (filters.username) {
    where.username = { [Op.iLike]: `%${filters.username}%` };
  }

  if (filters.email) {
    where.email = { [Op.iLike]: `%${filters.email}%` };
  }

  return where;
};

export const userService = {
  async create(payload) {
    const { name, username, email, password } = payload;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw createServiceError("Email or username already in use.", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return sanitizeUser(user);
  },

  async findAll(filters = {}) {
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const offset = (page - 1) * limit;
    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = (filters.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const where = buildUserFilters(filters);

    const { rows, count } = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      attributes: { exclude: ["password"] },
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
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw createServiceError("User not found.", 404);
    }

    return user;
  },

  async update(id, payload) {
    const user = await User.findByPk(id);

    if (!user) {
      throw createServiceError("User not found.", 404);
    }

    if (payload.email || payload.username) {
      const duplicated = await User.findOne({
        where: {
          id: { [Op.ne]: id },
          [Op.or]: [
            payload.email ? { email: payload.email } : null,
            payload.username ? { username: payload.username } : null,
          ].filter(Boolean),
        },
      });

      if (duplicated) {
        throw createServiceError("Email or username already in use.", 409);
      }
    }

    const updateData = { ...payload };

    if (payload.password) {
      updateData.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
    }

    await user.update(updateData);

    return sanitizeUser(user);
  },

  async delete(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw createServiceError("User not found.", 404);
    }

    await user.destroy();

    return { success: true };
  },

  async login(payload) {
    const { identifier, email, username, password } = payload;
    const loginIdentifier = identifier || email || username;

    if (!loginIdentifier || !password) {
      throw createServiceError("Username/email and password are required.", 400);
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: loginIdentifier }, { username: loginIdentifier }],
      },
    });

    if (!user) {
      throw createServiceError("Invalid credentials.", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createServiceError("Invalid credentials.", 401);
    }

    if (!env.jwtSecret) {
      throw createServiceError("JWT secret is not configured.", 500);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        username: user.username,
      },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );

    return {
      token,
      user: sanitizeUser(user),
    };
  },

  async logout(token) {
    if (!token) {
      throw createServiceError("Token is required to logout.", 400);
    }

    revokedTokens.add(token);

    return { success: true };
  },

  isTokenRevoked(token) {
    return revokedTokens.has(token);
  },
};

