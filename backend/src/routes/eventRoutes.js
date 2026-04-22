import { Router } from "express";
import { eventController } from "../controllers/eventController.js";
import { authenticateJwt } from "../middlewares/index.js";

const eventRoutes = Router();

eventRoutes.get("/", eventController.findAll);
eventRoutes.use(authenticateJwt);
eventRoutes.post("/", eventController.create);
eventRoutes.get("/:id", eventController.findById);
eventRoutes.put("/:id", eventController.update);
eventRoutes.delete("/:id", eventController.delete);

export default eventRoutes;

