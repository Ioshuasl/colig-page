import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize(
  env.dbName,
  env.dbUser,
  env.dbPass,
  {
    host: env.dbHost,
    port: env.dbPort,
  dialect: "postgres",
  logging: env.nodeEnv === "development" ? console.log : false,
  }
);
