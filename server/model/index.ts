import { sequelize } from "../config/db";
import { associateUserModel, initUserModel } from "./userModel";

const db = {
  sequelize,
  User: initUserModel(sequelize),
};

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

associateUserModel(db);

export default db;
