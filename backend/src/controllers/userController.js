import { userService } from "../services/userService.js";

const parseId = (value) => Number(value);

export const userController = {
  async create(req, res, next) {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await userService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const user = await userService.findById(parseId(req.params.id));
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await userService.update(parseId(req.params.id), req.body);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await userService.delete(parseId(req.params.id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  },

  async login(req, res, next) {
    try {
      const result = await userService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
      const token = req.body?.token || bearerToken;

      const result = await userService.logout(token);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
};

