import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Liga = sequelize.define(
  "Liga",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    presidente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contato_presidente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vice_presidente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contato_vice_presidente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmailOrEmpty(value) {
          if (value == null || String(value).trim() === "") return;
          // Sequelize isEmail rejects some valid edge cases; keep simple RFC-ish check
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
          if (!ok) throw new Error("Email inválido");
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "ligas",
    timestamps: true,
  }
);

export default Liga;
