import { Router } from "express";
import { memberController } from "../controllers/memberController.js";
import { authenticateJwt } from "../middlewares/index.js";

const memberRoutes = Router();

memberRoutes.get("/", memberController.findAll);
memberRoutes.use(authenticateJwt);
memberRoutes.post("/", memberController.create);
memberRoutes.get("/:id", memberController.findById);
memberRoutes.put("/:id", memberController.update);
memberRoutes.delete("/:id", memberController.delete);

export default memberRoutes;

