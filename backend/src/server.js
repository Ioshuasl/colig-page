import app from "./app.js";
import { env } from "./config/env.js";
import { sequelize } from "./config/database.js";
import "./models/index.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    const syncOptions = env.nodeEnv === "development" ? { alter: true } : {};
    await sequelize.sync(syncOptions);
    console.log("Database synchronized successfully.");

    app.listen(env.port, () => {
      console.log(`API running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start API due to database error.");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
