import { ligaService } from "../services/ligaService.js";

const parseId = (value) => Number(value);

export const ligaController = {
  async create(req, res, next) {
    try {
      const liga = await ligaService.create(req.body);
      return res.status(201).json(liga);
    } catch (error) {
      return next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await ligaService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const liga = await ligaService.findById(parseId(req.params.id));
      return res.status(200).json(liga);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const liga = await ligaService.update(parseId(req.params.id), req.body);
      return res.status(200).json(liga);
    } catch (error) {
      return next(error);
    }
  },

  async uploadLogo(req, res, next) {
    try {
      const liga = await ligaService.uploadLogo(parseId(req.params.id), req.file);
      return res.status(200).json(liga);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await ligaService.delete(parseId(req.params.id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  },
};
