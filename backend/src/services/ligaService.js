import { Op } from "sequelize";
import Liga from "../models/Liga.js";
import { uploadToS3, deleteFileByUrl, isOurBucketUrl } from "../config/s3.js";

const LIGA_LOGO_FOLDER = "uploads/ligas";

const SORTABLE = new Set(["createdAt", "updatedAt", "nome", "sigla", "ativo"]);

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const parseBool = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const s = String(value).toLowerCase();
  if (s === "true" || s === "1") return true;
  if (s === "false" || s === "0") return false;
  return undefined;
};

const buildLigaFilters = (filters = {}) => {
  const where = {};

  if (filters.q) {
    where[Op.or] = [
      { nome: { [Op.iLike]: `%${filters.q}%` } },
      { sigla: { [Op.iLike]: `%${filters.q}%` } },
      { presidente: { [Op.iLike]: `%${filters.q}%` } },
      { descricao: { [Op.iLike]: `%${filters.q}%` } },
    ];
  }

  if (filters.nome) {
    where.nome = { [Op.iLike]: `%${filters.nome}%` };
  }

  if (filters.sigla) {
    where.sigla = { [Op.iLike]: `%${filters.sigla}%` };
  }

  const ativo = parseBool(filters.ativo);
  if (ativo !== undefined) {
    where.ativo = ativo;
  }

  return where;
};

async function removeLogoFromS3IfOurs(url) {
  if (!url || !isOurBucketUrl(url)) return;
  try {
    await deleteFileByUrl(url);
  } catch {
    /* best effort */
  }
}

export const ligaService = {
  async create(payload) {
    const liga = await Liga.create(payload);
    return liga;
  },

  async findAll(filters = {}) {
    const limit = Number(filters.limit) > 0 ? Number(filters.limit) : 20;
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const offset = (page - 1) * limit;
    const sortBy = SORTABLE.has(filters.sortBy) ? filters.sortBy : "createdAt";
    const sortOrder = (filters.sortOrder || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { rows, count } = await Liga.findAndCountAll({
      where: buildLigaFilters(filters),
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async findById(id) {
    const liga = await Liga.findByPk(id);

    if (!liga) {
      throw createServiceError("Liga not found.", 404);
    }

    return liga;
  },

  async update(id, payload) {
    const liga = await Liga.findByPk(id);

    if (!liga) {
      throw createServiceError("Liga not found.", 404);
    }

    const prevLogo = liga.logo_url;
    await liga.update(payload);
    await liga.reload();

    if (
      Object.prototype.hasOwnProperty.call(payload, "logo_url") &&
      prevLogo &&
      prevLogo !== liga.logo_url &&
      isOurBucketUrl(prevLogo)
    ) {
      await removeLogoFromS3IfOurs(prevLogo);
    }

    return liga;
  },

  async uploadLogo(id, file) {
    if (!file?.buffer) {
      throw createServiceError("Arquivo é obrigatório (campo file, multipart).", 400);
    }

    const liga = await Liga.findByPk(id);

    if (!liga) {
      throw createServiceError("Liga not found.", 404);
    }

    const prevLogo = liga.logo_url;
    const { url } = await uploadToS3(file, LIGA_LOGO_FOLDER);

    await liga.update({ logo_url: url });
    await liga.reload();

    if (prevLogo && prevLogo !== url && isOurBucketUrl(prevLogo)) {
      await removeLogoFromS3IfOurs(prevLogo);
    }

    return liga;
  },

  async delete(id) {
    const liga = await Liga.findByPk(id);

    if (!liga) {
      throw createServiceError("Liga not found.", 404);
    }

    const logoUrl = liga.logo_url;
    await liga.destroy();

    if (logoUrl && isOurBucketUrl(logoUrl)) {
      await removeLogoFromS3IfOurs(logoUrl);
    }

    return { success: true };
  },
};
