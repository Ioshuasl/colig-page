import { Router } from "express";
import multer from "multer";
import { s3Controller } from "../controllers/s3Controller.js";
import { authenticateJwt } from "../middlewares/index.js";

const s3Routes = Router();
const upload = multer({ storage: multer.memoryStorage() });

s3Routes.use(authenticateJwt);
s3Routes.post("/upload", upload.single("file"), s3Controller.upload);
s3Routes.get("/", s3Controller.get);
s3Routes.delete("/", s3Controller.delete);

export default s3Routes;

