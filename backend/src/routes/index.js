import { Router } from "express";
import userRoutes from "./userRoutes.js";
import memberRoutes from "./memberRoutes.js";
import eventRoutes from "./eventRoutes.js";
import newsRoutes from "./newsRoutes.js";
import ligaRoutes from "./ligaRoutes.js";
import s3Routes from "./s3Routes.js";
import docsRoutes from "./docsRoutes.js";

const routes = Router();

routes.get("/", (_req, res) => {
  return res.status(200).json({ message: "Colig API" });
});

routes.use("/users", userRoutes);
routes.use("/members", memberRoutes);
routes.use("/events", eventRoutes);
routes.use("/news", newsRoutes);
routes.use("/ligas", ligaRoutes);
routes.use("/s3", s3Routes);
routes.use("/docs", docsRoutes);

export default routes;
