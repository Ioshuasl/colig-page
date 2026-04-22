import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { globalErrorHandler, notFoundHandler } from "./middlewares/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.use("/api", routes);
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
