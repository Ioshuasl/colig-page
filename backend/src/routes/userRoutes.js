import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { authenticateJwt } from "../middlewares/index.js";

const userRoutes = Router();

userRoutes.post("/login", userController.login);

userRoutes.use(authenticateJwt);
userRoutes.post("/logout", userController.logout);
userRoutes.post("/", userController.create);
userRoutes.get("/", userController.findAll);
userRoutes.get("/:id", userController.findById);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;

