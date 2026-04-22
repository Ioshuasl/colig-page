import { sequelize } from "../config/database.js";

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

run();
