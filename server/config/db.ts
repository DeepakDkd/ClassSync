import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
    define: {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};
export { sequelize, connectDB };