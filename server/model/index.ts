import { sequelize } from "../config/db";
import { associateUserModel, initUserModel } from "./userModel";
import { associateClassRoomModel, initClassRoomModel } from "./classRoomModel";

const db = {
  sequelize,
  User: initUserModel(sequelize),
  ClassRoom: initClassRoomModel(sequelize),
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
associateClassRoomModel(db);

export default db;
