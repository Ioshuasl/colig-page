import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Member = sequelize.define(
    "Member",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "members",
      timestamps: true,
    }
  );

export default Member;
