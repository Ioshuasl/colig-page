import { memberService } from "../services/memberService.js";

const parseId = (value) => Number(value);

export const memberController = {
  async create(req, res, next) {
    try {
      const member = await memberService.create(req.body);
      return res.status(201).json(member);
    } catch (error) {
      return next(error);
    }
  },

  async findAll(req, res, next) {
    try {
      const result = await memberService.findAll(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async findById(req, res, next) {
    try {
      const member = await memberService.findById(parseId(req.params.id));
      return res.status(200).json(member);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const member = await memberService.update(parseId(req.params.id), req.body);
      return res.status(200).json(member);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await memberService.delete(parseId(req.params.id));
      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  },
};

