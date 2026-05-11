import { Router } from "express";
import multer from "multer";
import { ligaController } from "../controllers/ligaController.js";
import { authenticateJwt } from "../middlewares/index.js";

const ligaRoutes = Router();

const uploadLogo = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Envie uma imagem para a logo (ex.: PNG, JPEG, WebP)."));
    }
  },
});

const handleLogoUpload = (req, res, next) => {
  uploadLogo.single("file")(req, res, (err) => {
    if (err) {
      err.statusCode = 400;
      return next(err);
    }
    next();
  });
};

ligaRoutes.get("/", ligaController.findAll);
ligaRoutes.use(authenticateJwt);
ligaRoutes.post("/", ligaController.create);
ligaRoutes.post("/:id/logo", handleLogoUpload, ligaController.uploadLogo);
ligaRoutes.get("/:id", ligaController.findById);
ligaRoutes.put("/:id", ligaController.update);
ligaRoutes.delete("/:id", ligaController.delete);

export default ligaRoutes;
