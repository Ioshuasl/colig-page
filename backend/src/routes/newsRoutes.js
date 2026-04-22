import { Router } from "express";
import { newsController } from "../controllers/newsController.js";
import { authenticateJwt } from "../middlewares/index.js";

const newsRoutes = Router();

newsRoutes.get("/", newsController.findAll);
newsRoutes.use(authenticateJwt);
newsRoutes.post("/", newsController.create);
newsRoutes.get("/:id", newsController.findById);
newsRoutes.put("/:id", newsController.update);
newsRoutes.delete("/:id", newsController.delete);

export default newsRoutes;

