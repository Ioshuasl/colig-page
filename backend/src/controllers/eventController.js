import { eventService } from "../services/eventService.js";

const parseId = (value) => Number(value);

export const eventController = {
  async create(req, res, next) {
    try {
      const event = await eventService.create(req.body);
      return res.status(201).json(event);
    } catch (error) {
      return next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await eventService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const event = await eventService.findById(parseId(req.params.id));
      return res.status(200).json(event);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const event = await eventService.update(parseId(req.params.id), req.body);
      return res.status(200).json(event);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await eventService.delete(parseId(req.params.id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  },
};

