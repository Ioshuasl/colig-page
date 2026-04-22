import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const docsRoutes = Router();
const swaggerPath = resolve(process.cwd(), "src", "docs", "swagger.json");
const swaggerDocument = JSON.parse(readFileSync(swaggerPath, "utf-8"));

docsRoutes.get("/json", (_req, res) => {
  return res.status(200).json(swaggerDocument);
});

docsRoutes.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default docsRoutes;
