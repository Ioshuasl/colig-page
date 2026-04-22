import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const News = sequelize.define(
    "News",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "news",
      timestamps: true,
    }
  );

export default News;
